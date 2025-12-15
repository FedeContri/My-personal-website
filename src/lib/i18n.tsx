import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "it" | string;

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

const translations: Translations = {
  // Hero
  "hero.greeting": {
    en: "Hi, I'm",
    it: "Ciao, sono",
  },
  "hero.tagline": {
    en: "Networking & Cybersecurity Enthusiast",
    it: "Appassionato di Networking & Cybersecurity",
  },
  "hero.description": {
    en: "Technology-passionate student focused on practical networking, Linux system administration, and cybersecurity fundamentals.",
    it: "Studente appassionato di tecnologia con focus su networking pratico, amministrazione sistemi Linux e fondamenti di cybersecurity.",
  },
  "hero.exploreProjects": {
    en: "Explore Projects",
    it: "Esplora i Progetti",
  },
  "hero.contactMe": {
    en: "Contact Me",
    it: "Contattami",
  },

  // Navigation
  "nav.home": {
    en: "Home",
    it: "Home",
  },
  "nav.about": {
    en: "About",
    it: "Chi Sono",
  },
  "nav.skills": {
    en: "Skills",
    it: "Competenze",
  },
  "nav.projects": {
    en: "Projects",
    it: "Progetti",
  },
  "nav.contact": {
    en: "Contact",
    it: "Contatti",
  },

  // About
  "about.title": {
    en: "About",
    it: "Chi",
  },
  "about.titleHighlight": {
    en: "Me",
    it: "Sono",
  },
  "about.subtitle": {
    en: "My passion for technology through hands-on learning",
    it: "La mia passione per la tecnologia attraverso l'apprendimento pratico",
  },
  "about.p1": {
    en: "I'm a student with a strong passion for",
    it: "Sono uno studente con una forte passione per il",
  },
  "about.networking": {
    en: "networking",
    it: "networking",
  },
  "about.and": {
    en: "and",
    it: "e la",
  },
  "about.cybersecurity": {
    en: "cybersecurity",
    it: "cybersecurity",
  },
  "about.p1End": {
    en: ". My learning approach is strongly practice-oriented, with particular focus on real configurations and hands-on labs.",
    it: ". Il mio approccio all'apprendimento è fortemente orientato alla pratica, con particolare focus su configurazioni reali e laboratori hands-on.",
  },
  "about.p2": {
    en: "Through my studies and personal projects, I've developed skills in",
    it: "Attraverso i miei studi e progetti personali, ho sviluppato competenze in",
  },
  "about.linuxAdmin": {
    en: "Linux system administration",
    it: "amministrazione sistemi Linux",
  },
  "about.p2End": {
    en: ", network configurations with Cisco Packet Tracer, and IT security fundamentals. My philosophy is learning by doing, building concrete projects and documenting every step of the journey.",
    it: ", configurazioni di rete con Cisco Packet Tracer, e fondamenti di sicurezza informatica. La mia filosofia è imparare facendo, costruendo progetti concreti e documentando ogni passo del percorso.",
  },
  "about.p3": {
    en: "I'm currently completing",
    it: "Attualmente sto completando le certificazioni",
  },
  "about.ccna": {
    en: "CCNA certifications",
    it: "CCNA",
  },
  "about.p3End": {
    en: "and deepening my knowledge in Python and Rust for future cybersecurity projects.",
    it: "e approfondendo le mie conoscenze in Python e Rust per progetti futuri nel campo della cybersecurity.",
  },
  "about.networkingTitle": {
    en: "Networking",
    it: "Networking",
  },
  "about.networkingDesc": {
    en: "Practical configurations with Cisco Packet Tracer and ongoing CCNA certifications",
    it: "Configurazioni pratiche con Cisco Packet Tracer e certificazioni CCNA in corso",
  },
  "about.linuxTitle": {
    en: "Linux Systems",
    it: "Sistemi Linux",
  },
  "about.linuxDesc": {
    en: "Experience with Arch, Kali, Ubuntu and advanced multi-boot configurations",
    it: "Esperienza con Arch, Kali, Ubuntu e configurazioni multi-boot avanzate",
  },
  "about.securityTitle": {
    en: "Cybersecurity",
    it: "Cybersecurity",
  },
  "about.securityDesc": {
    en: "Studying fundamentals and preparing for future specialization",
    it: "Studio dei fondamenti e preparazione per specializzazione futura",
  },

  // Skills
  "skills.title": {
    en: "Technical",
    it: "Competenze",
  },
  "skills.titleHighlight": {
    en: "Skills",
    it: "Tecniche",
  },
  "skills.subtitle": {
    en: "My skills acquired through practical study and hands-on projects",
    it: "Le mie skill acquisite attraverso studio pratico e progetti hands-on",
  },
  "skills.networking": {
    en: "Networking",
    it: "Networking",
  },
  "skills.os": {
    en: "Operating Systems",
    it: "Sistemi Operativi",
  },
  "skills.programming": {
    en: "Programming",
    it: "Programmazione",
  },
  "skills.cybersecurity": {
    en: "Cybersecurity",
    it: "Cybersecurity",
  },

  // Projects
  "projects.title": {
    en: "Practical",
    it: "Progetti",
  },
  "projects.titleHighlight": {
    en: "Projects",
    it: "Pratici",
  },
  "projects.subtitle": {
    en: "Labs and hands-on configurations to consolidate skills",
    it: "Laboratori e configurazioni hands-on per consolidare le competenze",
  },
  "projects.ccnaTitle": {
    en: "CCNA Labs",
    it: "Laboratori CCNA",
  },
  "projects.ccnaDesc": {
    en: "Practical configurations with Cisco Packet Tracer: router and switch setup with hosts, routing tables, multi-network architectures with interconnected routers, DHCP server for dynamic IP management and basic DNS server.",
    it: "Configurazioni pratiche con Cisco Packet Tracer: setup router e switch con host, tabelle di routing, architetture multi-rete con router interconnessi, server DHCP per gestione IP dinamica e server DNS basilare.",
  },
  "projects.archTitle": {
    en: "Arch Linux + GUI Guide",
    it: "Guida Arch Linux + GUI",
  },
  "projects.archDesc": {
    en: "Practical and complete guide for Arch Linux installation with graphical interface. Step-by-step tutorial that guides you from boot to final desktop configuration.",
    it: "Guida pratica e completa per l'installazione di Arch Linux con interfaccia grafica. Tutorial step-by-step che ti accompagna dal boot alla configurazione finale del desktop.",
  },
  "projects.cyberTitle": {
    en: "Cybersecurity Repository",
    it: "Cybersecurity Repository",
  },
  "projects.cyberDesc": {
    en: "Repository dedicated to cybersecurity study with materials, notes, tools and resources for learning IT security fundamentals.",
    it: "Repository dedicato allo studio della cybersecurity con materiali, note, tool e risorse per l'apprendimento dei fondamenti di sicurezza informatica.",
  },
  "projects.viewProject": {
    en: "View Project",
    it: "Vedi Progetto",
  },
  "projects.comingSoon": {
    en: "Coming Soon",
    it: "Prossimamente",
  },
  "projects.comingSoonTitle": {
    en: "Coming Soon",
    it: "Prossimamente Disponibile",
  },
  "projects.comingSoonDesc": {
    en: "is currently under development. It will be published soon with detailed content and a complete installation tutorial!",
    it: "è attualmente in fase di sviluppo. Sarà pubblicata a breve con contenuti dettagliati e un tutorial completo per l'installazione!",
  },
  "projects.gotIt": {
    en: "Got It",
    it: "Ho Capito",
  },

  // Contact
  "contact.title": {
    en: "Contact Me",
    it: "Contattami",
  },
  "contact.subtitle": {
    en: "Have a project in mind or just want to connect? Write to me!",
    it: "Hai un progetto in mente o vuoi semplicemente connetterti? Scrivimi!",
  },
  "contact.info": {
    en: "Contact Information",
    it: "Informazioni di Contatto",
  },
  "contact.email": {
    en: "Email",
    it: "Email",
  },
  "contact.sendMessage": {
    en: "Send a Message",
    it: "Invia un Messaggio",
  },
  "contact.yourName": {
    en: "Your name",
    it: "Il tuo nome",
  },
  "contact.yourEmail": {
    en: "Your email",
    it: "La tua email",
  },
  "contact.yourMessage": {
    en: "Your message",
    it: "Il tuo messaggio",
  },
  "contact.send": {
    en: "Send Message",
    it: "Invia Messaggio",
  },
  "contact.sending": {
    en: "Sending...",
    it: "Invio in corso...",
  },
  "contact.fillAll": {
    en: "Please fill in all fields",
    it: "Per favore compila tutti i campi",
  },
  "contact.tooLong": {
    en: "Name or message too long",
    it: "Nome o messaggio troppo lungo",
  },
  "contact.tooMany": {
    en: "You've sent too many messages. Try again in an hour.",
    it: "Hai inviato troppi messaggi. Riprova tra un'ora.",
  },
  "contact.success": {
    en: "Message sent! I'll respond as soon as possible.",
    it: "Messaggio inviato! Ti risponderò al più presto.",
  },
  "contact.error": {
    en: "Error sending. Check your data and try again.",
    it: "Errore nell'invio. Verifica i dati e riprova.",
  },
  "contact.networkError": {
    en: "Connection error. Check your network and try again.",
    it: "Errore di connessione. Controlla la tua rete e riprova.",
  },

  // Footer
  "footer.madeWith": {
    en: "Made with passion for technology.",
    it: "Realizzato con passione per la tecnologia.",
  },
};

interface I18nContextType {
  language: Language;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Default to English, translations available for other languages

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language] || translation["en"] || key;
  };

  return (
    <I18nContext.Provider value={{ language, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
};
