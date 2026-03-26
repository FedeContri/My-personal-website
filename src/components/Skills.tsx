import { useTranslation } from "@/lib/i18n";
import { Network, Monitor, Code, Shield, ChevronRight } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);

  const skillsData = [
    {
      category: t("skills.networking"),
      icon: Network,
      accent: "primary" as const,
      skills: ["Cisco Packet Tracer", "CCNA 1 & 2", "Routing & Switching", "TCP/IP"],
    },
    {
      category: t("skills.os"),
      icon: Monitor,
      accent: "accent" as const,
      skills: ["Arch Linux", "Kali Linux", "Ubuntu Server", "Windows"],
    },
    {
      category: t("skills.programming"),
      icon: Code,
      accent: "primary" as const,
      skills: ["Java", "C/C++", "HTML/CSS", "SQL"],
    },
    {
      category: t("skills.cybersecurity"),
      icon: Shield,
      accent: "accent" as const,
      skills: ["Security Fundamentals", "Penetration Testing", "Network Security", "Security Tools"],
    },
  ];

  return (
    <section className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t("skills.title")}</span> {t("skills.titleHighlight")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("skills.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar tabs */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
          {skillsData.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeCategory === i;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(i)}
                className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap md:whitespace-normal ${
                  isActive
                    ? "card-glass border border-primary/30 text-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                }`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="hidden md:inline">{cat.category}</span>
                <span className="md:hidden">{cat.category}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-primary ml-auto hidden md:block" />
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full hidden md:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div className="card-glass rounded-2xl p-6 md:p-8 min-h-[220px]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            {(() => {
              const Icon = skillsData[activeCategory].icon;
              const isAccent = skillsData[activeCategory].accent === "accent";
              return (
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isAccent
                    ? "bg-accent/10 border border-accent/20"
                    : "bg-primary/10 border border-primary/20"
                }`}>
                  <Icon className={`w-5 h-5 ${isAccent ? "text-accent" : "text-primary"}`} />
                </div>
              );
            })()}
            <div>
              <h3 className="text-lg font-bold">{skillsData[activeCategory].category}</h3>
              <p className="text-xs text-muted-foreground">{skillsData[activeCategory].skills.length} skills</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {skillsData[activeCategory].skills.map((skill, i) => {
              const isAccent = skillsData[activeCategory].accent === "accent";
              return (
                <div
                  key={skill}
                  className={`relative overflow-hidden px-4 py-4 rounded-xl text-sm font-medium border transition-all duration-300 cursor-default group hover:scale-[1.03] hover:shadow-md ${
                    isAccent
                      ? "bg-accent/5 border-accent/10 hover:border-accent/30 hover:bg-accent/10"
                      : "bg-primary/5 border-primary/10 hover:border-primary/30 hover:bg-primary/10"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={`absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isAccent ? "bg-accent/40" : "bg-primary/40"
                  }`} style={{ background: isAccent ? undefined : "var(--gradient-primary)", opacity: undefined }} />
                  <div className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "var(--gradient-primary)" }} />
                  <span className="relative z-10">{skill}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
