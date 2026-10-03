import { createContext, useContext, useEffect, useState } from "react";
import { defaultProfile, defaultProjects, defaultSkills, defaultExperiences, defaultEducation, defaultAboutHighlights } from "../data/defaultData";

const PortfolioContext = createContext();

let rawApiUrl = import.meta.env.VITE_API_URL || "https://portfolio-backend-qo0u.onrender.com/api";
if (!rawApiUrl || rawApiUrl.includes("your-portfolio-backend.onrender.com")) {
  rawApiUrl = "https://portfolio-backend-qo0u.onrender.com/api";
}
const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

// Helper for fetch with timeout (e.g. 5000ms abort for sleeping backends)
const fetchWithTimeout = async (url, timeoutMs = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
};

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [aboutHighlights, setAboutHighlights] = useState(defaultAboutHighlights);
  const [projects, setProjects] = useState(defaultProjects);
  const [skills, setSkills] = useState(defaultSkills);
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [education, setEducation] = useState(defaultEducation);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const fetchPortfolioData = async () => {
    try {
      const [profileData, highlightsData, projectsData, skillsData, expData, eduData] = await Promise.allSettled([
        fetchWithTimeout(`${API_BASE_URL}/profile`),
        fetchWithTimeout(`${API_BASE_URL}/highlights`),
        fetchWithTimeout(`${API_BASE_URL}/projects`),
        fetchWithTimeout(`${API_BASE_URL}/skills`),
        fetchWithTimeout(`${API_BASE_URL}/experiences`),
        fetchWithTimeout(`${API_BASE_URL}/education`),
      ]);

      if (profileData.status === "fulfilled" && profileData.value && profileData.value.name) {
        setProfile((prev) => ({ ...prev, ...profileData.value }));
        setIsBackendConnected(true);
      }

      if (highlightsData.status === "fulfilled" && Array.isArray(highlightsData.value) && highlightsData.value.length > 0) {
        setAboutHighlights(highlightsData.value);
      }

      if (projectsData.status === "fulfilled" && Array.isArray(projectsData.value) && projectsData.value.length > 0) {
        setProjects(projectsData.value);
        setIsBackendConnected(true);
      }

      if (skillsData.status === "fulfilled" && Array.isArray(skillsData.value) && skillsData.value.length > 0) {
        setSkills(skillsData.value);
        setIsBackendConnected(true);
      }

      if (expData.status === "fulfilled" && Array.isArray(expData.value) && expData.value.length > 0) {
        setExperiences(expData.value);
      }

      if (eduData.status === "fulfilled" && Array.isArray(eduData.value) && eduData.value.length > 0) {
        setEducation(eduData.value);
      }
    } catch (err) {
      console.warn("Backend unavailable or timed out, retaining default portfolio data", err);
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
        aboutHighlights,
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
