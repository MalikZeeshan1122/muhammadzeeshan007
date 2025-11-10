import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

const Education = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const education = profileData?.education || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      education: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Education</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-muted-foreground">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">{edu.period}</p>
            {edu.details && (
              <p className="text-sm text-foreground italic">• {edu.details}</p>
            )}
          </div>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Education"
        data={education}
        onSave={handleSave}
        fields={[
          { name: 'degree', label: 'Degree', type: 'text' },
          { name: 'institution', label: 'Institution', type: 'text' },
          { name: 'period', label: 'Period', type: 'text' },
          { name: 'details', label: 'Additional Details (optional)', type: 'text' }
        ]}
      />
    </section>
  );
};

export default Education;
