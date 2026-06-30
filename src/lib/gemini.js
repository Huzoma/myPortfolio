// src/lib/gemini.js

let GoogleGenAI;
try {
  GoogleGenAI = require('@google/generative-ai');
} catch (e) {
  // Fallback to fetch if package is not installed/loaded yet
}

const MODEL_NAME = 'gemini-2.5-flash';

async function fetchGeminiDirect(prompt, systemInstruction = '') {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      generationConfig: {
        responseMimeType: prompt.toLowerCase().includes('json') ? 'application/json' : 'text/plain',
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) {
    throw new Error('Empty response from Gemini API');
  }
  return textResponse;
}

export async function generateContent({ prompt, systemInstruction = '', jsonMode = false }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }

  // 1. Try using the SDK if available
  if (GoogleGenAI && GoogleGenAI.GoogleGenAI) {
    try {
      const genAI = new GoogleGenAI.GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: systemInstruction || undefined,
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: jsonMode ? 'application/json' : 'text/plain',
        }
      });

      return result.response.text();
    } catch (sdkError) {
      console.warn('SDK generation failed, falling back to direct fetch:', sdkError);
    }
  }

  // 2. Fallback to direct fetch
  return fetchGeminiDirect(prompt, systemInstruction);
}

/**
 * Handles chatbot logic with custom system instruction context.
 */
export async function generateChatResponse(history, latestMessage, profileMarkdown, currentProjects) {
  const systemInstruction = `
You are the personal AI Agent representing Uzoma, a Lead Frontend Engineer & Full Stack Developer, on his portfolio website.
Your purpose is to answer recruiter queries, highlight his skills, projects, and work experience, and encourage scheduling a meeting.

Here is Uzoma's profile information:
---
${profileMarkdown}
---

Here is a list of Uzoma's current portfolio projects:
---
${JSON.stringify(currentProjects, null, 2)}
---

Guidelines for your tone and interaction:
1. Speak in first person as Uzoma's AI Agent representation (e.g., "Uzoma built...", "He has experience in...", "I can tell you about Uzoma's role...").
2. Be professional, direct, and slightly technical but highly accessible.
3. If asked about booking a call or interview, recommend scheduling via the link: "https://docs.google.com/document/d/1eMO6fuHhQyfydQatEytBUDze3mh7RD4dovcYuBkvl3c/export?format=pdf" or recommend checking the Contact section.
4. Do NOT make up any projects, experience, or certifications not listed in the profile or project list. If you don't know the answer, say so and offer to let them leave a message.
5. Keep your responses concise (under 3-4 paragraphs) to fit comfortably in a chat widget.
`;

  // Format history for Gemini API
  const apiHistory = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  // Add latest message
  apiHistory.push({ role: 'user', parts: [{ text: latestMessage }] });

  // Use fetch to generate content with chat context
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: apiHistory,
      systemInstruction: { parts: [{ text: systemInstruction }] }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${errorText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again.";
}

/**
 * Summarizes repository readme and description into case study entries.
 */
export async function generateCaseStudy(repoName, repoDescription, readmeContent) {
  const systemInstruction = `
You are an expert technical writer and software engineering case-study builder.
Your task is to analyze a GitHub repository and generate a structured JSON object representing a portfolio project narrative.

You MUST return a JSON object with this exact structure:
{
  "role": "Suggested job title for Uzoma (e.g. Lead Frontend Engineer, Full Stack Developer)",
  "challenge": "One sentence describing the key technical or business challenge in this project.",
  "solution": "One sentence describing the technical implementation and engineering solution.",
  "description": "A high-impact, professional 2-sentence summary of what the project does.",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"], // Top 3-4 technologies used (e.g., React, Next.js, Stripe, etc.)
  "status": "Completed" // Suggested status: Completed, Good, In Progress, or Incomplete
}
`;

  const prompt = `
Analyze this repository:
Repository Name: ${repoName}
GitHub Description: ${repoDescription}
README Content:
---
${readmeContent || 'No README content provided.'}
---

Generate the JSON case study. Do not wrap the JSON in markdown code blocks (\`\`\`json). Return ONLY the raw JSON string.
`;

  const resultText = await generateContent({ prompt, systemInstruction, jsonMode: true });
  
  // Clean potential markdown blocks
  const cleanJson = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * Drafts a LinkedIn post based on project details and style guide.
 */
export async function generateLinkedInPost(projectDetails, customContext, styleProfile) {
  const systemInstruction = `
You are Uzoma's AI Agent and brand representative.
Your task is to write a highly engaging LinkedIn post sharing a recent coding update or milestone.
You must adopt Uzoma's personal writing style:
- Tone: ${styleProfile.styleGuide.tone}
- Hooks: ${styleProfile.styleGuide.formatting.hookStyle}
- Emojis: ${styleProfile.styleGuide.formatting.emojis}
- Hashtags: ${styleProfile.styleGuide.formatting.hashtags}
- Structure: ${styleProfile.styleGuide.formatting.structure}

Here are reference examples of Uzoma's writing style:
---
${styleProfile.examples.join('\n\n---\n\n')}
---
`;

  const prompt = `
Generate a LinkedIn post about this project update:
Project Name: ${projectDetails.title}
Role: ${projectDetails.role}
Challenge solved: ${projectDetails.challenge}
Solution implemented: ${projectDetails.solution}
Custom Context/Extra Milestone Info: ${customContext || 'No extra context.'}

Draft the post following the style guidelines. Return ONLY the drafted post text.
`;

  return generateContent({ prompt, systemInstruction });
}
