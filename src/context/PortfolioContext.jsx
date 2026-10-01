import { createContext, useContext, useEffect, useState } from "react";
import { defaultProfile, defaultProjects, defaultSkills, defaultExperiences, defaultEducation } from "../data/defaultData";

const PortfolioContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [projects, setProjects] = useState(defaultProjects);
  const [skills, setSkills] = useState(defaultSkills);
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [education, setEducation] = useState(defaultEducation);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const fetchPortfolioData = async () => {
    try {
      // Fetch Profile
      const profileRes = await fetch(`${API_BASE_URL}/profile`).catch(() => null);
      if (profileRes && profileRes.ok) {
        const data = await profileRes.json();
        if (data && data.name) {
          setProfile((prev) => ({ ...prev, ...data }));
          setIsBackendConnected(true);
        }
      }

      // Fetch Projects
      const projectsRes = await fetch(`${API_BASE_URL}/projects`).catch(() => null);
      if (projectsRes && projectsRes.ok) {
        const data = await projectsRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setIsBackendConnected(true);
        }
      }

      // Fetch Skills
      const skillsRes = await fetch(`${API_BASE_URL}/skills`).catch(() => null);
      if (skillsRes && skillsRes.ok) {
        const data = await skillsRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
          setIsBackendConnected(true);
        }
      }

      // Fetch Experiences
      const expRes = await fetch(`${API_BASE_URL}/experiences`).catch(() => null);
      if (expRes && expRes.ok) {
        const data = await expRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data);
        }
      }

      // Fetch Education
      const eduRes = await fetch(`${API_BASE_URL}/education`).catch(() => null);
      if (eduRes && eduRes.ok) {
        const data = await eduRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setEducation(data);
        }
      }
    } catch (err) {
      console.warn("Backend not available, using default portfolio data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        skills,
        experiences,
        education,
        loading,
        isBackendConnected,
        refreshData: fetchPortfolioData,
        API_BASE_URL,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
