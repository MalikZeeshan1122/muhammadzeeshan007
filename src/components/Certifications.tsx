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
      <div className="grid gap-3 mt-4">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="group flex items-baseline justify-between gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-1">
              {cert.url ? (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-2"
                >
                  {cert.name}
                  <svg 
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <p className="text-foreground font-medium">{cert.name}</p>
              )}
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">{cert.year}</span>
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
