import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";

const Projects = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const projects = profileData.projects;

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      projects: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Projects</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={index} className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {project.points.map((point, i) => (
                  <li key={i} className="text-foreground text-sm leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Projects"
        data={projects}
        onSave={handleSave}
        fields={[
          { name: 'title', label: 'Project Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'points', label: 'Key Points (one per line)', type: 'array' },
          { name: 'media', label: 'Images & Videos', type: 'media' }
        ]}
      />
    </section>
  );
};

export default Projects;
