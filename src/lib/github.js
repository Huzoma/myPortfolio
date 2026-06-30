// lib/github.js

// 1. CONFIGURATION
const GITHUB_USERNAME = 'Huzoma'; 
const GITHUB_ORGS = ['Beyound-Conversation']; 

// Import local database
import localDB from './portfolioDB.json';

// 2. RICH CONTENT DICTIONARY (Deprecated in favor of portfolioDB.json, kept as ultimate fallback)
const projectNarratives = {
  'myportfolio': {
    role: "Lead Frontend Engineer",
    challenge: "Overcoming strict Linux case-sensitivity on Vercel for dynamic image rendering and managing complex Flexbox stacking contexts across diverse mobile viewport widths.",
    solution: "Engineered a strict lowercase asset pipeline via Git MV commands and implemented responsive utility constraints to guarantee fluid layout scaling without horizontal overflow."
  },
  'beyond-conversation-pitch': {
    role: "Full Stack Developer",
    challenge: "Integrating secure payment gateways and optimizing React state for seamless ticket purchasing and media streaming without frame drops.",
    solution: "Utilized Next.js server-side rendering for secure Stripe and Paystack API calls, optimizing React components to ensure high-performance media delivery."
  },
  'beacon': {
    role: "Lead Developer",
    challenge: "Aggregating diverse job posting formats into a unified, reliable data structure while maintaining high frontend performance.",
    solution: "Developed a robust Next.js data pipeline coupled with a minimalist Tailwind CSS interface to prioritize fast, accessible job discovery and automated application workflows."
  },
  'tutor-pulse-demo': {
    role: "Frontend Engineer",
    challenge: "Designing an intuitive, cross-platform matching engine that pairs home-lesson tutoring jobs with qualified candidates dynamically.",
    solution: "Built a responsive, state-driven React application utilizing modern component architecture to streamline the discovery and application process."
  },
  'uskillng': {
    role: "Frontend Developer",
    challenge: "Structuring a scalable e-learning ecosystem capable of handling varied course content and user progression tracking.",
    solution: "Implemented a cohesive design system using Tailwind CSS within a Next.js framework to deliver a frictionless educational user experience."
  },
  'synergy-hotels-suites-shs': {
    role: "Lead Full Stack Developer",
    challenge: "Building a secure hotel booking engine and live room inventory control system that handles both online payments and manual front-desk inputs without scheduling conflicts.",
    solution: "Developed a dynamic scheduling conflict checking algorithm and integrated local storage caching with a staff dashboard interface, preparing the portal for database-backed webhooks."
  }
};

export async function fetchGitHubProjects() {
  try {
    // 3. FETCH PERSONAL REPOS
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    if (!userRes.ok) throw new Error('Failed to fetch personal projects');
    const userRepos = await userRes.json();

    // 4. FETCH ORGANIZATION REPOS (Simultaneously)
    const orgPromises = GITHUB_ORGS.map(org => 
      fetch(`https://api.github.com/orgs/${org}/repos?sort=updated&direction=desc`)
        .then(res => res.ok ? res.json() : [])
    );
    const orgResults = await Promise.all(orgPromises);
    const allOrgRepos = orgResults.flat(); 

    // 5. DEDUPLICATION (Personal overrides Org)
    const personalRepoNames = new Set(userRepos.map(repo => repo.name.toLowerCase()));
    const uniqueOrgRepos = allOrgRepos.filter(repo => !personalRepoNames.has(repo.name.toLowerCase()));

    // 6. COMBINE AND FILTER
    const allRepos = [...userRepos, ...uniqueOrgRepos];
    const portfolioRepos = allRepos.filter(repo => !repo.fork && (repo.description || localDB[repo.name.toLowerCase()]?.description));

    // 7. THE MAPPER (Translation to UI)
    const mappedProjectsPromises = portfolioRepos.map(async (repo, index) => {
      
      const repoNameLower = repo.name.toLowerCase();
      const topics = repo.topics || [];
      
      // Load details from localDB (AI-Generated DB)
      const dbEntry = localDB[repoNameLower] || {};

      // Calculate status:
      // Priority 1: Status defined in portfolioDB.json
      // Priority 2: Topics/tags from GitHub
      // Priority 3: Fallback default
      let projectStatus = dbEntry.status;
      if (!projectStatus) {
        const isWIP = topics.includes('wip') || topics.includes('in-progress') || topics.includes('incomplete');
        const isGood = topics.includes('good') || topics.includes('featured');
        if (isGood) {
          projectStatus = 'Good';
        } else if (isWIP) {
          projectStatus = 'In Progress';
        } else {
          projectStatus = 'Completed';
        }
      }

      // Prioritize manual description and tags from GitHub (if they exist)
      // Otherwise fallback to AI generated ones from portfolioDB.json
      const description = repo.description || dbEntry.description || "No description provided.";
      
      const cleanTopics = topics.filter(t => !['wip', 'in-progress', 'incomplete', 'good', 'featured', 'done'].includes(t));
      const tags = cleanTopics.length > 0 ? cleanTopics.slice(0, 3) : (dbEntry.tags || [repo.language || "Code"]);

      // Attempt to fetch remote portfolio.json from the default branch of the repository
      let remoteNarrative = {};
      const owner = repo.owner?.login;
      const branch = repo.default_branch || 'main';
      const url = `https://raw.githubusercontent.com/${owner}/${repo.name}/${branch}/portfolio.json`;

      try {
        const res = await fetch(url);
        if (res.ok) {
          remoteNarrative = await res.json();
        }
      } catch (err) {
        // Fail silently; fallback will be used
      }

      // Retrieve the specific narrative with priorities: remote file -> database entry -> hardcoded fallback
      const narrative = {
        ...projectNarratives[repoNameLower],
        ...dbEntry,
        ...remoteNarrative
      };

      return {
        id: repo.id,
        title: repo.name.replace(/-/g, ' '), 
        category: repo.language || "Development", 
        figure: `FIG ${index + 2}.0`, 
        year: new Date(repo.created_at).getFullYear().toString(),
        imageCard: `/images/${repoNameLower}-card.jpg`, 
        imageDetail: `/images/${repoNameLower}-detail.jpg`,
        
        tags: tags,
        description: description, 
        status: projectStatus, 
        
        links: {
          github: repo.html_url,
          live: repo.homepage || repo.html_url 
        },
        
        details: {
          role: narrative.role || "Lead Developer",
          challenge: narrative.challenge || "See the GitHub repository README for a detailed breakdown of technical challenges.",
          solution: narrative.solution || "Implemented efficient logic and modern architecture to solve the core problem."
        }
      };
    });

    const mappedProjects = await Promise.all(mappedProjectsPromises);
    return mappedProjects;

  } catch (error) {
    console.error("Error loading GitHub projects:", error);
    return [];
  }
}