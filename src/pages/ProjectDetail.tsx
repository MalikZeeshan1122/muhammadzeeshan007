import { useParams, useNavigate } from "react-router-dom";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectMediaUpload from "@/components/ProjectMediaUpload";
import { useState } from "react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { profileData, updateProfileData, isEditMode } = useEditMode();
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  
  const projects = profileData?.petProjects || [];
  const projectIndex = parseInt(projectId || "0");
  const project = projects[projectIndex];

  const handleMediaSave = (media: string[]) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      images: media
    };
    updateProfileData({
      ...profileData,
      petProjects: updatedProjects
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/projects")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
            <span className="text-sm text-muted-foreground font-medium">
              {profileData?.hero?.name || "Muhammad Zeeshan"}
            </span>
          </div>
        </div>
      </nav>

      {/* Project Content */}
      <main className="pt-20 pb-16">
        <article className="max-w-5xl mx-auto px-6">
          {/* Project Header */}
          <div className="mb-8">
            {project.category && (
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
                {project.category}
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{profileData?.hero?.name || "Muhammad Zeeshan"}</span>
              </div>
              {project.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="w-4 h-4" />
                    View Source Code
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="space-y-8">
            {/* Project Images Gallery */}
            {(project.images && project.images.length > 0) || isEditMode ? (
              <section className="relative -mx-6 sm:mx-0">
                <Card className="overflow-hidden border-border shadow-lg">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-foreground">Media Gallery</h2>
                      <div className="flex items-center gap-2">
                        {project.images && project.images.length > 0 && (
                          <Badge variant="secondary" className="text-sm px-4 py-2">
                            {project.images.length} {project.images.length === 1 ? 'Image' : 'Images'}
                          </Badge>
                        )}
                        {isEditMode && (
                          <Button
                            onClick={() => setMediaDialogOpen(true)}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Manage Media
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {project.images && project.images.length > 0 ? (
                      <Carousel className="w-full" opts={{ loop: true }}>
                        <CarouselContent className="-ml-4">
                          {project.images.map((image: string, index: number) => (
                          <CarouselItem key={index} className="pl-4">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted shadow-2xl border border-border/50">
                              <img
                                src={image}
                                alt={`${project.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                                <p className="text-sm text-foreground/80 font-medium">
                                  {index + 1} / {project.images.length}
                                </p>
                              </div>
                            </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 h-10 w-10 bg-background/95 hover:bg-background border-2" />
                        <CarouselNext className="right-2 h-10 w-10 bg-background/95 hover:bg-background border-2" />
                      </Carousel>
                    ) : isEditMode ? (
                      <div className="text-center py-12 border-2 border-dashed border-border rounded-lg bg-background/50">
                        <p className="text-muted-foreground mb-4">No media yet. Click "Manage Media" to add images or videos.</p>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </section>
            ) : null}

            {/* Project Overview */}
            <Card className="p-8 border-border">
              <h2 className="text-3xl font-bold text-foreground mb-6">Project Overview</h2>
              <p className="text-foreground/90 leading-relaxed text-lg">
                {project.description}
              </p>
            </Card>
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
            <Button 
              onClick={() => navigate("/projects")}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Projects
            </Button>
            
            <div className="flex gap-3">
              {projectIndex > 0 && (
                <Button
                  onClick={() => navigate(`/project/${projectIndex - 1}`)}
                  variant="ghost"
                >
                  ← Previous
                </Button>
              )}
              {projectIndex < projects.length - 1 && (
                <Button
                  onClick={() => navigate(`/project/${projectIndex + 1}`)}
                  variant="ghost"
                >
                  Next →
                </Button>
              )}
            </div>
          </div>
        </article>
      </main>

      {/* Media Upload Dialog */}
      <ProjectMediaUpload
        open={mediaDialogOpen}
        onOpenChange={setMediaDialogOpen}
        media={project.images || []}
        onSave={handleMediaSave}
      />
    </div>
  );
};

export default ProjectDetail;
