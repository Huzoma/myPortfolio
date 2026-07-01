// src/app/api/agent/update-status/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { repoName, status } = await req.json();

    if (!repoName || !status) {
      return NextResponse.json({ error: 'repoName and status are required.' }, { status: 400 });
    }

    const repoNameLower = repoName.toLowerCase();
    const dbPath = path.join(process.cwd(), 'src/lib/portfolioDB.json');
    let currentDB = {};

    if (fs.existsSync(dbPath)) {
      try {
        currentDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      } catch (parseErr) {
        console.error('Failed to parse portfolioDB.json:', parseErr);
      }
    }

    // Update status, initialize other fields if empty
    if (!currentDB[repoNameLower]) {
      currentDB[repoNameLower] = {
        role: "Lead Developer",
        challenge: "No challenge defined yet.",
        solution: "No solution defined yet.",
        description: "No description defined yet.",
        tags: ["Code"],
        status: status
      };
    } else {
      currentDB[repoNameLower].status = status;
    }

    try {
      fs.writeFileSync(dbPath, JSON.stringify(currentDB, null, 2), 'utf8');
    } catch (writeErr) {
      console.error('Failed to write project status (likely Vercel read-only):', writeErr);
      return NextResponse.json({ 
        error: 'Database writes are disabled in Vercel production. Please run the Admin Dashboard locally on your computer (npm run dev) to save status updates, then commit and push to GitHub.', 
        details: writeErr.message 
      }, { status: 403 });
    }

    return NextResponse.json({ success: true, project: currentDB[repoNameLower] });

  } catch (error) {
    console.error('Update status endpoint error:', error);
    return NextResponse.json({ 
      error: 'Failed to update project status', 
      details: error.message 
    }, { status: 500 });
  }
}
