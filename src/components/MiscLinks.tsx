import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

const MiscLinks = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const links = profileData?.miscLinks || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      miscLinks: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">misc unsorted</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:text-link-hover hover:underline transition-colors"
            >
              {link.title}
            </a>
            {link.description && (
              <span className="text-foreground ml-2">- {link.description}</span>
            )}
          </li>
        ))}
      </ul>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Misc Links"
        data={links}
        onSave={handleSave}
        fields={[
          { name: 'title', label: 'Link Title', type: 'text' },
          { name: 'description', label: 'Description (optional)', type: 'text' },
          { name: 'url', label: 'URL', type: 'text' }
        ]}
      />
    </section>
  );
};

export default MiscLinks;
