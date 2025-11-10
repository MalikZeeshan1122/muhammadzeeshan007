import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/contexts/EditModeContext";

interface SkillsEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SkillsEditDialog = ({ open, onOpenChange }: SkillsEditDialogProps) => {
  const { profileData, updateProfileData } = useEditMode();
  const [technical, setTechnical] = useState(profileData.technicalSkills.join(', '));
  const [soft, setSoft] = useState(profileData.softSkills.join(', '));

  const handleSave = () => {
    updateProfileData({
      ...profileData,
      technicalSkills: technical.split(',').map(s => s.trim()).filter(s => s),
      softSkills: soft.split(',').map(s => s.trim()).filter(s => s)
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="technical">Technical Skills (comma separated)</Label>
            <Textarea
              id="technical"
              value={technical}
              onChange={(e) => setTechnical(e.target.value)}
              rows={4}
              placeholder="Python, SQL, TensorFlow, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soft">Soft Skills (comma separated)</Label>
            <Textarea
              id="soft"
              value={soft}
              onChange={(e) => setSoft(e.target.value)}
              rows={3}
              placeholder="Communication, Leadership, etc."
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

export default SkillsEditDialog;
