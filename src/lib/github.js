// lib/github.js

// 1. CONFIGURATION
const GITHUB_USERNAME = 'Huzoma'; 
// Add your organizations here. Leave it empty [] if you don't have any yet.
const GITHUB_ORGS = ['Beyound-Conversation']; 

export async function fetchGitHubProjects() {
  try {
    // 2. FETCH PERSONAL REPOS
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    if (!userRes.ok) throw new Error('Failed to fetch personal projects');
    const userRepos = await userRes.json();

    // 3. FETCH ORGANIZATION REPOS (Simultaneously)
    // This sweeps through all orgs in your array at the same time
    const orgPromises = GITHUB_ORGS.map(org => 
      fetch(`https://api.github.com/orgs/${org}/repos?sort=updated&direction=desc`)
        .then(res => res.ok ? res.json() : [])
    );
    const orgResults = await Promise.all(orgPromises);
    const allOrgRepos = orgResults.flat(); // Combines all org arrays into one big list

    // 4. DEDUPLICATION (Personal overrides Org)
    // Create a fast-lookup list of your personal repo names
    const personalRepoNames = new Set(userRepos.map(repo => repo.name.toLowerCase()));
    
    // Only keep org repos that DO NOT match a personal repo name
    const uniqueOrgRepos = allOrgRepos.filter(repo => !personalRepoNames.has(repo.name.toLowerCase()));

    // 5. COMBINE AND FILTER
    // Merge them: Personal first, unique Org repos second
    const allRepos = [...userRepos, ...uniqueOrgRepos];
    
    // Remove forks and empty projects
    const portfolioRepos = allRepos.filter(repo => !repo.fork && repo.description);

    // 6. THE MAPPER (Your exact UI translation layer)
    const mappedProjects = portfolioRepos.map((repo, index) => {
      return {
        id: repo.id,
        // Replace hyphens with spaces
        title: repo.name.replace(/-/g, ' '), 
        
        // Use the main language as category, or default to "Development"
        category: repo.language || "Development", 
        
        // Auto-generate Figure numbers starting from 2.0
        figure: `FIG ${index + 2}.0`, 
        
        year: new Date(repo.created_at).getFullYear().toString(),
        
        // IMPORTANT: Image Logic
        // I added .toLowerCase() here to protect you from the Vercel case-sensitivity bug!
        imageCard: `/images/${repo.name.toLowerCase()}-card.jpg`, 
        imageDetail: `/images/${repo.name.toLowerCase()}-detail.jpg`,
        
        // If you added topics in GitHub, use them. Otherwise default to 'Code'
        tags: repo.topics && repo.topics.length > 0 ? repo.topics : ["Code"],
        
        description: repo.description, 
        
        // Mapping links
        links: {
          github: repo.html_url,
          live: repo.homepage || repo.html_url 
        },

        // FALLBACK TEXT
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