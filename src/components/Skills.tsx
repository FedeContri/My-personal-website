const skillsData = [
  {
    category: "Networking",
    icon: "🌐",
    color: "primary",
    skills: ["Cisco Packet Tracer", "CCNA 1 & 2", "Routing & Switching", "Network Protocols", "TCP/IP"],
  },
  {
    category: "Sistemi Operativi",
    icon: "💻",
    color: "accent",
    skills: ["Arch Linux", "Kali Linux", "Ubuntu", "Multi-boot Config", "System Administration"],
  },
  {
    category: "Programmazione",
    icon: "⚡",
    color: "primary",
    skills: ["Java", "C/C++", "HTML/CSS", "JavaScript (Base)"],
  },
  {
    category: "Cybersecurity",
    icon: "🔐",
    color: "accent",
    skills: ["Security Fundamentals", "Penetration Testing", "Security Tools", "Network Security"],
  },
];

const Skills = () => {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Competenze</span> Tecniche
        </h2>
        <p className="text-muted-foreground text-lg">
          Le mie skill acquisite attraverso studio pratico e progetti hands-on
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {skillsData.map((category, index) => (
          <div
            key={category.category}
            className="card-glass p-6 rounded-xl group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{category.icon}</span>
              <h3 className="text-2xl font-bold">{category.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    category.color === "primary"
                      ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                      : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20"
                  } hover:scale-105 cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
