import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import ArrayEditDialog from "./ArrayEditDialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableProjectCardProps {
  project: any;
  index: number;
}

const SortableProjectCard = ({ project, index }: SortableProjectCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `project-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start gap-2">
            <button
              className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.points && project.points.length > 0 && (
            <ul className="space-y-1">
              {project.points.map((point: string, i: number) => (
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
              {project.media.slice(0, 4).map((mediaUrl: string, i: number) => (
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
    </div>
  );
};

const Projects = () => {
  const { profileData, updateProfileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const projects = profileData.projects;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split('-')[1]);
      const newIndex = parseInt(over.id.toString().split('-')[1]);
      
      const newProjects = arrayMove(projects, oldIndex, newIndex);
      updateProfileData({
        ...profileData,
        projects: newProjects
      });
    }
  };

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
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map((_, index) => `project-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {projects.map((project, index) => (
              <SortableProjectCard key={`project-${index}`} project={project} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
