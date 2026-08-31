import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Section from "@/components/site/Section";
import { profile } from "@/lib/profile";

const RATE_LIMIT_KEY = "contact_form_submissions";
const MAX_SUBMISSIONS_PER_HOUR = 3;
const HOUR_IN_MS = 60 * 60 * 1000;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name contains invalid characters"),
  email: z.string().trim().min(1, "Email is required").max(255).email("Invalid email format"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters")
    .refine((v) => !/<script|javascript:|on\w+=/i.test(v), "Message contains prohibited content"),
});

const sanitize = (input: string) =>
  input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();

const readSubmissions = (): number[] => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const parsed: number[] = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    return parsed.filter((t) => now - t < HOUR_IN_MS);
  } catch {
    return [];
  }
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = contactSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    const recent = readSubmissions();
    if (recent.length >= MAX_SUBMISSIONS_PER_HOUR) {
      toast.error("Too many messages sent. Please try again later.");
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: sanitize(validation.data.name),
          email: validation.data.email.toLowerCase().trim(),
          message: sanitize(validation.data.message),
        },
      });

      if (error) {
        toast.error("Network error. Please try again.");
        return;
      }

      if (data?.success) {
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([...recent, Date.now()]));
        toast.success("Message sent. Thanks for reaching out.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data?.message || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full border-b border-border bg-transparent py-3 text-base sm:text-[15px] outline-none placeholder:text-muted-foreground/70 focus:border-foreground transition-colors";

  return (
    <Section id="contact" eyebrow="08 / Contact" title="Let's connect.">
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-[13px]"
        >
          GitHub <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <a href={`mailto:${profile.email}`} className="link-underline font-mono text-[13px]">
          Email <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-[13px]"
        >
          LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        {profile.cvUrl && (
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-[13px]"
          >
            CV <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-12 max-w-lg space-y-6">
        <p className="eyebrow">Or send a message</p>
        <input
          className={field}
          placeholder="Name"
          aria-label="Name"
          name="name"
          autoComplete="name"
          value={form.name}
          maxLength={100}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={field}
          placeholder="Email"
          aria-label="Email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          autoCapitalize="off"
          autoCorrect="off"
          value={form.email}
          maxLength={255}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          className={`${field} resize-none`}
          placeholder="Message"
          aria-label="Message"
          name="message"
          rows={5}
          maxLength={1000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-sm bg-primary px-5 py-3 font-mono text-[12.5px] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50 sm:w-auto"
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </form>
    </Section>
  );
};

export default Contact;
