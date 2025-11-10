import { useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import HeroEditDialog from "./HeroEditDialog";

const Hero = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const hero = profileData.hero;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {hero.name}
            </h1>
            <EditButton onClick={() => setEditOpen(true)} />
          </div>
          <p className="text-lg text-muted-foreground">
            {hero.location}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href={`mailto:${hero.email}`}
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>{hero.email}</span>
          </a>
          <a 
            href={hero.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="pt-4 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Summary</h2>
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
