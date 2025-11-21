import { useState, useEffect } from "react";
import { Menu, X, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { profileData } = useEditMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Track active section
      const sections = ["about", "skills", "experience", "hackathons", "projects", "certifications", "papers", "testimonials", "events", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    handleScroll(); // Initial call
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
      setActiveSection(sectionId);
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
    { name: "Testimonials", id: "testimonials" },
    { name: "Events", id: "events" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/50" 
          : "bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => scrollToSection("about")}
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              {profileData?.hero?.name || "Muhammad Zeeshan"}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap group ${
                  activeSection === link.id
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full animate-scale-in" />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-1/2" />
              </button>
            ))}
            
            {profileData?.hero?.resumeUrl && (
              <a
                href={profileData.hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap ml-2"
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
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
              className="hover:bg-accent/50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 animate-fade-in">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-primary bg-primary/10 translate-x-1"
                    : "text-foreground hover:text-primary hover:bg-accent/50 hover:translate-x-1"
                }`}
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "backwards" }}
              >
                {link.name}
              </button>
            ))}
            
            {profileData?.hero?.resumeUrl && (
              <a
                href={profileData.hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 hover:translate-x-1 mt-2"
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
                className="flex items-center gap-2 px-4 py-3 text-base font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 hover:translate-x-1"
              >
                <GraduationCap className="w-4 h-4" />
                Thesis
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
