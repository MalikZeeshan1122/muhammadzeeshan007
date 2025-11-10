import Navigation from "@/components/Navigation";
import PetProjects from "@/components/PetProjects";
import BackToTop from "@/components/BackToTop";
import EditModeToggle from "@/components/EditModeToggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
        
        <PetProjects />
        
        <footer className="max-w-3xl mx-auto px-6 py-12 mt-12">
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

export default ProjectsPage;
