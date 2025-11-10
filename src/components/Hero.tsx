import { useState } from "react";
import { Mail, Linkedin, Github, Twitter, Youtube } from "lucide-react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import HeroEditDialog from "./HeroEditDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const hero = profileData.hero;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          <Avatar className="w-32 h-32 border-2 border-border">
            <AvatarImage src={hero.profilePhoto} alt={hero.name} />
            <AvatarFallback className="text-2xl">
              {hero.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {hero.name}
              </h1>
              <EditButton onClick={() => setEditOpen(true)} />
            </div>
            {hero.tagline && (
              <p className="text-lg text-foreground">{hero.tagline}</p>
            )}
            <p className="text-muted-foreground">{hero.location}</p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href={`mailto:${hero.email}`}
                className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              {hero.linkedin && (
                <a 
                  href={hero.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {hero.github && (
                <a 
                  href={hero.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {hero.twitter && (
                <a 
                  href={hero.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {hero.youtube && (
                <a 
                  href={hero.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-foreground leading-relaxed">
            {hero.summary}
          </p>
        </div>
      </div>

      <HeroEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default Hero;
