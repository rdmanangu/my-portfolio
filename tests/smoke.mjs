import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const url = "http://127.0.0.1:4173/";
const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"],
  { cwd: process.cwd(), stdio: "ignore" },
);

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // The preview server has not started yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error("Preview server did not start on port 4173.");
}

let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: width === 768 ? 1024 : 800 } });
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(url, { waitUntil: "networkidle" });

    const layout = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      heroLoaded: document.querySelector("#home img")?.naturalWidth > 0,
      sections: document.querySelectorAll("main section").length,
    }));
    assert.ok(layout.width <= width, `Horizontal overflow at ${width}px`);
    assert.ok(layout.heroLoaded, `Hero image missing at ${width}px`);
    assert.equal(layout.sections, 6);

    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => ({
      label: document.activeElement?.textContent?.trim(),
      color: getComputedStyle(document.activeElement).outlineColor,
      width: getComputedStyle(document.activeElement).outlineWidth,
    }));
    assert.equal(focus.label, "Skip to content");
    assert.equal(focus.color, "rgb(34, 211, 238)");
    assert.equal(focus.width, "2px");

    if (width === 320) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).waitFor({ state: "visible" });
      await page.keyboard.press("Escape");
      await page.getByRole("navigation", { name: "Mobile navigation" }).waitFor({ state: "detached" });

      await page.getByRole("tab", { name: "All", exact: true }).click();
      await page.keyboard.press("End");
      assert.equal(await page.getByRole("tab", { name: "Data Science & ML" }).getAttribute("aria-selected"), "true");
    }

    if (width === 1280) {
      assert.equal(await page.getByRole("link", { name: "Download Resume" }).count(), 1);

      await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects" }).click();
      await page.waitForFunction(() => document.querySelector('header a[href="#projects"]')?.getAttribute("aria-current") === "location");
      await page.locator('header a[href="#home"]').click();
      await page.waitForFunction(() => document.querySelector('header a[href="#home"]')?.getAttribute("aria-current") === "location");

      await page.getByRole("tab", { name: "Languages" }).click();
      await page.keyboard.press("ArrowRight");
      assert.equal(await page.getByRole("tab", { name: "Frontend" }).getAttribute("aria-selected"), "true");
      await page.keyboard.press("Home");
      assert.equal(await page.getByRole("tab", { name: "All", exact: true }).getAttribute("aria-selected"), "true");
      assert.equal(await page.getByRole("link", { name: /Live demo/ }).count(), 2);

      await page.getByRole("button", { name: "Open email draft" }).click();
      assert.equal(await page.locator('form [aria-invalid="true"]').count(), 3);
      await page.locator("#contact-name").fill("Jane Recruiter");
      await page.locator("#contact-email").fill("jane@company.com");
      await page.locator("#contact-message").fill("I would love to discuss an internship on your team.");
      await page.getByRole("button", { name: "Open email draft" }).click();
      assert.match(await page.getByRole("status").textContent(), /Hit send/);

      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.getByRole("button", { name: "Copy email" }).click();
      await page.getByRole("button", { name: "Copied!" }).waitFor({ state: "visible" });
      assert.equal(await page.getByRole("button", { name: "Copied!" }).count(), 1);
    }

    assert.deepEqual(pageErrors, []);
    console.log(`${width}px: layout and interactions passed`);
    await page.close();
  }

  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await reduced.goto(url);
  assert.equal(await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  console.log("Reduced-motion behavior passed");
  await reduced.close();

  for (const width of [320, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
      .analyze();
    assert.deepEqual(results.violations.map((violation) => violation.id), [], `Accessibility issues at ${width}px`);
    console.log(`${width}px: axe accessibility audit passed`);
    await context.close();
  }
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}