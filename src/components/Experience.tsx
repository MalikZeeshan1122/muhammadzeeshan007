const Experience = () => {
  const experiences = [
    {
      year: "June 2023 - June 2024",
      title: "Certificate in Artificial Intelligence Program",
      organization: "Deep Embed Lab | Pak AI Vision Group, Silicon Valley, USA",
      points: [
        "Completed 1600+ hours of training in data science, mastering machine learning (Linear & logistic regression, Random Forest, K-Means, PCA, SVM) and deep learning (CNNs, LSTMs, GANs, Autoencoders) algorithms.",
        "Executed multiple data-centric projects, enhancing proficiency in Python, SQL, and machine learning libraries (scikit-learn, TensorFlow)."
      ]
    },
    {
      year: "March 2023 - Sep 2023",
      title: "Artificial Intelligence (ML, DL, Microsoft Azure)",
      organization: "NAVCTT | BWP, Pakistan",
      points: [
        "Participating in Prime Minister's Youth Skills Development Program, NAVTTC",
        "Gaining comprehensive expertise in:",
        "• Artificial Intelligence (AI): understanding AI fundamentals, concepts, and applications",
        "• Machine Learning (ML): learning supervised, unsupervised, and reinforcement learning techniques",
        "• Deep Learning (DL): mastering deep neural networks, convolutional neural networks, and recurrent neural networks",
        "• Developing hands-on experience with AI, ML, and DL tools and technologies",
        "• Exploring real-world applications and use cases of AI, ML, and DL in various industries"
      ]
    }
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Experience</h2>
      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-border pl-6 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{exp.year}</p>
            <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
            <p className="text-muted-foreground">{exp.organization}</p>
            <ul className="space-y-1 pt-2">
              {exp.points.map((point, i) => (
                <li key={i} className="text-foreground leading-relaxed">
                  {point.startsWith("•") ? point : `• ${point}`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
