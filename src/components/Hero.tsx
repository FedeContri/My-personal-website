import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Networking & Cybersecurity Enthusiast";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      <div className="text-center space-y-6 max-w-4xl animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold">
          Ciao, sono <span className="gradient-text">FD</span>
        </h1>
        
        <div className="h-16 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl text-muted-foreground">
            {typedText}
            <span className="animate-glow-pulse">|</span>
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Studente appassionato di tecnologia con focus su networking pratico, 
          amministrazione sistemi Linux e fondamenti di cybersecurity.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="glow-primary"
            onClick={() => scrollToSection("projects")}
          >
            Esplora i Progetti
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => scrollToSection("contact")}
          >
            <Mail className="mr-2 h-4 w-4" />
            Contattami
          </Button>
        </div>
        
        <div className="flex gap-4 justify-center pt-4">
          <a 
            href="https://github.com/FedeContri" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary transition-colors hover:glow-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/federico-contrino-78a647395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary transition-colors hover:glow-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
      
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </button>
    </section>
  );
};

export default Hero;
