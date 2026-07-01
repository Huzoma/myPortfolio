// src/app/api/chat/route.js

import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';
import { fetchGitHubProjects } from '@/lib/github';
import { profileMarkdown } from '@/lib/profile';

export async function POST(req) {
  try {
    const { history, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message parameter is required.' }, { status: 400 });
    }

    // 2. Fetch current projects
    let currentProjects = [];
    try {
      currentProjects = await fetchGitHubProjects();
    } catch (projectsErr) {
      console.error('Failed to fetch projects, using empty fallback:', projectsErr);
    }

    // 3. Call Gemini Chat
    const reply = await generateChatResponse(history || [], message, profileMarkdown, currentProjects);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return NextResponse.json({ 
      error: 'Failed to process chat response', 
      details: error.message 
    }, { status: 500 });
  }
}
