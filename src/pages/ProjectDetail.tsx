import { useParams, useNavigate } from "react-router-dom";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { profileData } = useEditMode();
  
  const projects = profileData?.petProjects || [];
  const projectIndex = parseInt(projectId || "0");
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
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
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
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
            {/* Project Description */}
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Project Description</h2>
              <p className="text-foreground/90 leading-relaxed text-lg">
                {project.description}
              </p>
            </Card>

            {/* Problem & Challenge */}
            {project.problem && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Problem & Challenge</h2>
                <p className="text-foreground/90 leading-relaxed">
                  {project.problem}
                </p>
              </Card>
            )}

            {/* Target Audience */}
            {project.audience && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Target Audience</h2>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.audience}
                </p>
              </Card>
            )}

            {/* Solution & Core Features */}
            {(project.solution || project.features) && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Solution & Core Features</h2>
                {project.solution && (
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    {project.solution}
                  </p>
                )}
                {project.features && project.features.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {project.features.map((feature: string, index: number) => (
                      <li 
                        key={index} 
                        className="text-foreground/90 leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-2 before:h-2 before:rounded-full before:bg-primary"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )}

            {/* USP */}
            {project.usp && (
              <Card className="p-6 border-border bg-accent/20">
                <h2 className="text-2xl font-bold text-foreground mb-4">Unique Selling Proposition</h2>
                <p className="text-foreground/90 leading-relaxed font-medium">
                  {project.usp}
                </p>
              </Card>
            )}

            {/* Implementation & Technology */}
            {project.implementation && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Implementation & Technology</h2>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.implementation}
                </p>
              </Card>
            )}

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Results & Impact */}
            {project.results && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Results & Impact</h2>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.results}
                </p>
              </Card>
            )}

            {/* Additional Information */}
            {project.additionalInfo && (
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Additional Information</h2>
                <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.additionalInfo}
                </div>
              </Card>
            )}

            {/* Project Links */}
            <Card className="p-6 border-border bg-accent/10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Project Links</h2>
              <div className="space-y-3">
                {project.github && (
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-muted-foreground" />
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      View source code on GitHub
                    </a>
                  </div>
                )}
                {project.url && (
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      View live demo
                    </a>
                  </div>
                )}
              </div>
            </Card>

            {/* Category Badge */}
            {project.category && (
              <div className="flex justify-center pt-4">
                <Badge variant="outline" className="text-sm px-6 py-2 border-2">
                  Category: {project.category}
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
            <Button 
              onClick={() => navigate("/")}
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
    </div>
  );
};

export default ProjectDetail;
