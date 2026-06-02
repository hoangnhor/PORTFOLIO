import { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { getPortfolioDynamicSections } from "../services/portfolioApi";

const PORTFOLIO_CACHE_KEY = "portfolio:dynamic-sections:v1";

function buildLocalPortfolio() {
  return {
    ...portfolioData,
    skills: Array.isArray(portfolioData.skills) ? portfolioData.skills : [],
    projects: Array.isArray(portfolioData.projects) ? portfolioData.projects : [],
    experiences: Array.isArray(portfolioData.experiences) ? portfolioData.experiences : []
  };
}

function readCachedPortfolioSnapshot() {
  try {
    const rawValue = window.localStorage.getItem(PORTFOLIO_CACHE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    if (!parsedValue || typeof parsedValue !== "object") {
      return null;
    }

    return {
      skills: Array.isArray(parsedValue.skills) ? parsedValue.skills : [],
      projects: Array.isArray(parsedValue.projects) ? parsedValue.projects : [],
      experiences: Array.isArray(parsedValue.experiences) ? parsedValue.experiences : []
    };
  } catch {
    return null;
  }
}

function writeCachedPortfolioSnapshot(snapshot) {
  try {
    window.localStorage.setItem(
      PORTFOLIO_CACHE_KEY,
      JSON.stringify({
        skills: Array.isArray(snapshot?.skills) ? snapshot.skills : [],
        projects: Array.isArray(snapshot?.projects) ? snapshot.projects : [],
        experiences: Array.isArray(snapshot?.experiences) ? snapshot.experiences : []
      })
    );
  } catch {
    // Ignore storage failures and keep rendering from memory.
  }
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

function buildPortfolioFromSnapshot(snapshot) {
  const localBase = buildLocalPortfolio();
  const cachedSnapshot = snapshot || {};

  return {
    ...localBase,
    skills: Array.isArray(cachedSnapshot.skills) ? cachedSnapshot.skills : localBase.skills,
    projects: mergeProjectsWithLocalFallback(cachedSnapshot.projects),
    experiences: Array.isArray(cachedSnapshot.experiences) ? cachedSnapshot.experiences : localBase.experiences
  };
}

export function usePortfolioData() {
  const [portfolio, setPortfolio] = useState(() => {
    if (typeof window === "undefined") {
      return buildLocalPortfolio();
    }

    return buildPortfolioFromSnapshot(readCachedPortfolioSnapshot());
  });
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  async function loadProjects(skipCache = false) {
    if (!isMountedRef.current) {
      return;
    }
    setIsLoading(true);

    try {
      const dynamicData = await getPortfolioDynamicSections({ skipCache });
      if (!isMountedRef.current) {
        return;
      }

      setPortfolio((current) => ({
        ...current,
        skills: Array.isArray(dynamicData.skills) ? dynamicData.skills : current.skills,
        projects: mergeProjectsWithLocalFallback(dynamicData.projects),
        experiences: Array.isArray(dynamicData.experiences) ? dynamicData.experiences : current.experiences
      }));
      writeCachedPortfolioSnapshot(dynamicData);
    } catch {
      if (!isMountedRef.current) {
        return;
      }
      if (typeof window !== "undefined") {
        const cachedSnapshot = readCachedPortfolioSnapshot();
        if (cachedSnapshot) {
          setPortfolio(buildPortfolioFromSnapshot(cachedSnapshot));
          return;
        }
      }
      setPortfolio(buildLocalPortfolio());
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
      ...buildLocalPortfolio(),
      skills: Array.isArray(portfolio.skills) ? portfolio.skills : [],
      projects: Array.isArray(portfolio.projects) ? portfolio.projects : [],
      experiences: Array.isArray(portfolio.experiences) ? portfolio.experiences : []
    }),
    [portfolio]
  );

  return {
    displayPortfolio,
    isLoading,
    loadProjects
  };
}
