import { useEffect } from "react";
import { Edit3, Save, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditModeToggle = () => {
  const { isEditMode, toggleEditMode } = useEditMode();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    toggleEditMode();
    if (!isEditMode) {
      toast.success("Edit mode enabled", {
        description: "Click edit buttons to modify content"
      });
    } else {
      toast.success("Changes saved", {
        description: "Your updates have been saved"
      });
    }
  };

  const showHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Edit Mode Guide", {
      description: "1. Enable edit mode\n2. Click edit buttons on sections\n3. Make your changes\n4. Click Save & Exit\n\nPress 'E' for quick toggle",
      duration: 6000,
    });
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await signOut();
    toast.success("Signed out successfully");
    navigate('/');
  };

  // Keyboard shortcut: Press 'E' to toggle edit mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input/textarea
      if (
        e.key.toLowerCase() === 'e' && 
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        toggleEditMode();
        toast.success(isEditMode ? "Edit mode disabled" : "Edit mode enabled", {
          description: isEditMode ? "Your changes have been saved" : "Press 'E' again to exit",
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isEditMode, toggleEditMode]);

  // Only show if user is authenticated
  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Sign Out Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleSignOut}
            size="icon"
            variant="outline"
            className="rounded-full shadow-lg bg-background/95 backdrop-blur-sm self-end"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Sign out</p>
        </TooltipContent>
      </Tooltip>

      {/* Help Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={showHelp}
            size="icon"
            variant="outline"
            className="rounded-full shadow-lg bg-background/95 backdrop-blur-sm self-end"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>How to use edit mode</p>
        </TooltipContent>
      </Tooltip>

      {/* Main Toggle Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleToggle}
            size="lg"
            className={`rounded-full shadow-xl hover:scale-105 transition-all duration-300 ${
              isEditMode 
                ? 'bg-green-600 hover:bg-green-700 animate-pulse' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isEditMode ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save & Exit
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Mode
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="font-medium">
            {isEditMode ? 'Save changes and exit' : 'Enable editing'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Keyboard shortcut: <kbd className="px-1 py-0.5 bg-muted rounded text-xs">E</kbd>
          </p>
        </TooltipContent>
      </Tooltip>
      
      {/* Active Indicator */}
      {isEditMode && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
      )}
    </div>
  );
};

export default EditModeToggle;
