import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { site } from "../data/site";
import { fadeUp, viewportOnce } from "../lib/motion";
import SectionHeading from "./SectionHeading";

const initialValues = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  const messages = site.contact.validation;

  if (!values.name.trim()) errors.name = messages.nameRequired;
  else if (values.name.trim().length < 2) errors.name = messages.nameShort;

  if (!values.email.trim()) errors.email = messages.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = messages.emailInvalid;

  if (!values.message.trim()) errors.message = messages.messageRequired;
  else if (values.message.trim().length < 10) errors.message = messages.messageShort;

  return errors;
}

function openEmailDraft(values) {
  // TODO: Replace this mailto fallback with a Formspree or EmailJS request for in-page delivery.
  const subject = encodeURIComponent(`${site.contact.emailSubject} ${values.name.trim()}`);
  const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()} <${values.email.trim()}>`);
  window.location.assign(`mailto:${site.identity.email}?subject=${subject}&body=${body}`);
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null);
  const reduceMotion = useReducedMotion();
  const { contact, identity } = site;

  function handleChange(event) {
    const nextValues = { ...values, [event.target.name]: event.target.value };
    setValues(nextValues);
    if (hasSubmitted) setErrors(validate(nextValues));
    if (status) setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus({ type: "error", message: contact.status.validationError });
      const firstInvalid = ["name", "email", "message"].find((field) => nextErrors[field]);
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await Promise.resolve();
      openEmailDraft(values);
      setStatus({ type: "success", message: contact.status.success });
    } catch {
      setStatus({ type: "error", message: contact.status.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setStatus(null);
    } catch {
      setStatus({ type: "error", message: contact.status.copyError });
    }
  }

  const inputClassName =
    "mt-2.5 w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:border-accent-cyan/70 focus:outline-none focus:ring-2 focus:ring-accent-cyan/25";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 bottom-0 h-[580px] w-[580px] bg-glow-purple" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-12">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            description={contact.description}
          />
          <div className="mt-10 border-l-2 border-accent-cyan/45 pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-400">
              {contact.emailLabel}
            </p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-2 inline-flex max-w-full items-center gap-2 break-all font-display text-lg font-medium text-white transition-colors hover:text-accent-cyan sm:text-xl"
            >
              {identity.email}
              <ArrowUpRight aria-hidden="true" size={18} className="shrink-0 text-accent-cyan" />
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-cyan-200"
            >
              {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
              {copied ? contact.copiedLabel : contact.copyLabel}
            </button>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 md:backdrop-blur-md"
        >
          <h3 className="font-display text-2xl font-semibold text-white">{contact.formHeading}</h3>
          <p className="mt-1 text-sm text-slate-300">{contact.formDescription}</p>

          <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium text-slate-100">
                {contact.fields.name.label}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                placeholder={contact.fields.name.placeholder}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={inputClassName}
              />
              {errors.name && <p id="contact-name-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rose-300"><AlertCircle aria-hidden="true" size={14} />{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-medium text-slate-100">
                {contact.fields.email.label}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                placeholder={contact.fields.email.placeholder}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={inputClassName}
              />
              {errors.email && <p id="contact-email-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rose-300"><AlertCircle aria-hidden="true" size={14} />{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm font-medium text-slate-100">
                {contact.fields.message.label}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                placeholder={contact.fields.message.placeholder}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputClassName} resize-y`}
              />
              {errors.message && <p id="contact-message-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rose-300"><AlertCircle aria-hidden="true" size={14} />{errors.message}</p>}
            </div>

            {status && (
              <p
                role={status.type === "error" ? "alert" : "status"}
                className={`rounded-lg border px-4 py-3 text-sm leading-6 ${
                  status.type === "error"
                    ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
                    : "border-accent-cyan/30 bg-accent-cyan/10 text-cyan-100"
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent-cyan px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? contact.submittingLabel : contact.submitLabel}
              <Send aria-hidden="true" size={17} strokeWidth={1.8} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}