import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Github, Send, Linkedin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Per favore compila tutti i campi");
      return;
    }

    if (formData.name.length > 100 || formData.message.length > 1000) {
      toast.error("Nome o messaggio troppo lungo");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "7b34a4b0-426c-4274-9f6a-fdb9eaf2be3a",
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          from_name: formData.name.trim(),
          subject: `Nuovo messaggio da ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Messaggio inviato! Ti risponderò al più presto.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Errore nell'invio. Riprova più tardi.");
      }
    } catch (error) {
      console.error("Errore invio form:", error);
      toast.error("Errore nell'invio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Contattami</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Hai un progetto in mente o vuoi semplicemente connetterti? Scrivimi!
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card-glass p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Informazioni di Contatto</h3>
            
            <div className="space-y-4">
              <a 
                href="mailto:fd_cybernet@proton.me" 
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors hover:glow-primary group"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:gradient-text">Email</p>
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
          <h3 className="text-2xl font-semibold mb-6">Invia un Messaggio</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Il tuo nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="La tua email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Il tuo messaggio"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background/50 min-h-[150px]"
              />
            </div>
            
            <Button type="submit" className="w-full glow-primary" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
