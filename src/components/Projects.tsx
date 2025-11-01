import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Laboratori CCNA",
    description: "Configurazioni pratiche con Cisco Packet Tracer: setup router e switch con host, tabelle di routing, architetture multi-rete con router interconnessi, server DHCP per gestione IP dinamica e server DNS basilare.",
    tags: ["Networking", "Cisco", "Routing"],
    github: "#",
    live: "#",
  },
  {
    title: "Guida Arch Linux",
    description: "Progetto in sviluppo: guida completa per l'installazione e configurazione di Arch Linux. Include partitioning, bootloader, desktop environment e ottimizzazioni di sistema. Futura pubblicazione su Gumroad.",
    tags: ["Linux", "Sistema", "Tutorial"],
    github: "#",
    live: "#",
  },
  {
    title: "Cybersecurity Repository",
    description: "Repository dedicato allo studio della cybersecurity con materiali, note, tool e risorse per l'apprendimento dei fondamenti di sicurezza informatica.",
    tags: ["Security", "CTF", "Pentesting"],
    github: "https://github.com/FedeContri/Cybersecurity-Project",
    live: "https://github.com/FedeContri/Cybersecurity-Project",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Progetti</span> Pratici
        </h2>
        <p className="text-muted-foreground text-lg">
          Laboratori e configurazioni hands-on per consolidare le competenze
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card 
            key={index} 
            className="card-glass border-border hover:glow-primary transition-all group"
          >
            <CardHeader>
              <CardTitle className="text-xl group-hover:gradient-text transition-all">
                {project.title}
              </CardTitle>
              <CardDescription className="text-base">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button 
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Vedi Progetto
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
