import React, { createContext, useContext, useState, useEffect } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  profileData: any;
  updateProfileData: (data: any) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

const DEFAULT_PROFILE_DATA = {
  hero: {
    name: "Muhammad Zeeshan",
    tagline: "Specializing in ML, DL, NLP, LLMs, and Computer Vision 🧠🤖💥",
    location: "Bahawalpur, Pakistan",
    email: "malikzeeshan3.1417@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhammadzeeshan007/",
    github: "",
    twitter: "",
    youtube: "",
    profilePhoto: "",
    summary: "With 3+ years of experience in developing and deploying ML, DL, and NLP models, I specialize in predictive modeling, data visualization, and statistical analysis using TensorFlow, PyTorch, and scikit-learn. Skilled in LLMs, RAG, computer vision, and chatbot frameworks like Langflow, Rasa, Botpress, and LangChain. Proficient in cloud platforms (AWS, Azure, Google Cloud) for scalable deployment. Passionate about solving real-world problems and staying ahead in AI advancements."
  },
  experiences: [
    {
      year: "Jun 2023 - Jun 2024",
      title: "Certificate in Artificial Intelligence",
      organization: "Deep Embed Lab | Pak AI Vision Group, Silicon Valley, USA",
      points: [
        "Completed 1600+ hours of training in machine learning (Logistic Regression, Random Forest, PCA, K-Means, SVM) and deep learning (CNNs, LSTMs, GANs, Autoencoders)."
      ]
    },
    {
      year: "Mar 2023 - Sep 2023",
      title: "Artificial Intelligence Trainee",
      organization: "Prime Minister's Youth Skills Development Program (NAVTTC) | BWP, Pakistan",
      points: [
        "Gained hands-on expertise in AI, ML, and DL tools, including supervised, unsupervised, and reinforcement learning."
      ]
    },
    {
      year: "2023 - 2024",
      title: "AI Hackathon Participant",
      organization: "Multiple Events",
      points: [
        "Developed innovative AI solutions under tight deadlines, showcasing problem-solving and collaboration skills."
      ]
    },
    {
      year: "2023 - 2024",
      title: "Break with Data Community Member",
      organization: "ML 30-Day Challenge",
      points: [
        "Collaborated with peers on data-centric projects and shared insights within the community."
      ]
    },
    {
      year: "2024",
      title: "LLM Trailblazers Program",
      organization: "Advanced NLP & LLMs",
      points: [
        "Explored advanced LLM applications like retrieval-augmented generation (RAG) and fine-tuning models."
      ]
    },
    {
      year: "2024",
      title: "Generative AI Bootcamp",
      organization: "Problem Solving",
      points: [
        "Recognized as a Top Performer in the Generative AI Training Cohort-I by Pak Angels and iCodeGuru."
      ]
    }
  ],
  featuredTalks: [],
  teaching: [],
  featuredWriting: [],
  petProjects: [
    {
      title: "SpaceX Falcon 9 Prediction",
      description: "Predicted landing success using classification models and SpaceX API data, with EDA and interactive dashboards.",
      url: "",
      github: ""
    },
    {
      title: "NYC Motor Vehicle Collision Analysis",
      description: "Created interactive dashboards and geospatial visualizations for analyzing NYC vehicle collision data.",
      url: "",
      github: ""
    },
    {
      title: "Financial Dashboard",
      description: "Built a financial dashboard using World Bank API data to analyze economic trends like GDP and trade.",
      url: "",
      github: ""
    },
    {
      title: "Cancer Detection Models (Breast & Skin Cancer)",
      description: "Developed classification models to predict breast cancer malignancy and built a CNN to classify skin lesions from medical images, deploying both using Flask.",
      url: "",
      github: ""
    },
    {
      title: "AI-Powered Cold Email Generator",
      description: "Created an AI tool to generate personalized cold emails and integrated job listings via web scraping.",
      url: "",
      github: ""
    },
    {
      title: "Chatbot for Customer Support",
      description: "Built an NLP-based chatbot for automating FAQs and ticket generation, deployed using Flask.",
      url: "",
      github: ""
    },
    {
      title: "Sentiment Analysis of Product Reviews",
      description: "Analyzed product reviews to classify sentiment and visualize trends using NLP techniques.",
      url: "",
      github: ""
    },
    {
      title: "Real Estate Price Prediction",
      description: "Developed regression models to predict real estate prices and visualized key factors in an interactive dashboard.",
      url: "",
      github: ""
    },
    {
      title: "Time Series Bar Chart Race Animation",
      description: "Created animated bar chart races in Python using Matplotlib, visualizing time-series data trends with dynamic, engaging animations.",
      url: "",
      github: ""
    },
    {
      title: "Line Graph Animation for Time Series",
      description: "Developed animated line graphs in Python to visualize time-series data, with smooth transitions to highlight data trends over time.",
      url: "",
      github: ""
    },
    {
      title: "Automated Analytics Report Generation",
      description: "Automated PDF report creation using Python and Quarto, generating dynamic, structured reports for data analysis documentation.",
      url: "",
      github: ""
    }
  ],
  publications: [],
  miscLinks: [],
  technicalSkills: [
    "Python", "SQL", "Tableau", "Pandas", "Numpy", "SciPy", "Seaborn", "Matplotlib", 
    "TensorFlow", "PyTorch", "Deep Learning", "LLM", "NLP", "RAG", "Computer Vision",
    "Linear Regression", "Logistic Regression", "Classification", "Random Forest", 
    "Clustering", "PCA", "Anomaly Detection", "CNNs", "LSTMs", "GANs", "Autoencoders",
    "Langflow", "Rasa", "Botpress", "LangChain", "Docker", "Flask", "Streamlit", 
    "Knowledge Base", "Azure", "AWS", "Google Cloud", "scikit-learn"
  ],
  softSkills: [
    "Research", "Communication", "Accountability", "Collaboration", 
    "Critical Thinking", "Passion", "Presentation", "Idea Generation"
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect – Associate | Coursera", year: "2024" },
    { name: "Machine Learning Specialization | Stanford University, Coursera", year: "2023" },
    { name: "Microsoft Certified Azure AI", year: "2023" },
    { name: "Generative AI: Prompt Engineering | Coursera", year: "2023" },
    { name: "Google Data Analytics Professional Certificate", year: "2023" },
    { name: "IBM AI Engineering Professional Certificate", year: "2023" },
    { name: "Machine Learning in Production | Coursera", year: "2023" },
    { name: "Prime Minister's Youth Skills (NAVTTC)", year: "2023" }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science (Artificial Intelligence)",
      institution: "Islamia University Bahawalpur, Pakistan",
      period: "2022 – 2026",
      details: "Key Courses: Machine Learning, Deep Learning, Natural Language Processing, AI System Design • Extracurricular: Men's Cricket Team Captain, AI Research Club Member"
    },
    {
      degree: "FSC Intermediate (Pre-Engineering)",
      institution: "Moon College, Bahawalpur, Punjab, Pakistan",
      period: "2022",
      details: null
    }
  ]
};

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE_DATA;
  });

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const updateProfileData = (data: any) => {
    setProfileData(data);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, profileData, updateProfileData }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
