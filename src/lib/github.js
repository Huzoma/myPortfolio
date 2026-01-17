// lib/github.js

// 1. YOUR USERNAME
const GITHUB_USERNAME = 'Huzoma'; 

export async function fetchGitHubProjects() {
  try {
    // 2. FETCH THE DATA
    // We sort by 'updated' so your latest work shows first
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    
    if (!response.ok) throw new Error('Failed to fetch projects');
    
    const repos = await response.json();

    // 3. FILTER
    // We remove forks (projects you copied) and empty projects
    const portfolioRepos = repos.filter(repo => !repo.fork && repo.description);

    // 4. THE MAPPER (The Translation Layer)
    // This turns GitHub data into the format your App expects
    const mappedProjects = portfolioRepos.map((repo, index) => {
      return {
        id: repo.id,
        // Replace hyphens with spaces (e.g., "football-bot" -> "football bot")
        title: repo.name.replace(/-/g, ' '), 
        
        // Use the main language as category, or default to "Development"
        category: repo.language || "Development", 
        
        // Auto-generate Figure numbers starting from 2.0
        figure: `FIG ${index + 2}.0`, 
        
        year: new Date(repo.created_at).getFullYear().toString(),
        
        // IMPORTANT: Image Logic
        // We assume you saved images in public/images matching the repo name
        imageCard: `/images/${repo.name}-card.jpg`, 
        imageDetail: `/images/${repo.name}-detail.jpg`,
        
        // If you added topics in GitHub, use them. Otherwise default to 'Code'
        tags: repo.topics.length > 0 ? repo.topics : ["Code"],
        
        description: repo.description, 
        
        // Mapping links
        links: {
          github: repo.html_url,
          live: repo.homepage || repo.html_url // uses the Website field from GitHub
        },

        // FALLBACK TEXT
        // GitHub doesn't have these specific fields, so we use generic text
        // to prevent your details page from crashing.
        details: {
          role: "Lead Developer",
          challenge: "See the GitHub repository README for a detailed breakdown of technical challenges.",
          solution: "Implemented efficient logic and modern architecture to solve the core problem."
        }
      };
    });

    return mappedProjects;

  } catch (error) {
    console.error("Error loading GitHub projects:", error);
    return [];
  }
}