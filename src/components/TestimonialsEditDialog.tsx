import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditMode } from "@/contexts/EditModeContext";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestimonialsEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TestimonialsEditDialog = ({ open, onOpenChange }: TestimonialsEditDialogProps) => {
  const { profileData, updateProfileData } = useEditMode();
  const [testimonials, setTestimonials] = useState(profileData?.testimonials || []);

  useEffect(() => {
    setTestimonials(profileData?.testimonials || []);
  }, [profileData?.testimonials]);

  const handleAddTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        clientName: "",
        clientRole: "",
        company: "",
        feedback: "",
        rating: 5,
        projectName: "",
        date: "",
      },
    ]);
  };

  const handleRemoveTestimonial = (index: number) => {
    const updated = testimonials.filter((_: any, i: number) => i !== index);
    setTestimonials(updated);
  };

  const handleTestimonialChange = (index: number, field: string, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const handleSave = () => {
    updateProfileData({
      ...profileData,
      testimonials,
    });
    toast.success("Testimonials updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Testimonials</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Testimonial {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveTestimonial(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name *</Label>
                  <Input
                    value={testimonial.clientName}
                    onChange={(e) => handleTestimonialChange(index, "clientName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Client Role *</Label>
                  <Input
                    value={testimonial.clientRole}
                    onChange={(e) => handleTestimonialChange(index, "clientRole", e.target.value)}
                    placeholder="CEO, Product Manager, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={testimonial.company}
                    onChange={(e) => handleTestimonialChange(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Select
                    value={testimonial.rating?.toString()}
                    onValueChange={(value) => handleTestimonialChange(index, "rating", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={testimonial.projectName}
                    onChange={(e) => handleTestimonialChange(index, "projectName", e.target.value)}
                    placeholder="Project Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={testimonial.date}
                    onChange={(e) => handleTestimonialChange(index, "date", e.target.value)}
                    placeholder="January 2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Feedback *</Label>
                <Textarea
                  value={testimonial.feedback}
                  onChange={(e) => handleTestimonialChange(index, "feedback", e.target.value)}
                  placeholder="What did the client say about your work?"
                  rows={4}
                />
              </div>
            </div>
          ))}

          <Button onClick={handleAddTestimonial} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsEditDialog;
