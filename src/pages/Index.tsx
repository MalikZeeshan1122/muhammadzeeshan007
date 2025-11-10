import { EditModeProvider } from "@/contexts/EditModeContext";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import EditModeToggle from "@/components/EditModeToggle";

const Index = () => {
  return (
    <EditModeProvider>
      <div className="min-h-screen bg-background">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        
        <footer className="max-w-3xl mx-auto px-6 py-12 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Muhammad Zeeshan. All rights reserved.
          </p>
        </footer>

        <EditModeToggle />
      </div>
    </EditModeProvider>
  );
};

export default Index;
