import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

const Publications = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const publications = profileData?.publications || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      publications: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">publications</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-4">
        {publications.map((pub, index) => (
          <div key={index} className="border-l-2 border-border pl-4 space-y-1">
            {pub.url ? (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-link hover:text-link-hover transition-colors block"
              >
                {pub.title}
              </a>
            ) : (
              <h3 className="text-lg font-semibold text-foreground">{pub.title}</h3>
            )}
            <p className="text-foreground">{pub.authors}</p>
            <p className="text-sm text-muted-foreground italic">{pub.venue}</p>
          </div>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Publications"
        data={publications}
        onSave={handleSave}
        fields={[
          { name: 'title', label: 'Paper Title', type: 'text' },
          { name: 'authors', label: 'Authors', type: 'text' },
          { name: 'venue', label: 'Conference/Journal', type: 'text' },
          { name: 'url', label: 'URL', type: 'text' }
        ]}
      />
    </section>
  );
};

export default Publications;
