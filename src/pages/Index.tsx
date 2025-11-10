import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Hackathons from "@/components/Hackathons";
import PetProjects from "@/components/PetProjects";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import EditModeToggle from "@/components/EditModeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SectionWrapper from "@/components/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />
      
      <div className="pt-16">
        <SectionWrapper id="about">
          <Hero />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="skills">
          <Skills />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="experience">
          <Experience />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="hackathons">
          <Hackathons />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="projects">
          <section className="max-w-3xl mx-auto px-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Projects</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore my portfolio of projects showcasing various technologies and solutions.
            </p>
            <Button
              onClick={() => navigate("/projects")}
              size="lg"
              className="group"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </section>
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="certifications">
          <Certifications />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper>
          <Education />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="papers">
          <Publications />
        </SectionWrapper>
        
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        
        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
        
        <footer className="max-w-3xl mx-auto px-6 py-12 mt-12 animate-fade-in">
          <hr className="mb-8 border-border" />
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Muhammad Zeeshan. All rights reserved.
          </p>
        </footer>
      </div>

      <BackToTop />
      <EditModeToggle />
    </div>
  );
};

export default Index;
