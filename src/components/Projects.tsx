import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  const projects = [
    {
      title: "Applied Data Science SpaceX Falcon 9 Prediction",
      description: "Capstone project for predictive modeling and analysis",
      points: [
        "Predictive Modeling: Forecasted SpaceX's first stage landing success using classification algorithms.",
        "Data Wrangling: Collected and processed data from SpaceX API and Wikipedia.",
        "Exploratory Data Analysis: Identified correlations between variables using visualization tools and SQL.",
        "Interactive Visual Analytics: Created interactive dashboards with Folium and Plotly Dash.",
        "Machine Learning: Optimized classification models for predicting landing success."
      ]
    },
    {
      title: "New York City Motor Vehicle Collision Analysis",
      description: "Streamlit application for collision data visualization",
      points: [
        "Data Visualization: Created interactive dashboards to visualize NYC motor vehicle collisions.",
        "Exploratory Data Analysis: Performed EDA on collision data to identify trends and insights.",
        "Geospatial Analysis: Created interactive maps to showcase incident locations and frequencies.",
        "Data Wrangling: Loaded and cleaned data from NYC Open Data API."
      ]
    },
    {
      title: "Financial Dashboard - World Bank API",
      description: "Streamlit dashboard for financial data analysis",
      points: [
        "Financial Dashboard: Created a dashboard using World Bank API data.",
        "Data Integration: Integrated API data into a unified dashboard.",
        "Economic Analysis: Analyzed GDP, trade, and population trends.",
        "Data Visualization: Presented complex data in intuitive dashboards.",
        "API Expertise: Utilized World Bank API for data retrieval."
      ]
    }
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Projects</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={index} className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {project.points.map((point, i) => (
                  <li key={i} className="text-foreground text-sm leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
