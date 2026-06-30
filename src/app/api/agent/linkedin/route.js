// src/app/api/agent/linkedin/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { generateLinkedInPost } from '@/lib/gemini';

export async function POST(req) {
  try {
    const { projectDetails, customContext } = await req.json();

    if (!projectDetails || !projectDetails.title) {
      return NextResponse.json({ error: 'projectDetails with a title is required.' }, { status: 400 });
    }

    // 1. Read styleProfile.json
    const stylePath = path.join(process.cwd(), 'src/lib/styleProfile.json');
    let styleProfile = { styleGuide: {}, examples: [] };
    
    if (fs.existsSync(stylePath)) {
      try {
        const fileContent = fs.readFileSync(stylePath, 'utf8');
        styleProfile = JSON.parse(fileContent);
      } catch (parseErr) {
        console.error('Failed to parse styleProfile.json:', parseErr);
      }
    }

    // 2. Draft the LinkedIn post
    const postDraft = await generateLinkedInPost(projectDetails, customContext, styleProfile);

    return NextResponse.json({ success: true, postDraft });

  } catch (error) {
    console.error('LinkedIn generator endpoint error:', error);
    return NextResponse.json({ 
      error: 'Failed to draft LinkedIn post', 
      details: error.message 
    }, { status: 500 });
  }
}
