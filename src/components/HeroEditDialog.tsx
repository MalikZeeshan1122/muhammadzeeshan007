import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/contexts/EditModeContext";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface HeroEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HeroEditDialog = ({ open, onOpenChange }: HeroEditDialogProps) => {
  const { profileData, updateProfileData } = useEditMode();
  const { toast } = useToast();
  const [formData, setFormData] = useState(profileData.hero);
  const [imagePreview, setImagePreview] = useState<string | null>(formData.profilePhoto || null);
  const [customLinks, setCustomLinks] = useState<Array<{label: string, url: string}>>(
    profileData.hero.customLinks || []
  );
  const [customFields, setCustomFields] = useState<Array<{label: string, value: string}>>(
    profileData.hero.customFields || []
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData({ ...formData, profilePhoto: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, profilePhoto: '' });
  };

  const handleSave = () => {
    updateProfileData({
      ...profileData,
      hero: {
        ...formData,
        customLinks,
        customFields
      }
    });
    onOpenChange(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully",
    });
  };

  const addCustomLink = () => {
    setCustomLinks([...customLinks, { label: "", url: "" }]);
  };

  const removeCustomLink = (index: number) => {
    setCustomLinks(customLinks.filter((_, i) => i !== index));
  };

  const updateCustomLink = (index: number, field: 'label' | 'url', value: string) => {
    const updated = [...customLinks];
    updated[index][field] = value;
    setCustomLinks(updated);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { label: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateCustomField = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="links">Custom Links</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4 py-4">
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
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <div className="space-y-2">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/10"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="profilePhoto"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Label>
                  </div>
                )}
                <Input
                  placeholder="Or paste image URL"
                  value={formData.profilePhoto}
                  onChange={(e) => {
                    setFormData({ ...formData, profilePhoto: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Upload an image (max 2MB) or paste an image URL
                </p>
              </div>
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
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={3}
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="A short bio about yourself"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma separated)</Label>
              <Input
                id="interests"
                value={formData.interests || ''}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder="AI, Machine Learning, Data Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="awards">Awards/Recognition</Label>
              <Textarea
                id="awards"
                rows={3}
                value={formData.awards || ''}
                onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                placeholder="List your awards and recognition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                placeholder="https://... (link to your resume)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thesisUrl">Thesis URL</Label>
              <Input
                id="thesisUrl"
                value={formData.thesisUrl}
                onChange={(e) => setFormData({ ...formData, thesisUrl: e.target.value })}
                placeholder="https://... (link to your thesis)"
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
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X URL</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input
                  id="youtube"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="substack">Substack URL</Label>
                <Input
                  id="substack"
                  value={formData.substack}
                  onChange={(e) => setFormData({ ...formData, substack: e.target.value })}
                  placeholder="https://substack.com/@..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={formData.instagram || ''}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medium">Medium URL</Label>
                <Input
                  id="medium"
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  placeholder="https://medium.com/@..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok">TikTok URL</Label>
                <Input
                  id="tiktok"
                  value={formData.tiktok || ''}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  placeholder="https://tiktok.com/@..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discord">Discord URL</Label>
                <Input
                  id="discord"
                  value={formData.discord || ''}
                  onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                  placeholder="https://discord.gg/..."
                />
              </div>
            </div>
          </TabsContent>

          {/* Custom Links Tab */}
          <TabsContent value="links" className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Custom Links</h3>
              <Button onClick={addCustomLink} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>
            <div className="space-y-3">
              {customLinks.map((link, index) => (
                <Card key={index} className="p-4">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1 space-y-3">
                      <Input
                        placeholder="Link Label (e.g., Portfolio)"
                        value={link.label}
                        onChange={(e) => updateCustomLink(index, 'label', e.target.value)}
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateCustomLink(index, 'url', e.target.value)}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeCustomLink(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              {customLinks.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No custom links yet. Click "Add Link" to create one.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Custom Fields Tab */}
          <TabsContent value="fields" className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Custom Fields</h3>
              <Button onClick={addCustomField} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>
            <div className="space-y-3">
              {customFields.map((field, index) => (
                <Card key={index} className="p-4">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1 space-y-3">
                      <Input
                        placeholder="Field Label (e.g., Favorite Quote)"
                        value={field.label}
                        onChange={(e) => updateCustomField(index, 'label', e.target.value)}
                      />
                      <Textarea
                        placeholder="Field Value"
                        value={field.value}
                        onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeCustomField(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              {customFields.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No custom fields yet. Click "Add Field" to create one.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save & Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeroEditDialog;
