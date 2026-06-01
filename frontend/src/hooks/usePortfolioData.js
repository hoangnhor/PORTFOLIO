import { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { getPortfolioDynamicSections } from "../services/portfolioApi";

const emptyPortfolio = {
  skills: portfolioData.skills || [],
  projects: portfolioData.projects || [],
  experiences: portfolioData.experiences || []
};

function toFriendlyError(error) {
  if (error?.code === "TIMEOUT") {
    return "Kết nối đến máy chủ quá chậm. Vui lòng thử lại.";
  }
  if (error?.code === "HTTP_ERROR") {
    return `Không tải được dữ liệu dự án (HTTP ${error.status || "?"}).`;
  }
  return "Không tải được dữ liệu động từ cơ sở dữ liệu.";
}

function mergeProjectsWithLocalFallback(dynamicProjects = []) {
  const localProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects : [];
  const normalizedDynamic = Array.isArray(dynamicProjects) ? dynamicProjects : [];
  const existingTitles = new Set(
    normalizedDynamic.map((project) => String(project?.title || "").trim().toLowerCase()).filter(Boolean)
  );

  const missingLocalProjects = localProjects.filter((project) => {
    const titleKey = String(project?.title || "").trim().toLowerCase();
    return titleKey && !existingTitles.has(titleKey);
  });

  return [...normalizedDynamic, ...missingLocalProjects];
}

export function usePortfolioData() {
  const [portfolio, setPortfolio] = useState(emptyPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [usingLocalFallback, setUsingLocalFallback] = useState(false);
  const isMountedRef = useRef(true);

  async function loadProjects(skipCache = false) {
    if (!isMountedRef.current) {
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    try {
      const dynamicData = await getPortfolioDynamicSections({ skipCache });
      if (!isMountedRef.current) {
        return;
      }

      setUsingLocalFallback(false);
      setPortfolio({
        skills: Array.isArray(dynamicData.skills) ? dynamicData.skills : [],
        projects: mergeProjectsWithLocalFallback(dynamicData.projects),
        experiences: Array.isArray(dynamicData.experiences) ? dynamicData.experiences : []
      });
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }
      setErrorMessage(toFriendlyError(error));
      setUsingLocalFallback(true);
      setPortfolio({
        skills: portfolioData.skills || [],
        projects: portfolioData.projects || [],
        experiences: portfolioData.experiences || []
      });
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true;
    loadProjects(true);

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const displayPortfolio = useMemo(
    () => ({
      ...portfolioData,
      skills: Array.isArray(portfolio.skills) ? portfolio.skills : [],
      projects: Array.isArray(portfolio.projects) ? portfolio.projects : [],
      experiences: Array.isArray(portfolio.experiences) ? portfolio.experiences : []
    }),
    [portfolio]
  );

  return {
    displayPortfolio,
    isLoading,
    errorMessage,
    usingLocalFallback,
    loadProjects
  };
}
