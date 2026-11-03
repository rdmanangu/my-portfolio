import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { site } from "./data/site";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink font-body text-slate-100">
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-[180%] rounded-lg bg-accent-cyan px-4 py-3 font-semibold text-ink opacity-0 focus:pointer-events-auto focus:translate-y-0 focus:opacity-100"
      >
        {site.accessibility.skipLink}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
