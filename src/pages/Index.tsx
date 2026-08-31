import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Journey from "@/components/Journey";
import Labs from "@/components/Labs";
import Skills from "@/components/Skills";
import Hardware from "@/components/Hardware";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { trackVisit } from "@/lib/track-visit";

const Index = () => {
  useEffect(() => {
    const path = window.location.pathname || "/";
    const ric = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1500));
    ric(() => trackVisit(path));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" id="home">
      <Helmet>
        <title>FD — DevOps Intern & Cybersecurity Enthusiast</title>
        <meta
          name="description"
          content="FD — DevOps Intern working with Linux, Docker, Kubernetes, Helm and networking, with personal homelab, Android and wireless security labs."
        />
        <link rel="canonical" href="https://fd-portfolio.site/" />
        <meta
          property="og:title"
          content="FD — DevOps Intern & Cybersecurity Enthusiast"
        />
        <meta
          property="og:description"
          content="Linux, Kubernetes, Helm, infrastructure and personal security labs. Projects and experiments by FD."
        />
        <meta property="og:url" content="https://fd-portfolio.site/" />
      </Helmet>

      <Navigation />
      <main>
        <Hero />
        <div className="reveal">
          <About />
        </div>
        <div className="reveal">
          <Work />
        </div>
        <div className="reveal">
          <Journey />
        </div>
        <div className="reveal">
          <Labs />
        </div>
        <div className="reveal">
          <Skills />
        </div>
        <div className="reveal">
          <Hardware />
        </div>
        <div className="reveal">
          <Experience />
        </div>

        <div className="reveal">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
