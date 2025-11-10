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
        <Separator className="max-w-3xl mx-auto" />
        <Experience />
        <Separator className="max-w-3xl mx-auto" />
        <FeaturedTalks />
        <Teaching />
        <Separator className="max-w-3xl mx-auto" />
        <FeaturedWriting />
        <Separator className="max-w-3xl mx-auto" />
        <PetProjects />
        <Separator className="max-w-3xl mx-auto" />
        <Publications />
        <Separator className="max-w-3xl mx-auto" />
        <Skills />
        <Separator className="max-w-3xl mx-auto" />
        <Certifications />
        <Separator className="max-w-3xl mx-auto" />
        <Education />
        <Separator className="max-w-3xl mx-auto" />
        <MiscLinks />
        
        <footer className="max-w-3xl mx-auto px-6 py-12 border-t border-border mt-12">
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
