import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Hackathons = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const hackathons = profileData?.hackathons || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      hackathons: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Hackathons Participation</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-8">
        {hackathons.map((hack, index) => (
          <div key={index} className="flex gap-6 group">
            <div className="text-sm text-muted-foreground font-semibold w-32 flex-shrink-0 pt-1">
              {hack.year}
            </div>
            <div className="flex-1 space-y-3 pb-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{hack.title}</h3>
              <p className="text-muted-foreground font-medium">{hack.organization}</p>
              {hack.verificationUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={hack.verificationUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate/Verification
                  </a>
                </Button>
              )}
              <ul className="space-y-2 pt-1">
                {hack.points.map((point, i) => (
                  <li key={i} className="text-foreground/90 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/60">
                    {point.startsWith("•") ? point.substring(1).trim() : point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Hackathons"
        data={hackathons}
        onSave={handleSave}
        fields={[
          { name: 'year', label: 'Year/Period', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'organization', label: 'Organization', type: 'text' },
          { name: 'verificationUrl', label: 'Verification URL (Certificate/Proof)', type: 'text' },
          { name: 'points', label: 'Key Points (one per line)', type: 'array' }
        ]}
      />
    </section>
  );
};

export default Hackathons;
