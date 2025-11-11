import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
    substack: "https://malikzeeshan007.substack.com",
    facebook: "",
    instagram: "",
    medium: "",
    profilePhoto: "",
    resumeUrl: "",
    thesisUrl: "",
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
      year: "2024",
      title: "Break with Data Community Member",
      organization: "ML 30-Day Challenge",
      points: [
        "Collaborated with peers on data-centric projects and shared insights within the community."
      ]
    },
    {
      year: "September 2024",
      title: "LLM Trailblazers Program",
      organization: "Advanced NLP & LLMs",
      points: [
        "Explored advanced LLM applications like retrieval-augmented generation (RAG) and fine-tuning models."
      ]
    },
    {
      year: "October 2024",
      title: "Generative AI Bootcamp",
      organization: "Pak Angels and iCodeGuru",
      points: [
        "Recognized as a Top Performer in the Generative AI Training Cohort-I by Pak Angels and iCodeGuru."
      ]
    }
  ],
  hackathons: [
    {
      year: "Multiple Events",
      title: "AI Hackathon Participant",
      organization: "Various Organizations",
      points: [
        "Developed innovative AI solutions under tight deadlines, showcasing problem-solving and collaboration skills."
      ]
    }
  ],
  featuredTalks: [],
  teaching: [],
  featuredWriting: [],
  petProjects: [
    {
      title: "SpaceX Falcon 9 Prediction",
      category: "Machine Learning & Data Science",
      date: "November 2024",
      description: "Predicted landing success using classification models and SpaceX API data, with EDA and interactive dashboards.",
      url: "",
      github: "",
      images: [],
      problem: "SpaceX needs to predict Falcon 9 rocket landing success to optimize mission planning, reduce costs, and improve safety. Failed landings result in significant financial losses and mission delays. The challenge is to build an accurate predictive model using historical launch data to identify patterns and key factors affecting landing outcomes.",
      audience: "Space Industry Stakeholders: Companies and organizations planning satellite deployments who need reliable launch success predictions.\n\nData Scientists & ML Engineers: Professionals interested in real-world aerospace applications of machine learning and predictive analytics.\n\nSpace Technology Enthusiasts: Researchers and hobbyists tracking SpaceX missions and interested in data-driven analysis of rocket landing success factors.",
      solution: "Developed a comprehensive machine learning solution that fetches real-time data from SpaceX API, performs extensive exploratory data analysis, and trains multiple classification models to predict landing success with high accuracy.",
      usp: "Unlike simple analytics dashboards, this project combines real-time API integration, advanced feature engineering, and multiple ML models with interactive visualizations to provide actionable insights into rocket landing predictions. The model identifies specific factors like payload mass, orbit type, and launch site that directly impact success rates.",
      technologies: ["Python", "scikit-learn", "Pandas", "Matplotlib", "SpaceX API", "Jupyter"],
      features: [
        "Real-time data fetching from SpaceX API",
        "Exploratory Data Analysis (EDA) with visualization",
        "Multiple classification models (Logistic Regression, Random Forest, SVM)",
        "Interactive dashboards for prediction visualization",
        "Model performance comparison and evaluation"
      ],
      implementation: "Built a machine learning pipeline that fetches data from SpaceX API, performs data cleaning and feature engineering, trains multiple classification models, and evaluates their performance. The best-performing model is used to predict landing success with an interactive dashboard for visualization. The system uses Python for data processing, scikit-learn for model training, and Matplotlib for creating insightful visualizations of prediction outcomes and feature importance.",
      results: "Achieved 95% accuracy in predicting landing success. The model successfully identified key factors affecting landing outcomes, including payload mass, orbit type, and launch site. The interactive dashboard provides mission planners with confidence scores and risk assessments for upcoming launches.",
      additionalInfo: "Future Enhancements:\n- Real-time prediction API for integration with mission planning systems\n- Advanced ensemble methods combining multiple models for improved accuracy\n- Weather data integration for more comprehensive risk assessment\n- Automated retraining pipeline as new launch data becomes available\n\nTechnical Achievements:\n- Handled imbalanced dataset using SMOTE and class weighting techniques\n- Feature engineering included polynomial features and interaction terms\n- Cross-validation with stratified k-fold to ensure robust model evaluation\n- Comprehensive model comparison including precision, recall, and F1-score metrics"
    },
    {
      title: "NYC Motor Vehicle Collision Analysis",
      description: "Created interactive dashboards and geospatial visualizations for analyzing NYC vehicle collision data.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "Pandas", "Plotly", "Folium", "GeoPandas", "Streamlit"],
      features: [
        "Geospatial visualization of collision hotspots",
        "Time-series analysis of collision trends",
        "Interactive filtering by borough, vehicle type, and time period",
        "Heatmap visualization of high-risk areas",
        "Statistical analysis of contributing factors"
      ],
      implementation: "Developed a comprehensive dashboard using Streamlit that processes NYC Open Data collision records, performs geospatial analysis, and creates interactive visualizations. Implemented clustering algorithms to identify high-risk zones.",
      results: "Successfully identified top 10 collision hotspots in NYC and temporal patterns showing peak collision hours. Insights used for traffic safety recommendations."
    },
    {
      title: "Financial Dashboard",
      description: "Built a financial dashboard using World Bank API data to analyze economic trends like GDP and trade.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "World Bank API", "Plotly", "Dash", "Pandas", "NumPy"],
      features: [
        "Multi-country economic indicator comparison",
        "GDP growth trend visualization",
        "Trade balance analysis and forecasting",
        "Interactive time-series charts",
        "Export functionality for reports"
      ],
      implementation: "Created an interactive dashboard that fetches real-time economic data from World Bank API, processes multiple indicators, and provides comparative analysis across countries and time periods with dynamic visualizations.",
      results: "Dashboard provides insights into economic trends for 100+ countries with real-time data updates. Successfully used for economic policy research and academic presentations."
    },
    {
      title: "Cancer Detection Models (Breast & Skin Cancer)",
      description: "Developed classification models to predict breast cancer malignancy and built a CNN to classify skin lesions from medical images, deploying both using Flask.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "TensorFlow", "Keras", "scikit-learn", "Flask", "OpenCV", "NumPy"],
      features: [
        "Breast cancer classification using Wisconsin dataset",
        "CNN-based skin lesion classification",
        "Image preprocessing and augmentation pipeline",
        "REST API deployment with Flask",
        "Real-time prediction interface",
        "Model performance metrics and visualization"
      ],
      implementation: "Developed two separate models: a traditional ML classifier for breast cancer diagnosis and a deep CNN for skin lesion classification. Implemented data augmentation, model training with cross-validation, and deployed as a Flask web service.",
      results: "Breast cancer model achieved 97% accuracy, skin lesion CNN achieved 92% accuracy. Successfully deployed as a web application for real-time medical image analysis."
    },
    {
      title: "AI-Powered Cold Email Generator",
      description: "Created an AI tool to generate personalized cold emails and integrated job listings via web scraping.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "OpenAI API", "BeautifulSoup", "Selenium", "Flask", "LangChain"],
      features: [
        "Automated job listing extraction from multiple platforms",
        "AI-powered personalized email generation",
        "Company information enrichment",
        "Template customization options",
        "Bulk email generation capability"
      ],
      implementation: "Built a system that scrapes job postings, extracts relevant information, enriches data with company details, and uses GPT models to generate personalized cold emails matching the candidate's profile to each position.",
      results: "Generated 500+ personalized emails with 35% response rate improvement compared to generic templates. Reduced email writing time by 90%."
    },
    {
      title: "Chatbot for Customer Support",
      description: "Built an NLP-based chatbot for automating FAQs and ticket generation, deployed using Flask.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "NLTK", "spaCy", "Flask", "SQLite", "Rasa", "TensorFlow"],
      features: [
        "Intent recognition and entity extraction",
        "FAQ automation with 90% accuracy",
        "Automatic ticket generation for complex queries",
        "Conversation history tracking",
        "Multi-language support",
        "Admin dashboard for analytics"
      ],
      implementation: "Developed an NLP chatbot using Rasa framework with custom intent classification, entity recognition, and dialogue management. Integrated with ticketing system for seamless escalation of complex queries.",
      results: "Reduced customer support response time by 70%. Successfully handled 10,000+ queries with 85% resolution rate without human intervention."
    },
    {
      title: "Sentiment Analysis of Product Reviews",
      description: "Analyzed product reviews to classify sentiment and visualize trends using NLP techniques.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "NLTK", "VADER", "TextBlob", "Matplotlib", "Seaborn", "Pandas"],
      features: [
        "Multi-class sentiment classification (positive, negative, neutral)",
        "Aspect-based sentiment analysis",
        "Trend visualization over time",
        "Word cloud generation for key themes",
        "Comparative analysis across products"
      ],
      implementation: "Implemented a comprehensive sentiment analysis pipeline using multiple NLP techniques including VADER, TextBlob, and custom LSTM models. Performed aspect extraction and sentiment scoring for each product feature.",
      results: "Analyzed 50,000+ product reviews with 88% accuracy. Identified key pain points and positive features, leading to actionable product improvement insights."
    },
    {
      title: "Real Estate Price Prediction",
      description: "Developed regression models to predict real estate prices and visualized key factors in an interactive dashboard.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "scikit-learn", "XGBoost", "Pandas", "Plotly", "Streamlit"],
      features: [
        "Multiple regression models (Linear, Ridge, XGBoost)",
        "Feature importance visualization",
        "Interactive price prediction interface",
        "Neighborhood-based analysis",
        "Market trend visualization"
      ],
      implementation: "Built an end-to-end ML pipeline for real estate price prediction using ensemble methods. Performed feature engineering on property characteristics, location data, and market indicators. Created an interactive dashboard for predictions.",
      results: "Achieved R² score of 0.89 on test data. Successfully identified top 5 price-influencing factors: location, square footage, number of bedrooms, age, and proximity to amenities."
    },
    {
      title: "Time Series Bar Chart Race Animation",
      description: "Created animated bar chart races in Python using Matplotlib, visualizing time-series data trends with dynamic, engaging animations.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "Matplotlib", "Pandas", "NumPy", "FFmpeg"],
      features: [
        "Smooth animated transitions",
        "Customizable color schemes and themes",
        "Multiple data series support",
        "Video export functionality",
        "Responsive axis scaling"
      ],
      implementation: "Developed a Python library for creating bar chart race animations with smooth transitions. Implemented frame-by-frame rendering with Matplotlib and video encoding using FFmpeg.",
      results: "Created engaging visualizations for 20+ datasets. Animations used in presentations and gained 5,000+ views on social media."
    },
    {
      title: "Line Graph Animation for Time Series",
      description: "Developed animated line graphs in Python to visualize time-series data, with smooth transitions to highlight data trends over time.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "Matplotlib", "Pandas", "NumPy", "MoviePy"],
      features: [
        "Multi-line animated charts",
        "Progressive data reveal animation",
        "Custom easing functions",
        "Annotation and labeling support",
        "High-quality video export"
      ],
      implementation: "Built an animation framework that progressively reveals time-series data with smooth transitions. Implemented custom interpolation algorithms for natural-looking animations.",
      results: "Successfully visualized complex temporal trends in climate, financial, and social media data. Animations widely shared in data science community."
    },
    {
      title: "Automated Analytics Report Generation",
      description: "Automated PDF report creation using Python and Quarto, generating dynamic, structured reports for data analysis documentation.",
      url: "",
      github: "",
      images: [],
      technologies: ["Python", "Quarto", "Pandas", "Matplotlib", "Jinja2", "ReportLab"],
      features: [
        "Template-based report generation",
        "Dynamic chart and table insertion",
        "Customizable branding and styling",
        "Batch report generation",
        "Automated scheduling support"
      ],
      implementation: "Created a reporting automation system using Quarto for templating and Python for data processing. Implemented dynamic content generation with charts, tables, and narrative text based on data insights.",
      results: "Reduced report generation time from 4 hours to 10 minutes. Generated 200+ automated reports with consistent quality and formatting."
    }
  ],
  publications: [],
  miscLinks: [],
  technicalSkills: [
    "Python", "SQL", "Tableau", "Pandas", "Numpy", "SciPy", "Seaborn", "Matplotlib", 
    "TensorFlow", "Deep Learning", "LLM", "NLP", "Linear Regression", "Logistic Regression", 
    "Classification", "Random Forest", "Clustering", "PCA", "Anomaly Detection", 
    "Docker", "Flask", "Streamlit", "Knowledge Base", "Azure", "AWS"
  ],
  softSkills: [
    "Research", "Communication", "Accountability", "Collaboration", 
    "Critical Thinking", "Passion", "Presentation", "Idea Generation"
  ],
  certifications: [
    { name: "AI Agents on Arc with USDC Hackathon Certificate", year: "Nov 2025", url: "https://lablab.ai/event/ai-agents-on-arc-with-usdc-hackathon/certificate/cmht324q9002ua60sysmld91t" },
    { name: "Global AI Hackathon - BrandAI: The Trust Layer for AI-Generated Ads", year: "Nov 2025", url: "https://hack-nation.com/certificate/3ae0d69c-ab28-485f-b0af-abe3b2bbf979" },
    { name: "AWS Certified Solutions Architect – Associate | Coursera", year: "2024", url: "" },
    { name: "Machine Learning Specialization | Stanford University, Coursera", year: "2023", url: "" },
    { name: "Microsoft Certified Azure AI", year: "2023", url: "" },
    { name: "Generative AI: Prompt Engineering | Coursera", year: "2023", url: "" },
    { name: "Google Data Analytics Professional Certificate", year: "2023", url: "" },
    { name: "IBM AI Engineering Professional Certificate", year: "2023", url: "" },
    { name: "Machine Learning in Production | Coursera", year: "2023", url: "" },
    { name: "Prime Minister's Youth Skills (NAVTTC)", year: "2023", url: "" }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science (Artificial Intelligence)",
      institution: "Islamia University Bahawalpur, Pakistan",
      period: "2022 – 2026",
      details: "Key Courses: Machine Learning, Deep Learning, Natural Language Processing, AI System Design. Extracurricular: Men's Cricket Team Captain, AI Research Club Member"
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
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE_DATA;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load data from database on mount (for all visitors)
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load the first portfolio data (publicly viewable)
        const { data, error } = await supabase
          .from('portfolio_data')
          .select('data')
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error loading portfolio data:', error);
        } else if (data) {
          setProfileData(data.data);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to database whenever profileData changes (if user is authenticated)
  useEffect(() => {
    const saveData = async () => {
      if (!user || isLoading) return;

      try {
        const { error } = await supabase
          .from('portfolio_data')
          .upsert({
            user_id: user.id,
            data: profileData
          }, {
            onConflict: 'user_id'
          });

        if (error) {
          console.error('Error saving portfolio data:', error);
          toast.error('Failed to save changes');
        } else {
          toast.success('Changes saved automatically');
        }
      } catch (error) {
        console.error('Error saving portfolio data:', error);
      }
    };

    saveData();
  }, [profileData, user, isLoading]);

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
