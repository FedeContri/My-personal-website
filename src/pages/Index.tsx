import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { trackVisit } from "@/lib/track-visit";

const Index = () => {
  useEffect(() => {
    const path = window.location.pathname || "/";
    const ric = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1500));
    ric(() => trackVisit(path));

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
      <Helmet>
        <title>FD Portfolio | Networking, Linux & Cybersecurity Projects</title>
        <meta
          name="description"
          content="Federico Contrino (FD) — student & technician focused on networking (CCNA), Linux system administration and cybersecurity. Hands-on projects, CTFs and labs."
        />
        <link rel="canonical" href="https://fd-portfolio.site/" />
        <meta property="og:title" content="FD Portfolio | Networking & Cybersecurity" />
        <meta
          property="og:description"
          content="Hands-on projects in networking, Linux system administration and cybersecurity by Federico Contrino."
        />
        <meta property="og:url" content="https://fd-portfolio.site/" />
      </Helmet>
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
