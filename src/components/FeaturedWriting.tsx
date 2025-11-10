import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

const FeaturedWriting = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const writing = profileData.featuredWriting;

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      featuredWriting: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">featured writing</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-2">
        {writing.map((post, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-muted-foreground whitespace-nowrap">{post.date}</span>
            <a
              href={post.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:text-link-hover transition-colors"
            >
              {post.title}
            </a>
          </div>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Featured Writing"
        data={writing}
        onSave={handleSave}
        fields={[
          { name: 'date', label: 'Date', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'url', label: 'URL', type: 'text' }
        ]}
      />
    </section>
  );
};

export default FeaturedWriting;
