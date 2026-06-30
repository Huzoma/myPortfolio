// src/app/api/agent/generate/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { generateCaseStudy } from '@/lib/gemini';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'src/lib/portfolioDB.json');
    let currentDB = {};
    if (fs.existsSync(dbPath)) {
      currentDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
    return NextResponse.json(currentDB);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { repoName } = await req.json();

    if (!repoName) {
      return NextResponse.json({ error: 'repoName is required.' }, { status: 400 });
    }

    const owner = 'Huzoma';
    const repoNameLower = repoName.toLowerCase();
    
    // Set headers for GitHub API requests (support GITHUB_TOKEN if available)
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Huzoma-Portfolio-Agent'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // 1. Fetch Repository General Info (for description)
    let repoDescription = '';
    try {
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, { headers });
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        repoDescription = repoData.description || '';
      }
    } catch (err) {
      console.warn(`Failed to fetch repo info for ${repoName}:`, err);
    }

    // 2. Fetch README content
    let readmeText = '';
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/readme`, { headers });
      if (readmeRes.ok) {
        const readmeData = await readmeRes.json();
        if (readmeData.content && readmeData.encoding === 'base64') {
          readmeText = Buffer.from(readmeData.content, 'base64').toString('utf8');
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch README for ${repoName}:`, err);
    }

    // 3. Call Gemini to generate the case study narrative + tags + status
    const generatedCaseStudy = await generateCaseStudy(repoName, repoDescription, readmeText);

    // 4. Read current portfolioDB.json
    const dbPath = path.join(process.cwd(), 'src/lib/portfolioDB.json');
    let currentDB = {};
    
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, 'utf8');
        currentDB = JSON.parse(fileContent);
      } catch (parseErr) {
        console.error('Failed to parse portfolioDB.json, initializing empty:', parseErr);
      }
    }

    // 5. Merge new project details, keeping manual overrides if present
    const existingProject = currentDB[repoNameLower] || {};
    
    currentDB[repoNameLower] = {
      role: existingProject.role || generatedCaseStudy.role,
      challenge: existingProject.challenge || generatedCaseStudy.challenge,
      solution: existingProject.solution || generatedCaseStudy.solution,
      description: existingProject.description || generatedCaseStudy.description,
      tags: existingProject.tags || generatedCaseStudy.tags,
      status: existingProject.status || generatedCaseStudy.status || "Completed"
    };

    // 6. Write back to portfolioDB.json
    fs.writeFileSync(dbPath, JSON.stringify(currentDB, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      project: currentDB[repoNameLower] 
    });

  } catch (error) {
    console.error('Narrative generation endpoint error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate project narrative', 
      details: error.message 
    }, { status: 500 });
  }
}
