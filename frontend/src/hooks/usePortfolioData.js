import { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { getPortfolioData, getPortfolioMeta } from "../services/portfolioApi";

const PORTFOLIO_CACHE_KEY = "portfolio:full:v3";
let bootstrapPortfolioPromise = null;

function buildLocalPortfolio() {
  return {
    ...portfolioData,
    skills: Array.isArray(portfolioData.skills) ? portfolioData.skills : [],
    projects: Array.isArray(portfolioData.projects) ? portfolioData.projects : [],
    experiences: Array.isArray(portfolioData.experiences) ? portfolioData.experiences : []
  };
}

function normalizePortfolioSnapshot(snapshot) {
  const localBase = buildLocalPortfolio();
  const source = snapshot && typeof snapshot === "object" ? snapshot : {};

  return {
    ...localBase,
    ...source,
    socials: Array.isArray(source.socials) ? source.socials : localBase.socials,
    education: Array.isArray(source.education) ? source.education : localBase.education,
    skills: Array.isArray(source.skills) ? source.skills : localBase.skills,
    projects: Array.isArray(source.projects) ? source.projects : localBase.projects,
    experiences: Array.isArray(source.experiences) ? source.experiences : localBase.experiences
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

    return parsedValue;
  } catch {
    return null;
  }
}

function writeCachedPortfolioSnapshot(snapshot) {
  try {
    window.localStorage.setItem(PORTFOLIO_CACHE_KEY, JSON.stringify(normalizePortfolioSnapshot(snapshot)));
  } catch {
    // Ignore storage failures and keep rendering from memory.
  }
}

function getSnapshotUpdatedAt(snapshot) {
  const updatedAt = snapshot && typeof snapshot === "object" ? snapshot.updatedAt : null;
  return typeof updatedAt === "string" && updatedAt.trim() ? updatedAt.trim() : null;
}

async function resolvePortfolioState() {
  const cachedSnapshot = typeof window !== "undefined" ? readCachedPortfolioSnapshot() : null;

  if (cachedSnapshot) {
    try {
      const liveMeta = await getPortfolioMeta();
      const cachedUpdatedAt = getSnapshotUpdatedAt(cachedSnapshot);
      const liveUpdatedAt = typeof liveMeta?.updatedAt === "string" ? liveMeta.updatedAt.trim() : null;

      if (cachedUpdatedAt && liveUpdatedAt && cachedUpdatedAt === liveUpdatedAt) {
        return {
          portfolio: normalizePortfolioSnapshot(cachedSnapshot),
          dataSourceStatus: "live"
        };
      }
    } catch {
      // Ignore meta probe failures and fall back to fetching the full portfolio.
    }
  }

  try {
    const portfolioDataFromApi = await getPortfolioData();
    const liveUpdatedAt = getSnapshotUpdatedAt(portfolioDataFromApi);
    const nextPortfolio = normalizePortfolioSnapshot({
      ...portfolioDataFromApi,
      updatedAt: liveUpdatedAt || getSnapshotUpdatedAt(cachedSnapshot)
    });

    writeCachedPortfolioSnapshot(nextPortfolio);
    return {
      portfolio: nextPortfolio,
      dataSourceStatus: "live"
    };
  } catch {
    if (cachedSnapshot) {
      return {
        portfolio: normalizePortfolioSnapshot(cachedSnapshot),
        dataSourceStatus: "cached"
      };
    }

    return {
      portfolio: buildLocalPortfolio(),
      dataSourceStatus: "local"
    };
  }
}

function getBootstrapPortfolioState() {
  if (!bootstrapPortfolioPromise) {
    bootstrapPortfolioPromise = resolvePortfolioState().finally(() => {
      bootstrapPortfolioPromise = null;
    });
  }

  return bootstrapPortfolioPromise;
}

export function usePortfolioData() {
  const initialState = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        portfolio: buildLocalPortfolio(),
        dataSourceStatus: "local"
      };
    }

    const cachedSnapshot = readCachedPortfolioSnapshot();
    return {
      portfolio: normalizePortfolioSnapshot(cachedSnapshot),
      dataSourceStatus: cachedSnapshot ? "cached" : "local"
    };
  }, []);

  const [portfolio, setPortfolio] = useState(() => {
    return initialState.portfolio;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dataSourceStatus, setDataSourceStatus] = useState(initialState.dataSourceStatus);
  const isMountedRef = useRef(true);

  async function loadPortfolio(skipCache = false) {
    if (!isMountedRef.current) {
      return;
    }
    setIsLoading(true);

    try {
      const nextState = skipCache ? await resolvePortfolioState() : await getBootstrapPortfolioState();
      if (!isMountedRef.current) {
        return;
      }
      setPortfolio(nextState.portfolio);
      setDataSourceStatus(nextState.dataSourceStatus);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true;
    loadPortfolio();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const displayPortfolio = useMemo(() => normalizePortfolioSnapshot(portfolio), [portfolio]);

  return {
    displayPortfolio,
    isLoading,
    loadPortfolio,
    dataSourceStatus
  };
}
