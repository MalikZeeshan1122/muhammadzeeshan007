import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useEditMode } from "@/contexts/EditModeContext";
import EditButton from "./EditButton";
import SkillsEditDialog from "./SkillsEditDialog";

const Skills = () => {
  const { profileData } = useEditMode();
  const [editOpen, setEditOpen] = useState(false);
  const technicalSkills = profileData.technicalSkills;
  const softSkills = profileData.softSkills;

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Skills</h2>
        <EditButton onClick={() => setEditOpen(true)} />
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <SkillsEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </section>
  );
};

export default Skills;
