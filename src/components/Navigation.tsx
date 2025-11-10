import { useState, useEffect } from "react";
import { Menu, X, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { profileData } = useEditMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Hackathons", id: "hackathons" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Papers", id: "papers" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl font-bold text-foreground">
              {profileData?.hero?.name || "Muhammad Zeeshan"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors whitespace-nowrap"
              >
                {link.name}
              </button>
            ))}
            
            {profileData?.hero?.resumeUrl && (
              <a
                href={profileData.hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            )}
            
            {profileData?.hero?.thesisUrl && (
              <a
                href={profileData.hero.thesisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4" />
                Thesis
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            {profileData?.hero?.resumeUrl && (
              <a
                href={profileData.hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            )}
            
            {profileData?.hero?.thesisUrl && (
              <a
                href={profileData.hero.thesisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                Thesis
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
