import { Shield, Network, Terminal } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Chi <span className="gradient-text">Sono</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          La mia passione per la tecnologia attraverso l'apprendimento pratico
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            Sono uno studente con una forte passione per il <span className="text-primary font-semibold">networking</span> e 
            la <span className="text-accent font-semibold">cybersecurity</span>. Il mio approccio all'apprendimento 
            è fortemente orientato alla pratica, con particolare focus su configurazioni reali e laboratori hands-on.
          </p>
          
          <p className="text-lg leading-relaxed">
            Attraverso i miei studi e progetti personali, ho sviluppato competenze in <span className="text-primary font-semibold">amministrazione 
            sistemi Linux</span>, configurazioni di rete con Cisco Packet Tracer, e fondamenti di sicurezza informatica. 
            La mia filosofia è imparare facendo, costruendo progetti concreti e documentando ogni passo del percorso.
          </p>
          
          <p className="text-lg leading-relaxed">
            Attualmente sto completando le certificazioni <span className="text-primary font-semibold">CCNA</span> e 
            approfondendo le mie conoscenze in Python e Rust per progetti futuri nel campo della cybersecurity.
          </p>
        </div>
        
        <div className="grid gap-4">
          <div className="card-glass p-6 rounded-lg hover:glow-primary transition-all">
            <Network className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Networking</h3>
            <p className="text-muted-foreground">
              Configurazioni pratiche con Cisco Packet Tracer e certificazioni CCNA in corso
            </p>
          </div>
          
          <div className="card-glass p-6 rounded-lg hover:glow-accent transition-all">
            <Terminal className="h-10 w-10 text-accent mb-3" />
            <h3 className="text-xl font-semibold mb-2">Sistemi Linux</h3>
            <p className="text-muted-foreground">
              Esperienza con Arch, Kali, Ubuntu e configurazioni multi-boot avanzate
            </p>
          </div>
          
          <div className="card-glass p-6 rounded-lg hover:glow-primary transition-all">
            <Shield className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Cybersecurity</h3>
            <p className="text-muted-foreground">
              Studio dei fondamenti e preparazione per specializzazione futura
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
