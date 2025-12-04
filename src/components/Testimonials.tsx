import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import TestimonialsEditDialog from "./TestimonialsEditDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, User } from "lucide-react";

const Testimonials = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const testimonials = profileData?.testimonials || [];

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Client Feedback
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Trusted by clients worldwide — here's what they say about working with me
          </p>
        </div>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial: any, index: number) => (
          <Card 
            key={index} 
            className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="p-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center opacity-50">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-0.5 mb-4 ml-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-colors ${
                        i < testimonial.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Testimonial Text */}
              <blockquote className="text-foreground/90 leading-relaxed mb-6 italic text-sm md:text-base">
                "{testimonial.feedback}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {testimonial.clientName}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.clientRole}
                    {testimonial.company && (
                      <span className="text-primary"> @ {testimonial.company}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              {testimonial.projectName && (
                <div className="mt-4 px-3 py-2 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Project:</span> {testimonial.projectName}
                  </p>
                  {testimonial.date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {testimonial.date}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <TestimonialsEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default Testimonials;
