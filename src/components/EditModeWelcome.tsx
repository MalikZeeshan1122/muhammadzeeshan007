import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit3, MousePointerClick, Save, Keyboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const EditModeWelcome = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Only show to authenticated users
    if (!user) return;
    
    // Check if user has seen the welcome dialog
    const hasSeenWelcome = localStorage.getItem("edit-mode-welcome-seen");
    if (!hasSeenWelcome) {
      // Show after a short delay
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClose = () => {
    localStorage.setItem("edit-mode-welcome-seen", "true");
    setOpen(false);
  };

  // Don't show to non-authenticated visitors
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Edit3 className="w-6 h-6 text-primary" />
            Welcome to Edit Mode
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            You can easily customize this portfolio without coding!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MousePointerClick className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Enable Edit Mode</h4>
              <p className="text-sm text-muted-foreground">
                Click the "Edit Mode" button in the bottom-right corner
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Edit3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Edit Sections</h4>
              <p className="text-sm text-muted-foreground">
                Click "Edit" buttons that appear on each section to modify content
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Save className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Save Changes</h4>
              <p className="text-sm text-muted-foreground">
                Click "Save & Exit" when done to save all your changes
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Keyboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Keyboard Shortcut</h4>
              <p className="text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">E</kbd> to quickly toggle edit mode
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModeWelcome;
