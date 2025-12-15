import { Shield, Network, Terminal } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {t("about.title")} <span className="gradient-text">{t("about.titleHighlight")}</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {t("about.p1")} <span className="text-primary font-semibold">{t("about.networking")}</span> {t("about.and")} <span className="text-accent font-semibold">{t("about.cybersecurity")}</span>{t("about.p1End")}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t("about.p2")} <span className="text-primary font-semibold">{t("about.linuxAdmin")}</span>{t("about.p2End")}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t("about.p3")} <span className="text-primary font-semibold">{t("about.ccna")}</span> {t("about.p3End")}
          </p>
        </div>
        
        <div className="grid gap-4">
          <div className="card-glass p-6 rounded-lg hover:glow-primary transition-all">
            <Network className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">{t("about.networkingTitle")}</h3>
            <p className="text-muted-foreground">
              {t("about.networkingDesc")}
            </p>
          </div>
          
          <div className="card-glass p-6 rounded-lg hover:glow-accent transition-all">
            <Terminal className="h-10 w-10 text-accent mb-3" />
            <h3 className="text-xl font-semibold mb-2">{t("about.linuxTitle")}</h3>
            <p className="text-muted-foreground">
              {t("about.linuxDesc")}
            </p>
          </div>
          
          <div className="card-glass p-6 rounded-lg hover:glow-primary transition-all">
            <Shield className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">{t("about.securityTitle")}</h3>
            <p className="text-muted-foreground">
              {t("about.securityDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;