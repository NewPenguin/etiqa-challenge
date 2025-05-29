import React from 'react';
import { useTrendingRepos } from './hooks/useTrendingRepos';

function App() {
  const { repos, loading, hasMore, observerRef } = useTrendingRepos();

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>🔥 Trending GitHub Repositories</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {repos.map(repo => (
          <li
            key={repo.id}
            style={{
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #ccc'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                width="48"
                height="48"
                style={{ borderRadius: '50%', marginRight: '1rem' }}
              />
              <div>
                <strong>{repo.full_name}</strong>
                <p style={{ margin: 0 }}>👤 {repo.owner.login}</p>
              </div>
            </div>
            <p>{repo.description}</p>
            <p>⭐ {repo.stargazers_count}</p>
          </li>
        ))}
      </ul>
      <div ref={observerRef} style={{ height: '80px', textAlign: 'center' }}>
        {loading ? 'Loading more...' : hasMore ? 'Scroll to load more' : 'No more results'}
      </div>
    </div>
  );
}

export default App;
