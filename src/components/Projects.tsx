import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

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
            <CardContent className="space-y-4">
              {project.points && project.points.length > 0 && (
                <ul className="space-y-1">
                  {project.points.map((point, i) => (
                    <li key={i} className="text-foreground text-sm leading-relaxed">
                      • {point}
                    </li>
                  ))}
                </ul>
              )}
              
              {(project.url || project.github) && (
                <div className="flex gap-2 flex-wrap">
                  {project.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Source
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {project.media && project.media.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {project.media.slice(0, 4).map((mediaUrl, i) => (
                    <div key={i} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={mediaUrl} 
                        alt={`${project.title} media ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
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
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'url', label: 'Demo URL', type: 'text' },
          { name: 'github', label: 'GitHub URL', type: 'text' },
          { name: 'points', label: 'Key Points (one per line)', type: 'array' },
          { name: 'media', label: 'Images & Videos', type: 'media' }
        ]}
      />
    </section>
  );
};

export default Projects;
