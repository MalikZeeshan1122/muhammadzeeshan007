import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const PetProjects = () => {
  const navigate = useNavigate();
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const projects = profileData?.petProjects || [];

  const handleSave = (data: any[]) => {
    updateProfileData({
      ...profileData,
      petProjects: data
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Projects</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="group space-y-3 p-5 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 bg-card cursor-pointer"
            onClick={() => navigate(`/project/${index}`)}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed line-clamp-2">{project.description}</p>
            <div className="flex items-center gap-3 pt-2">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View demo"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View GitHub"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
            </div>
          </div>
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
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'url', label: 'Demo URL', type: 'text' },
          { name: 'github', label: 'GitHub URL', type: 'text' }
        ]}
      />
    </section>
  );
};

export default PetProjects;
