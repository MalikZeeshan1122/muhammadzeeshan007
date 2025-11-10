import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import ProjectMediaUpload from "./ProjectMediaUpload";

interface ArrayEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: any[];
  onSave: (data: any[]) => void;
  fields: { name: string; label: string; type: 'text' | 'textarea' | 'array' | 'media' }[];
}

const ArrayEditDialog = ({ open, onOpenChange, title, data, onSave, fields }: ArrayEditDialogProps) => {
  const [items, setItems] = useState(data);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newItem: any = {};
    fields.forEach(field => {
      if (field.type === 'array') {
        newItem[field.name] = [];
      } else if (field.type === 'media') {
        newItem[field.name] = [];
      } else {
        newItem[field.name] = '';
      }
    });
    setItems([...items, newItem]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleArrayChange = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index][field] = value.split('\n').filter(line => line.trim());
    setItems(updated);
  };

  const handleSave = () => {
    onSave(items);
    onOpenChange(false);
  };

  const handleMediaSave = (media: string[]) => {
    if (currentMediaIndex !== null) {
      const updated = [...items];
      const mediaField = fields.find(f => f.type === 'media');
      if (mediaField) {
        updated[currentMediaIndex][mediaField.name] = media;
        setItems(updated);
      }
    }
  };

  const openMediaDialog = (index: number) => {
    setCurrentMediaIndex(index);
    setMediaDialogOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {items.map((item, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Item {index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {fields.map(field => (
                <div key={field.name} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      value={item[field.name]}
                      onChange={(e) => handleChange(index, field.name, e.target.value)}
                      rows={3}
                    />
                  ) : field.type === 'array' ? (
                    <Textarea
                      value={Array.isArray(item[field.name]) ? item[field.name].join('\n') : ''}
                      onChange={(e) => handleArrayChange(index, field.name, e.target.value)}
                      rows={4}
                      placeholder="Enter one item per line"
                    />
                  ) : field.type === 'media' ? (
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => openMediaDialog(index)}
                        className="w-full"
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Manage Media ({Array.isArray(item[field.name]) ? item[field.name].length : 0} items)
                      </Button>
                    </div>
                  ) : (
                    <Input
                      value={item[field.name]}
                      onChange={(e) => handleChange(index, field.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
          <Button onClick={handleAdd} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>

      {currentMediaIndex !== null && (
        <ProjectMediaUpload
          open={mediaDialogOpen}
          onOpenChange={setMediaDialogOpen}
          media={items[currentMediaIndex]?.[fields.find(f => f.type === 'media')?.name || 'media'] || []}
          onSave={handleMediaSave}
        />
      )}
    </Dialog>
  );
};

export default ArrayEditDialog;
