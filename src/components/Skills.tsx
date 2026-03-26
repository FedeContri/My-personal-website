import { useTranslation } from "@/lib/i18n";
import { Network, Monitor, Code, Shield, Terminal } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);

  const skillsData = [
    {
      category: t("skills.networking"),
      icon: Network,
      tagline: "Infrastructure & Protocols",
      skills: [
        { name: "Cisco Packet Tracer", tag: "Lab" },
        { name: "CCNA 1 & 2", tag: "Cert" },
        { name: "Routing & Switching", tag: "Core" },
        { name: "TCP/IP", tag: "Core" },
      ],
    },
    {
      category: t("skills.os"),
      icon: Monitor,
      tagline: "System Administration",
      skills: [
        { name: "Arch Linux", tag: "Advanced" },
        { name: "Kali Linux", tag: "Security" },
        { name: "Ubuntu Server", tag: "Server" },
        { name: "Windows", tag: "Desktop" },
      ],
    },
    {
      category: t("skills.programming"),
      icon: Code,
      tagline: "Languages & Data",
      skills: [
        { name: "Java", tag: "OOP" },
        { name: "C/C++", tag: "Systems" },
        { name: "HTML/CSS", tag: "Web" },
        { name: "SQL", tag: "Data" },
      ],
    },
    {
      category: t("skills.cybersecurity"),
      icon: Shield,
      tagline: "Defense & Offense",
      skills: [
        { name: "Security Fundamentals", tag: "Theory" },
        { name: "Penetration Testing", tag: "Offense" },
        { name: "Network Security", tag: "Defense" },
        { name: "Security Tools", tag: "Tools" },
      ],
    },
  ];

  const active = skillsData[activeCategory];
  const ActiveIcon = active.icon;

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

      {/* Terminal-style container */}
      <div className="rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
        {/* Terminal header */}
        <div className="bg-muted/80 backdrop-blur-sm px-5 py-3 flex items-center gap-3 border-b border-border/40">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 ml-3 text-xs text-muted-foreground font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>skills --list --interactive</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] bg-card/50 backdrop-blur-sm">
          {/* Sidebar */}
          <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-border/40 overflow-x-auto md:overflow-visible">
            {skillsData.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === i;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(i)}
                  className={`group relative flex items-center gap-3 px-5 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap md:whitespace-normal w-full text-left ${
                    isActive
                      ? "bg-primary/8 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full hidden md:block" style={{ background: "var(--gradient-primary)" }} />
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full md:hidden" style={{ background: "var(--gradient-primary)" }} />
                  )}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-[13px] leading-tight">{cat.category}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{cat.tagline}</div>
                  </div>
                  <span className="md:hidden text-[13px]">{cat.category}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Category header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                <ActiveIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight">{active.category}</h3>
                <p className="text-sm text-muted-foreground mt-1">{active.tagline}</p>
              </div>
            </div>

            {/* Skill cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {active.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="group relative flex items-center justify-between gap-3 px-4 py-4 rounded-xl border border-border/40 bg-background/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 cursor-default"
                  style={{
                    animation: "fadeSlideIn 0.35s ease-out both",
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08), transparent 70%)" }} />
                  
                  <div className="relative flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  
                  <span className="relative text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300 px-2 py-0.5 rounded-md bg-muted/50">
                    {skill.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
