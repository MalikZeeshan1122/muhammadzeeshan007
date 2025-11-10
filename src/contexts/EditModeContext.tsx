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
    location: "Bahawalpur, Pakistan",
    email: "malikzeeshan3.1417@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhammadzeeshan007/",
    summary: "Machine Learning Expert with over 2 years of experience in machine learning, deep learning and Python programming. Passionate about using statistical analysis, data management, and visualizations to drive informed decision-making and tangible business value. Proactive team player and effective communicator, who thrives in collaborative, high-performing team cultures."
  },
  experiences: [
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
        "Gaining comprehensive expertise in AI, ML, and DL"
      ]
    }
  ],
  projects: [
    {
      title: "Applied Data Science SpaceX Falcon 9 Prediction",
      description: "Capstone project for predictive modeling and analysis",
      points: [
        "Predictive Modeling: Forecasted SpaceX's first stage landing success",
        "Data Wrangling: Collected and processed data from SpaceX API",
        "Interactive Visual Analytics: Created dashboards with Folium and Plotly"
      ]
    }
  ],
  technicalSkills: [
    "Python", "SQL", "Tableau", "TensorFlow", "Deep Learning"
  ],
  softSkills: [
    "Research", "Communication", "Collaboration"
  ],
  certifications: [
    { name: "Microsoft Certified Azure AI", year: "2023" },
    { name: "Google Data Analytics", year: "2023" }
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
