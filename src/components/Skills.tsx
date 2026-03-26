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
      skills: [
        { name: "Cisco Packet Tracer", level: 80 },
        { name: "CCNA 1 & 2", level: 70 },
        { name: "Routing & Switching", level: 75 },
        { name: "TCP/IP", level: 70 },
      ],
    },
    {
      category: t("skills.os"),
      icon: Monitor,
      skills: [
        { name: "Arch Linux", level: 85 },
        { name: "Kali Linux", level: 70 },
        { name: "Ubuntu Server", level: 75 },
        { name: "Windows", level: 80 },
      ],
    },
    {
      category: t("skills.programming"),
      icon: Code,
      skills: [
        { name: "Java", level: 65 },
        { name: "C/C++", level: 60 },
        { name: "HTML/CSS", level: 75 },
        { name: "SQL", level: 60 },
      ],
    },
    {
      category: t("skills.cybersecurity"),
      icon: Shield,
      skills: [
        { name: "Security Fundamentals", level: 65 },
        { name: "Penetration Testing", level: 55 },
        { name: "Network Security", level: 70 },
        { name: "Security Tools", level: 60 },
      ],
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

        <div className="space-y-5">
          {skillsData[activeCategory].skills.map((skill, i) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {skill.name}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    background: "var(--gradient-primary)",
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
