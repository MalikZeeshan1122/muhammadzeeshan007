import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

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
          <div key={index} className="flex gap-6">
            <div className="text-sm text-muted-foreground font-medium w-24 flex-shrink-0 pt-1">
              {hack.year}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{hack.title}</h3>
              <p className="text-muted-foreground">{hack.organization}</p>
              <ul className="space-y-1 pt-2">
                {hack.points.map((point, i) => (
                  <li key={i} className="text-foreground leading-relaxed">
                    {point.startsWith("•") ? point : `• ${point}`}
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
          { name: 'points', label: 'Key Points (one per line)', type: 'array' }
        ]}
      />
    </section>
  );
};

export default Hackathons;
