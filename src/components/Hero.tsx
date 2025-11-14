import { useState } from "react";
import { Mail, Linkedin, Github, Twitter, Youtube } from "lucide-react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import HeroEditDialog from "./HeroEditDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const hero = profileData?.hero || {};

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse opacity-50" />
      
      <div className="relative z-10">
        {/* Avatar with floating and glowing animation */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="relative group">
            {/* Outer decorative circle */}
            <div className="absolute -inset-4 rounded-full border-2 border-primary/20 opacity-60" />
            
            <Avatar className="h-40 w-40 ring-4 ring-primary/10 shadow-xl transition-all duration-500 hover:ring-8 hover:ring-primary/20 hover:scale-110 animate-scale-in animate-glow-pulse relative z-10">
              <AvatarImage src={hero.profilePhoto} alt={hero.name} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/10 to-accent/20 text-foreground font-bold">
                {hero.name?.split(' ').map(n => n[0]).join('') || 'MZ'}
              </AvatarFallback>
            </Avatar>
            {/* Animated ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-0 group-hover:opacity-75" />
            {/* Additional glow layers */}
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl animate-pulse" />
          </div>
        </div>
        
        {/* Name with slide animation */}
        <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight hover:text-primary transition-colors duration-300">
            {hero.name || "Muhammad Zeeshan"}
          </h1>
          <EditButton onClick={() => setEditOpen(true)} />
        </div>
        
        {/* Tagline with typing effect */}
        {hero.tagline && (
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            {hero.tagline}
          </h2>
        )}
        
        {/* Social Links with staggered animation */}
        <div className="flex justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
          {hero.twitter && (
            <a href={hero.twitter} target="_blank" rel="noopener noreferrer" 
               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-6"
               aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
          )}
          {hero.github && (
            <a href={hero.github} target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-6"
               aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
          )}
          {hero.linkedin && (
            <a href={hero.linkedin} target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-6"
               aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {hero.youtube && (
            <a href={hero.youtube} target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-6"
               aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
          )}
          {hero.email && (
            <a href={`mailto:${hero.email}`}
               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-6"
               aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          )}
        </div>
        
        {/* Summary with revealing text animation */}
        {hero.summary && (
          <div className="pt-6 animate-fade-in overflow-hidden" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
            <p className="text-foreground leading-relaxed text-lg max-w-2xl mx-auto relative bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text animate-text-reveal bg-no-repeat" style={{ backgroundImage: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--foreground)) 50%, hsl(var(--foreground)) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              {hero.summary}
            </p>
          </div>
        )}
      </div>

      <HeroEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default Hero;
