export async function getTrendingRepos(page = 1) {
    const url = `https://api.github.com/search/repositories?q=created:>2024-07-15&sort=stars&order=desc&page=${page}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('GitHub API error');
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }
  