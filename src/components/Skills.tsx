import { useTranslation } from "@/lib/i18n";

const Skills = () => {
  const { t } = useTranslation();

  const skillsData = [
    {
      category: t("skills.networking"),
      icon: "🌐",
      color: "primary",
      skills: ["Cisco Packet Tracer", "CCNA 1 & 2", "Routing & Switching", "Network Protocols", "TCP/IP"],
    },
    {
      category: t("skills.os"),
      icon: "💻",
      color: "accent",
      skills: ["Arch Linux", "Kali Linux", "Ubuntu Server", "Windows", "Multi-boot Config", "System Administration"],
    },
    {
      category: t("skills.programming"),
      icon: "⚡",
      color: "primary",
      skills: ["Java", "C/C++", "HTML/CSS", "SQL"],
    },
    {
      category: t("skills.cybersecurity"),
      icon: "🔐",
      color: "accent",
      skills: ["Security Fundamentals", "Penetration Testing", "Security Tools", "Network Security"],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t("skills.title")}</span> {t("skills.titleHighlight")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("skills.subtitle")}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {skillsData.map((category) => (
          <div
            key={category.category}
            className="card-glass p-6 rounded-xl group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                category.color === "primary" 
                  ? "bg-primary/10 border border-primary/20" 
                  : "bg-accent/10 border border-accent/20"
              }`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-bold">{category.category}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 text-center ${
                    category.color === "primary"
                      ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                      : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20"
                  } hover:scale-105 cursor-default`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;