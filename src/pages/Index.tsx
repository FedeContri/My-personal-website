import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".scroll-reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" id="home">
      <Navigation />
      <Hero />
      <div className="scroll-reveal">
        <About />
      </div>
      <div className="scroll-reveal" id="skills">
        <Skills />
      </div>
      <div className="scroll-reveal">
        <Projects />
      </div>
      <div className="scroll-reveal">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
