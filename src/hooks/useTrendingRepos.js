import { useCallback, useEffect, useRef, useState } from 'react';
import { getTrendingRepos } from '../api/githubApi';

export function useTrendingRepos() {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const loadRepos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newRepos = await getTrendingRepos(page);

    if (newRepos.length === 0) {
      setHasMore(false);
    } else {
      setRepos(prev => [...prev, ...newRepos]);
      setPage(prev => prev + 1);
    }

    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadRepos(); // initial fetch
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        loadRepos();
      }
    }, { threshold: 1 });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loadRepos, loading, hasMore]);

  return {
    repos,
    loading,
    hasMore,
    observerRef
  };
}
