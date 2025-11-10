import { Edit3, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";
import { toast } from "sonner";

const EditModeToggle = () => {
  const { isEditMode, toggleEditMode } = useEditMode();

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleToggle}
        size="lg"
        className={`rounded-full shadow-lg hover:scale-105 transition-transform ${
          isEditMode ? 'bg-green-600 hover:bg-green-700' : ''
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
    </div>
  );
};

export default EditModeToggle;
