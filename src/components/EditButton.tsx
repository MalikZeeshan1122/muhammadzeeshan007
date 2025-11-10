import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  const { isEditMode } = useEditMode();

  if (!isEditMode) return null;

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
