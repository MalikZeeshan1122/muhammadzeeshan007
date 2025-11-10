import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";
import { Card } from "@/components/ui/card";

const Teaching = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const teaching = profileData?.teaching || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      teaching: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">teaching</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teaching.map((course, index) => (
          <a
            key={index}
            href={course.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-sm text-center p-2">{course.title}</span>
                )}
              </div>
            </Card>
            <p className="text-xs text-foreground mt-2 group-hover:text-link transition-colors">
              {course.description}
            </p>
          </a>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Teaching"
        data={teaching}
        onSave={handleSave}
        fields={[
          { name: 'title', label: 'Course Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'url', label: 'URL', type: 'text' },
          { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' }
        ]}
      />
    </section>
  );
};

export default Teaching;
