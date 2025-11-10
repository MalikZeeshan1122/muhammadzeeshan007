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
    <section className="max-w-3xl mx-auto px-6 py-12 text-center">
      <div className="flex justify-center mb-6">
        <Avatar className="h-48 w-48">
          <AvatarImage src={hero.profilePhoto} alt={hero.name} />
          <AvatarFallback className="text-4xl">
            {hero.name?.split(' ').map(n => n[0]).join('') || 'MZ'}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          {hero.name || "Muhammad Zeeshan"}
        </h1>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      
      {hero.tagline && (
        <h2 className="text-xl text-muted-foreground mb-6">{hero.tagline}</h2>
      )}
      
      <div className="flex justify-center gap-2 mb-8">
        {hero.twitter && (
          <a href={hero.twitter} target="_blank" rel="noopener noreferrer" 
             className="text-foreground hover:text-link transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        )}
        {hero.github && (
          <a href={hero.github} target="_blank" rel="noopener noreferrer"
             className="text-foreground hover:text-link transition-colors">
            <Github className="w-6 h-6" />
          </a>
        )}
        {hero.linkedin && (
          <a href={hero.linkedin} target="_blank" rel="noopener noreferrer"
             className="text-foreground hover:text-link transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        )}
        {hero.youtube && (
          <a href={hero.youtube} target="_blank" rel="noopener noreferrer"
             className="text-foreground hover:text-link transition-colors">
            <Youtube className="w-6 h-6" />
          </a>
        )}
        {hero.email && (
          <a href={`mailto:${hero.email}`}
             className="text-foreground hover:text-link transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        )}
      </div>
      
      {hero.summary && (
        <div className="pt-4">
          <p className="text-foreground leading-relaxed">
            {hero.summary}
          </p>
        </div>
      )}

      <HeroEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default Hero;
