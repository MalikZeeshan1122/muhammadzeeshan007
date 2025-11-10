import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/contexts/EditModeContext";

interface HeroEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HeroEditDialog = ({ open, onOpenChange }: HeroEditDialogProps) => {
  const { profileData, updateProfileData } = useEditMode();
  const [formData, setFormData] = useState(profileData.hero);

  const handleSave = () => {
    updateProfileData({
      ...profileData,
      hero: formData
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g., I like to train deep neural nets..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePhoto">Profile Photo URL</Label>
            <Input
              id="profilePhoto"
              value={formData.profilePhoto}
              onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter/X URL</Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input
              id="youtube"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              rows={6}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeroEditDialog;
