import { Mail, Linkedin, Github } from "lucide-react";

const Hero = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Muhammad Zeeshan
          </h1>
          <p className="text-lg text-muted-foreground">
            Bahawalpur, Pakistan
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="mailto:malikzeeshan3.1417@gmail.com"
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>malikzeeshan3.1417@gmail.com</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammadzeeshan007/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="pt-4 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Summary</h2>
          <p className="text-foreground leading-relaxed">
            Machine Learning Expert with over 2 years of experience in machine learning, deep learning and Python
            programming. Passionate about using statistical analysis, data management, and visualizations to drive
            informed decision-making and tangible business value. Proactive team player and effective communicator, who
            thrives in collaborative, high-performing team cultures.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
