import { EditModeProvider } from "@/contexts/EditModeContext";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import FeaturedTalks from "@/components/FeaturedTalks";
import Teaching from "@/components/Teaching";
import FeaturedWriting from "@/components/FeaturedWriting";
import PetProjects from "@/components/PetProjects";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import MiscLinks from "@/components/MiscLinks";
import EditModeToggle from "@/components/EditModeToggle";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <EditModeProvider>
      <div className="min-h-screen bg-background">
        <Hero />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <Experience />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <FeaturedTalks />
        <Teaching />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <FeaturedWriting />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <PetProjects />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <Publications />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <Skills />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <Certifications />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <Education />
        <hr className="max-w-3xl mx-auto my-8 border-border" />
        <MiscLinks />
        
        <footer className="max-w-3xl mx-auto px-6 py-12 mt-12">
          <hr className="mb-8 border-border" />
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
