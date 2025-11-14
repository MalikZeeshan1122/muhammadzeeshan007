import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditMode } from "@/contexts/EditModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SpecialEventsEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpecialEventsEditDialog = ({ open, onOpenChange }: SpecialEventsEditDialogProps) => {
  const { profileData, updateProfileData } = useEditMode();
  const { user } = useAuth();
  const [events, setEvents] = useState(profileData?.specialEvents || []);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    setEvents(profileData?.specialEvents || []);
  }, [profileData?.specialEvents]);

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        title: "",
        date: "",
        location: "",
        description: "",
        imageUrl: "",
        badge: "",
        tags: [],
      },
    ]);
  };

  const handleRemoveEvent = (index: number) => {
    const updated = events.filter((_: any, i: number) => i !== index);
    setEvents(updated);
  };

  const handleEventChange = (index: number, field: string, value: any) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setEvents(updated);
  };

  const handleImageUpload = async (index: number, file: File) => {
    if (!user) {
      toast.error("Please sign in to upload images");
      return;
    }

    setUploadingIndex(index);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);

      handleEventChange(index, 'imageUrl', publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleTagsChange = (index: number, tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    handleEventChange(index, 'tags', tags);
  };

  const handleSave = () => {
    updateProfileData({
      ...profileData,
      specialEvents: events,
    });
    toast.success("Events updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Special Events</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {events.map((event: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Event {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEvent(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Event Image</Label>
                {event.imageUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                    <img
                      src={event.imageUrl}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleEventChange(index, 'imageUrl', '')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(index, file);
                      }}
                      className="hidden"
                      id={`image-upload-${index}`}
                      disabled={uploadingIndex === index}
                    />
                    <label
                      htmlFor={`image-upload-${index}`}
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {uploadingIndex === index ? "Uploading..." : "Click to upload image"}
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Event Title *</Label>
                  <Input
                    value={event.title}
                    onChange={(e) => handleEventChange(index, "title", e.target.value)}
                    placeholder="AI Conference 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input
                    value={event.date}
                    onChange={(e) => handleEventChange(index, "date", e.target.value)}
                    placeholder="March 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={event.location}
                    onChange={(e) => handleEventChange(index, "location", e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input
                    value={event.badge}
                    onChange={(e) => handleEventChange(index, "badge", e.target.value)}
                    placeholder="Winner, Speaker, Attendee"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={event.tags?.join(', ') || ''}
                    onChange={(e) => handleTagsChange(index, e.target.value)}
                    placeholder="AI, Machine Learning, Conference"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={event.description}
                  onChange={(e) => handleEventChange(index, "description", e.target.value)}
                  placeholder="Describe your experience at this event..."
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button onClick={handleAddEvent} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
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

export default SpecialEventsEditDialog;
