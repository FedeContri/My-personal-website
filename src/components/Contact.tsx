import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Github, Send, Linkedin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { z } from "zod";

const RATE_LIMIT_KEY = "contact_form_submissions";
const MAX_SUBMISSIONS_PER_HOUR = 3;
const HOUR_IN_MS = 60 * 60 * 1000;

// Strict validation schema
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email format"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters")
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      "Message contains prohibited content"
    ),
});

// Sanitize input - remove potential HTML/script tags
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "") // Remove angle brackets
    .trim();
};

const checkRateLimit = (): boolean => {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const submissions: number[] = stored ? JSON.parse(stored) : [];
  
  const recentSubmissions = submissions.filter(time => now - time < HOUR_IN_MS);
  
  return recentSubmissions.length < MAX_SUBMISSIONS_PER_HOUR;
};

const recordSubmission = () => {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const submissions: number[] = stored ? JSON.parse(stored) : [];
  
  const recentSubmissions = submissions.filter(time => now - time < HOUR_IN_MS);
  recentSubmissions.push(now);
  
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
};

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with zod schema
    const validation = contactSchema.safeParse(formData);
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    if (!checkRateLimit()) {
      toast.error(t("contact.tooMany"));
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(validation.data.name),
        email: validation.data.email.toLowerCase().trim(),
        message: sanitizeInput(validation.data.message),
      };

      // Web3Forms access key is a PUBLIC key designed for client-side use
      // Security is handled by Web3Forms through email verification and spam protection
      const payload = {
        access_key: "7b34a4b0-426c-4274-9f6a-fdb9eaf2be3a",
        name: sanitizedData.name,
        email: sanitizedData.email,
        message: sanitizedData.message,
        from_name: sanitizedData.name,
        subject: `New message from ${sanitizedData.name}`,
      };
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        recordSubmission();
        toast.success(t("contact.success"));
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || t("contact.error"));
      }
    } catch (error) {
      toast.error(t("contact.networkError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t("contact.title")}</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("contact.subtitle")}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card-glass p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">{t("contact.info")}</h3>
            
            <div className="space-y-4">
              <a 
                href="mailto:fd_cybernet@proton.me" 
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors hover:glow-primary group"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:gradient-text">{t("contact.email")}</p>
                  <p className="text-sm text-muted-foreground">fd_cybernet@proton.me</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/FedeContri" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors hover:glow-primary group"
              >
                <Github className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:gradient-text">GitHub</p>
                  <p className="text-sm text-muted-foreground">@FedeContri</p>
                </div>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/federico-contrino-78a647395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors hover:glow-primary group"
              >
                <Linkedin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:gradient-text">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">Federico Contrino</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="card-glass p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6">{t("contact.sendMessage")}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder={t("contact.yourName")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder={t("contact.yourEmail")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Textarea
                placeholder={t("contact.yourMessage")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background/50 min-h-[150px]"
              />
            </div>
            
            <Button type="submit" className="w-full glow-primary" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;