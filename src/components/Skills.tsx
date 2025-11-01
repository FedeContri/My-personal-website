import { useEffect, useRef } from "react";

const skills = {
  networking: [
    { name: "Cisco Packet Tracer", level: 85 },
    { name: "CCNA 1 & 2", level: 80 },
    { name: "Routing & Switching", level: 75 },
    { name: "Network Protocols", level: 70 },
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
    { name: "Python", level: 50, learning: true },
    { name: "Rust", level: 40, learning: true },
  ],
  security: [
    { name: "Security Fundamentals", level: 70 },
    { name: "Penetration Testing", level: 60 },
    { name: "Security Tools", level: 65 },
  ],
};

const SkillBar = ({ name, level, learning }: { name: string; level: number; learning?: boolean }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
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
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          {name} {learning && <span className="text-accent text-xs">(In apprendimento)</span>}
        </span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out opacity-0"
          style={{ 
            width: `${level}%`,
            transitionDelay: "200ms" 
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
