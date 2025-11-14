import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import SpecialEventsEditDialog from "./SpecialEventsEditDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Award } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SpecialEvents = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const events = profileData?.specialEvents || [];

  if (!events || events.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Special Events & Achievements
          </h2>
          <p className="text-muted-foreground">
            Memorable moments and professional milestones
          </p>
        </div>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any, index: number) => (
          <Card 
            key={index} 
            className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-border/50"
          >
            {/* Event Image */}
            {event.imageUrl && (
              <div className="relative overflow-hidden bg-muted">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </AspectRatio>
                {event.badge && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {event.badge}
                  </div>
                )}
              </div>
            )}

            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>

              {/* Event Details */}
              <div className="space-y-2 mb-3">
                {event.date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {/* Event Description */}
              {event.description && (
                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              )}

              {/* Event Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <SpecialEventsEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default SpecialEvents;
