import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";
import { useAuth } from "@/contexts/AuthContext";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  const { isEditMode } = useEditMode();
  const { user } = useAuth();

  // Only show if user is authenticated and edit mode is enabled
  if (!user || !isEditMode) return null;

  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="outline"
      className="ml-2 animate-fade-in"
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  );
};

export default EditButton;
