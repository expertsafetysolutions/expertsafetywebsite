"use client";

import { useId, useState } from "react";
import { Button } from "./ui/Button";

type Props = {
  /** Pre-fills the message/subject — used on product & service detail pages. */
  context?: string;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Enquiry / quote request form. Posts to /api/enquiry (a stub route — see
 * that file for what needs wiring to a real email/CRM provider before launch).
 * No cart, no pricing: every submission is a lead, not an order.
 */
export function EnquiryForm({ context, className }: Props) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending your enquiry. Please call or WhatsApp us instead.");
    }
  }

  if (status === "success") {
    return (
      <div className={className} role="status">
        <div className="rounded-lg border border-status-ok/30 bg-status-okSoft p-6">
          <p className="font-display text-lg font-bold text-ink-900">
            Enquiry received
          </p>
          <p className="mt-1 text-sm text-steel">
            Thank you — our team will get back to you shortly. For an urgent
            requirement, call or WhatsApp us directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {context && <input type="hidden" name="context" value={context} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${formId}-name`} label="Full name" name="name" required autoComplete="name" />
        <Field
          id={`${formId}-company`}
          label="Company"
          name="company"
          autoComplete="organization"
        />
        <Field
          id={`${formId}-phone`}
          label="Phone number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor={`${formId}-message`}
          className="mb-1.5 block text-sm font-medium text-ink-800"
        >
          What do you need? {context ? "" : "(product, service, quantity, site details)"}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          defaultValue={context ? `Enquiry regarding: ${context}\n\n` : ""}
          required
          className="w-full rounded border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-signal"
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-signal-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-5 w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
      <p className="mt-3 text-xs text-steel">
        This is an enquiry request, not an order — no payment is collected.
        We&apos;ll respond with a quote and next steps.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label} {required && <span className="text-signal">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-signal"
      />
    </div>
  );
}
