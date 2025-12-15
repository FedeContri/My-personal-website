import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

const Projects = () => {
  const { t } = useTranslation();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const projects = [
    {
      title: t("projects.ccnaTitle"),
      description: t("projects.ccnaDesc"),
      tags: ["Networking", "Cisco", "Routing"],
      github: "https://github.com/FedeContri/Cisco-Packet-Tracer_projects/",
      live: "https://github.com/FedeContri/Cisco-Packet-Tracer_projects/",
      comingSoon: false,
    },
    {
      title: t("projects.archTitle"),
      description: t("projects.archDesc"),
      tags: ["Linux", "System", "Tutorial"],
      github: "#",
      live: "https://fdc.gumroad.com/l/arch-gui-guide",
      comingSoon: false,
    },
    {
      title: t("projects.cyberTitle"),
      description: t("projects.cyberDesc"),
      tags: ["Security", "CTF", "Pentesting"],
      github: "https://github.com/FedeContri/Cybersecurity-Project",
      live: "https://github.com/FedeContri/Cybersecurity-Project",
      comingSoon: false,
    },
  ];
  
  return (
    <section id="projects" className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t("projects.title")}</span> {t("projects.titleHighlight")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("projects.subtitle")}
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
                {project.comingSoon ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowComingSoon(true)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {t("projects.comingSoon")}
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowComingSoon(true)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("projects.viewProject")}
                    </Button>
                  </>
                ) : (
                  <>
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
                        {t("projects.viewProject")}
                      </a>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <AlertDialogTitle className="text-center text-2xl">
              {t("projects.comingSoonTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base pt-2">
              <span className="font-semibold gradient-text">{t("projects.archTitle")}</span> {t("projects.comingSoonDesc")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel className="w-full sm:w-auto">
              {t("projects.gotIt")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Projects;