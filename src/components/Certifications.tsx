const Certifications = () => {
  const certifications = [
    { name: "Prime Minister's Youth Skills (NAVTTC)", year: "2023" },
    { name: "Microsoft Certified Azure AI", year: "2023" },
    { name: "Machine learning specialization | Coursera", year: "2023" },
    { name: "Google Data Analytics", year: "2023" },
    { name: "Applied Data Science Capstone", year: "2023" },
    { name: "IBM AI Engineering", year: "2023" },
    { name: "Machine learning in Production | Coursera", year: "2023" },
    { name: "Machine learning Specialization | Stanford University | Coursera", year: "2023" },
    { name: "Generative AI: Prompt Engineering | Coursera", year: "2023" },
    { name: "AWS Certified Solutions Architect - Associate | Coursera", year: "2024" }
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Certifications</h2>
      <div className="grid gap-3">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="flex items-baseline justify-between gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <p className="text-foreground">{cert.name}</p>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
