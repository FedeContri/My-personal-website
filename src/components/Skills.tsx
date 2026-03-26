import { useTranslation } from "@/lib/i18n";
import { Network, Monitor, Code, Shield } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);

  const skillsData = [
    {
      category: t("skills.networking"),
      icon: Network,
      skills: ["Cisco Packet Tracer", "CCNA 1 & 2", "Routing & Switching", "TCP/IP"],
    },
    {
      category: t("skills.os"),
      icon: Monitor,
      skills: ["Arch Linux", "Kali Linux", "Ubuntu Server", "Windows"],
    },
    {
      category: t("skills.programming"),
      icon: Code,
      skills: ["Java", "C/C++", "HTML/CSS", "SQL"],
    },
    {
      category: t("skills.cybersecurity"),
      icon: Shield,
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

      {/* Category tabs */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {skillsData.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = activeCategory === i;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                  : "card-glass border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Active category content */}
      <div className="card-glass rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          {(() => {
            const Icon = skillsData[activeCategory].icon;
            return (
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            );
          })()}
          <h3 className="text-xl font-bold">{skillsData[activeCategory].category}</h3>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {skillsData[activeCategory].skills.map((skill) => (
            <div
              key={skill.name}
              className="px-4 py-2.5 rounded-xl text-sm font-medium bg-primary/8 text-foreground border border-primary/15 hover:bg-primary/15 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-default"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
