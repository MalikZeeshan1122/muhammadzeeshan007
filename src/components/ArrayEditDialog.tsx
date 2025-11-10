import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface ArrayEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: any[];
  onSave: (data: any[]) => void;
  fields: { name: string; label: string; type: 'text' | 'textarea' | 'array' }[];
}

const ArrayEditDialog = ({ open, onOpenChange, title, data, onSave, fields }: ArrayEditDialogProps) => {
  const [items, setItems] = useState(data);

  const handleAdd = () => {
    const newItem: any = {};
    fields.forEach(field => {
      newItem[field.name] = field.type === 'array' ? [] : '';
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
    </Dialog>
  );
};

export default ArrayEditDialog;
