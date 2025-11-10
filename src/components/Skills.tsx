import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const technicalSkills = [
    "Python", "SQL", "Tableau", "Pandas", "Numpy", "SciPy", "Seaborn", "Matplotlib",
    "TensorFlow", "Deep Learning", "LLM", "NLP", "Linear Regression", "Logistic Regression",
    "Classification", "Random Forest", "Clustering", "PCA", "Anomaly Detection", 
    "Docker", "Flask", "Streamlit"
  ];

  const softSkills = [
    "Research", "Communication", "Accountability", "Collaboration", 
    "Critical Thinking", "Passion", "Presentation", "Idea Generation"
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Skills</h2>
      
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
    </section>
  );
};

export default Skills;
