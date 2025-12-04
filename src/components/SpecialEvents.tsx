import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import SpecialEventsEditDialog from "./SpecialEventsEditDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Award, Sparkles, PartyPopper } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SpecialEvents = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const events = profileData?.specialEvents || [];

  if (!events || events.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
            <PartyPopper className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Celebrations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Events & Milestones
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Celebrating achievements, memorable moments, and professional milestones
          </p>
        </div>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any, index: number) => (
          <Card 
            key={index} 
            className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
          >
            {/* Event Image */}
            {event.imageUrl ? (
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </AspectRatio>
                {event.badge && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-primary/30">
                    <Award className="w-3.5 h-3.5" />
                    {event.badge}
                  </div>
                )}
              </div>
            ) : (
              /* Placeholder with decorative element */
              <div className="relative h-32 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary/30" />
                {event.badge && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-primary/30">
                    <Award className="w-3.5 h-3.5" />
                    {event.badge}
                  </div>
                )}
              </div>
            )}

            <CardContent className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </h3>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                {event.date && (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span>{event.date}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {/* Event Description */}
              {event.description && (
                <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3 mb-4">
                  {event.description}
                </p>
              )}

              {/* Event Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                  {event.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {event.tags.length > 3 && (
                    <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{event.tags.length - 3}
                    </span>
                  )}
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
