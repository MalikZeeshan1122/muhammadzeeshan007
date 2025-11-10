const Education = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science, Artificial Intelligence",
      institution: "Islamia University Bahawalpur, Pakistan",
      period: "2022 – 2026",
      details: null
    },
    {
      degree: "FSC Intermediate in Pre-Engineering",
      institution: "Moon College Bahawalpur, Punjab, Pakistan",
      period: "2022",
      details: "Men's Cricket Team Captain"
    }
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-muted-foreground">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">{edu.period}</p>
            {edu.details && (
              <p className="text-sm text-foreground italic">• {edu.details}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
