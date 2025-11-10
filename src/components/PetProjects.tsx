import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";
import { ExternalLink, Github } from "lucide-react";

const PetProjects = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const projects = profileData.petProjects;

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      petProjects: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">pet projects</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-foreground leading-relaxed">{project.description}</p>
          </div>
        ))}
      </div>

      <ArrayEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Pet Projects"
        data={projects}
        onSave={handleSave}
        fields={[
          { name: 'title', label: 'Project Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'url', label: 'Demo URL', type: 'text' },
          { name: 'github', label: 'GitHub URL', type: 'text' }
        ]}
      />
    </section>
  );
};

export default PetProjects;
