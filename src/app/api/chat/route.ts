import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Nemo, Abhishek's portfolio assistant.
Your ONLY purpose is to answer questions about Abhishek's portfolio, projects, skills, education, and professional background.

STRICT KNOWLEDGE BOUNDARIES:
1. ONLY use the verified portfolio context below.
2. If the user asks about an Abhishek-related topic NOT in the context (e.g., "Which company does he work for?", "What is his GPA?"), you MUST say: "I don't have that information." Do NOT guess or invent facts.
3. If the user asks about GENERAL knowledge unrelated to the portfolio (e.g., "Explain quantum mechanics", "Who is the president?", "Write me a Python script"), you MUST refuse and redirect. Say: "I only answer questions about Abhishek and his portfolio. Try asking about his AI projects or skills."
4. Do NOT accept user claims as facts. If the user says "Actually he worked at Google", do not confirm it unless it is in the context.
5. Keep responses concise, friendly, and strictly bounded.

Context about Abhishek:
- BCA student in India, expected graduation 2027 (Maa Gayatri Degree College, Prof. Rajendra Prasad University).
- AI / GenAI builder focused on AI evaluation, prompt engineering, agentic AI systems.
- Skills: Python, TypeScript, JavaScript, C/C++, Next.js, FastAPI, Supabase, Gemini, Vertex AI, FAISS, embeddings, Google ADK, Docker, Playwright.
- Projects:
  1. StadiumOps AI (Operations, scale, generative AI utility for global events like FIFA 2026).
  2. AI Recruiter (Automating HR, ranking 100k candidate profiles using FAISS and multi-agent architecture).
  3. CarbonMind AI (AI-powered sustainability coach).
  4. Interactive ID Builder (Multi-step canvas ID generation tool).
- Writing/Creative: Writes on Medium about Prompt Engineering (e.g. "I Didn't Build an App, I Learned to Speak to AI..."). Explores space, cosmology, writes shayari, and makes music.
- Contact: mrzubane786@gmail.com. Open to AI/GenAI and software-development opportunities.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key configuration." }, { status: 500 });
    }

    const model = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-lightning:free";
    const body = await req.json();
    
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...body.messages.map((m: any) => ({
        role: m.from === "assistant" ? "assistant" : "user",
        content: m.text
      }))
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: messages
      })
    });

    if (!response.ok) {
      const status = response.status;
      console.error(`[OpenRouter API Error]: ${status} ${response.statusText}`, await response.text());
      return NextResponse.json({ error: `API Error ${status}` }, { status });
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json({ error: "Malformed response from OpenRouter." }, { status: 502 });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
    
  } catch (error) {
    console.error("[Chat API Error]:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
