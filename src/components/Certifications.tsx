import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

const Certifications = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const certifications = profileData?.certifications || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      certifications: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="grid gap-3">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="flex items-baseline justify-between gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1">
              {cert.url ? (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary"
                >
                  {cert.name}
                </a>
              ) : (
                <p className="text-foreground">{cert.name}</p>
              )}
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{cert.year}</span>
          </div>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Certifications"
        data={certifications}
        onSave={handleSave}
        fields={[
          { name: 'name', label: 'Certification Name', type: 'text' },
          { name: 'year', label: 'Year', type: 'text' },
          { name: 'url', label: 'Verification URL (optional)', type: 'text' }
        ]}
      />
    </section>
  );
};

export default Certifications;
