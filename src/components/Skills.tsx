import { useEffect, useRef } from "react";

const skills = {
  networking: [
    { name: "Cisco Packet Tracer", level: 75 },
    { name: "CCNA 1 & 2", level: 80 },
    { name: "Routing & Switching", level: 75 },
    { name: "Network Protocols", level: 75 },
  ],
  systems: [
    { name: "Arch Linux", level: 90 },
    { name: "Kali Linux", level: 85 },
    { name: "Ubuntu", level: 85 },
    { name: "Multi-boot Config", level: 80 },
  ],
  programming: [
    { name: "Java", level: 70 },
    { name: "C", level: 65 },
    { name: "HTML/CSS", level: 75 },
    { name: "Python", level: 20, learning: true },
    { name: "Rust", level: 10, learning: true },
  ],
  security: [
    { name: "Security Fundamentals", level: 75 },
    { name: "Penetration Testing", level: 65 },
    { name: "Security Tools", level: 70 },
  ],
};

const SkillBar = ({ name, level, learning }: { name: string; level: number; learning?: boolean }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector("div > div") as HTMLElement;
            if (bar) {
              bar.classList.add("!opacity-100");
              setTimeout(() => {
                bar.style.animation = "shimmer 3s ease-in-out infinite";
              }, 1200);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-2" ref={barRef}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium flex-1">
          {name}
        </span>
        {learning && (
          <span className="text-accent text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
            Learning
          </span>
        )}
      </div>
      <div className="relative h-2.5 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] rounded-full opacity-0 shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all duration-1000 ease-out animate-[shimmer_3s_ease-in-out_infinite]"
          style={{ 
            width: `${level}%`,
            transitionDelay: "200ms",
            animation: "none"
          }}
        />
      </div>
    </div>
  );
};

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
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-glass p-8 rounded-lg space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-primary">▪</span> Networking
          </h3>
          {skills.networking.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
        
        <div className="card-glass p-8 rounded-lg space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-accent">▪</span> Sistemi Operativi
          </h3>
          {skills.systems.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
        
        <div className="card-glass p-8 rounded-lg space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-primary">▪</span> Programmazione
          </h3>
          {skills.programming.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
        
        <div className="card-glass p-8 rounded-lg space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-accent">▪</span> Cybersecurity
          </h3>
          {skills.security.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
