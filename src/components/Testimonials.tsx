import { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import TestimonialsEditDialog from "./TestimonialsEditDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const testimonials = profileData?.testimonials || [];

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Client Feedback & Testimonials
          </h2>
          <p className="text-muted-foreground">
            What clients say about working with me
          </p>
        </div>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial: any, index: number) => (
          <Card 
            key={index} 
            className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50"
          >
            <CardContent className="p-6">
              {/* Quote Icon */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {testimonial.clientName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.clientRole} {testimonial.company && `at ${testimonial.company}`}
                  </p>
                </div>
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Testimonial Text */}
              <p className="text-foreground/90 leading-relaxed italic">
                "{testimonial.feedback}"
              </p>

              {/* Project Info */}
              {testimonial.projectName && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Project:</span> {testimonial.projectName}
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
