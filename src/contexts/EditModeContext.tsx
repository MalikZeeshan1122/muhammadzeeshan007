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
    tagline: "I like to train deep neural nets on large datasets 🧠🤖💥",
    location: "Bahawalpur, Pakistan",
    email: "malikzeeshan3.1417@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhammadzeeshan007/",
    github: "",
    twitter: "",
    youtube: "",
    profilePhoto: "",
    summary: "Machine Learning Expert with over 2 years of experience in machine learning, deep learning and Python programming. Passionate about using statistical analysis, data management, and visualizations to drive informed decision-making and tangible business value."
  },
  experiences: [
    {
      year: "2023 - 2024",
      title: "Certificate in Artificial Intelligence Program",
      organization: "Deep Embed Lab | Pak AI Vision Group, Silicon Valley, USA",
      points: [
        "Completed 1600+ hours of training in data science, mastering machine learning and deep learning algorithms.",
        "Executed multiple data-centric projects, enhancing proficiency in Python, SQL, and ML libraries."
      ]
    },
    {
      year: "2023",
      title: "Artificial Intelligence (ML, DL, Microsoft Azure)",
      organization: "NAVCTT | BWP, Pakistan",
      points: [
        "Participating in Prime Minister's Youth Skills Development Program",
        "Gaining comprehensive expertise in AI, ML, and DL"
      ]
    }
  ],
  featuredTalks: [
    {
      title: "Machine Learning Workshop",
      description: "Introduction to Neural Networks",
      url: "",
      thumbnail: ""
    }
  ],
  teaching: [
    {
      title: "Deep Learning Course",
      description: "Comprehensive course on CNNs and RNNs",
      url: "",
      thumbnail: ""
    }
  ],
  featuredWriting: [
    {
      date: "Mar 2024",
      title: "Understanding Transformers",
      url: ""
    }
  ],
  petProjects: [
    {
      title: "Applied Data Science SpaceX Falcon 9 Prediction",
      description: "Predictive modeling using classification algorithms for SpaceX first stage landing success. Created interactive dashboards with Folium and Plotly Dash.",
      url: "",
      github: ""
    }
  ],
  publications: [
    {
      title: "Machine Learning Research Paper",
      authors: "Muhammad Zeeshan",
      venue: "Conference 2024",
      url: ""
    }
  ],
  miscLinks: [
    {
      title: "My YouTube Channel",
      description: "Educational videos on AI and Machine Learning",
      url: ""
    }
  ],
  technicalSkills: [
    "Python", "SQL", "Tableau", "TensorFlow", "Deep Learning", "NLP", "Computer Vision"
  ],
  softSkills: [
    "Research", "Communication", "Collaboration", "Critical Thinking"
  ],
  certifications: [
    { name: "Microsoft Certified Azure AI", year: "2023" },
    { name: "Google Data Analytics", year: "2023" },
    { name: "Machine Learning Specialization", year: "2023" }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science, Artificial Intelligence",
      institution: "Islamia University Bahawalpur, Pakistan",
      period: "2022 – 2026",
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
