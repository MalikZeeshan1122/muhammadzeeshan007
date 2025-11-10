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
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <div className="flex justify-center mb-8">
        <Avatar className="h-40 w-40 ring-4 ring-primary/10 shadow-xl">
          <AvatarImage src={hero.profilePhoto} alt={hero.name} />
          <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/10 to-accent/20 text-foreground font-bold">
            {hero.name?.split(' ').map(n => n[0]).join('') || 'MZ'}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          {hero.name || "Muhammad Zeeshan"}
        </h1>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      
      {hero.tagline && (
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{hero.tagline}</h2>
      )}
      
      <div className="flex justify-center gap-4 mb-8">
        {hero.twitter && (
          <a href={hero.twitter} target="_blank" rel="noopener noreferrer" 
             className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
             aria-label="Twitter">
            <Twitter className="w-6 h-6" />
          </a>
        )}
        {hero.github && (
          <a href={hero.github} target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
             aria-label="GitHub">
            <Github className="w-6 h-6" />
          </a>
        )}
        {hero.linkedin && (
          <a href={hero.linkedin} target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
             aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
        )}
        {hero.youtube && (
          <a href={hero.youtube} target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
             aria-label="YouTube">
            <Youtube className="w-6 h-6" />
          </a>
        )}
        {hero.email && (
          <a href={`mailto:${hero.email}`}
             className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
             aria-label="Email">
            <Mail className="w-6 h-6" />
          </a>
        )}
      </div>
      
      {hero.summary && (
        <div className="pt-6">
          <p className="text-foreground leading-relaxed text-lg max-w-2xl mx-auto">
            {hero.summary}
          </p>
        </div>
      )}

      <HeroEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default Hero;
