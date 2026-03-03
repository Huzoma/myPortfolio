// lib/github.js

// 1. CONFIGURATION
const GITHUB_USERNAME = 'Huzoma'; 
// Adding your organization precisely as it appears in the URL
const GITHUB_ORGS = ['Beyound-Conversation']; 

export async function fetchGitHubProjects() {
  try {
    // 2. FETCH PERSONAL REPOS
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    if (!userRes.ok) throw new Error('Failed to fetch personal projects');
    const userRepos = await userRes.json();

    // 3. FETCH ORGANIZATION REPOS (Simultaneously)
    const orgPromises = GITHUB_ORGS.map(org => 
      fetch(`https://api.github.com/orgs/${org}/repos?sort=updated&direction=desc`)
        .then(res => res.ok ? res.json() : [])
    );
    const orgResults = await Promise.all(orgPromises);
    const allOrgRepos = orgResults.flat(); 

    // 4. DEDUPLICATION (Personal overrides Org)
    const personalRepoNames = new Set(userRepos.map(repo => repo.name.toLowerCase()));
    const uniqueOrgRepos = allOrgRepos.filter(repo => !personalRepoNames.has(repo.name.toLowerCase()));

    // 5. COMBINE AND FILTER
    const allRepos = [...userRepos, ...uniqueOrgRepos];
    const portfolioRepos = allRepos.filter(repo => !repo.fork && repo.description);

    // 6. THE MAPPER (Translation to UI)
    const mappedProjects = portfolioRepos.map((repo, index) => {
      
      // --- NEW STATUS LOGIC ---
      const topics = repo.topics || [];
      const isWIP = topics.includes('wip') || topics.includes('in-progress');
      const projectStatus = isWIP ? 'In Development' : 'Completed';
      
      // Filter out the status tags so they don't show up as normal blue badges
      const cleanTags = topics.filter(t => t !== 'wip' && t !== 'in-progress');

      return {
        id: repo.id,
        title: repo.name.replace(/-/g, ' '), 
        category: repo.language || "Development", 
        figure: `FIG ${index + 2}.0`, 
        year: new Date(repo.created_at).getFullYear().toString(),
        // toLowerCase() prevents Vercel 404 image errors
        imageCard: `/images/${repo.name.toLowerCase()}-card.jpg`, 
        imageDetail: `/images/${repo.name.toLowerCase()}-detail.jpg`,
        
        tags: cleanTags.length > 0 ? cleanTags.slice(0, 3) : ["Code"],
        description: repo.description, 
        
        // EXPORT THE STATUS TO YOUR UI
        status: projectStatus, 
        
        links: {
          github: repo.html_url,
          live: repo.homepage || repo.html_url 
        },
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