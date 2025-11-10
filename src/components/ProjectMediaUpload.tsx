import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload, Image as ImageIcon, Video } from "lucide-react";
import { toast } from "sonner";

interface ProjectMediaUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  media: string[];
  onSave: (media: string[]) => void;
}

const ProjectMediaUpload = ({ open, onOpenChange, media, onSave }: ProjectMediaUploadProps) => {
  const [mediaItems, setMediaItems] = useState<string[]>(media || []);
  const [urlInput, setUrlInput] = useState("");

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setMediaItems([...mediaItems, urlInput.trim()]);
    setUrlInput("");
    toast.success("Media URL added");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setMediaItems(prev => [...prev, dataUrl]);
      };
      reader.readAsDataURL(file);
    });
    
    toast.success(`${files.length} file(s) uploaded`);
  };

  const handleRemove = (index: number) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index));
    toast.success("Media removed");
  };

  const handleSave = () => {
    onSave(mediaItems);
    onOpenChange(false);
    toast.success("Media gallery updated");
  };

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('youtube.com') || url.includes('youtu.be');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Manage Project Media
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Upload Section */}
          <div className="space-y-4 p-4 bg-accent/10 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">Add Media</h3>
            
            {/* File Upload */}
            <div className="space-y-2">
              <Label>Upload Files (Images/Videos)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Supported: JPG, PNG, GIF, MP4, WEBM
              </p>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label>Or Add Media URL</Label>
              <div className="flex gap-2">
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg or YouTube URL"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
                />
                <Button onClick={handleAddUrl} variant="secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          {mediaItems.length > 0 ? (
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                Media Gallery ({mediaItems.length} items)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mediaItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border"
                  >
                    {isVideo(item) ? (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Video className="w-12 h-12 text-muted-foreground" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs text-foreground bg-background/80 px-2 py-1 rounded truncate">
                            {item.substring(0, 30)}...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      onClick={() => handleRemove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-xs">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No media yet. Upload files or add URLs above.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Media Gallery
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectMediaUpload;
