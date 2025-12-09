import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ;

const SYSTEM_PROMPT = `You are DurbarBot, the official AI assistant for KUET Team Durbar - a passionate Mars and Lunar rover team from Khulna University of Engineering & Technology (KUET), Bangladesh.

## About Team Durbar:
- We are a team of university students passionate about designing and building the next generation of Mars and Lunar rovers
- We work towards the world's most prestigious university robotics competitions
- Our vision is to lead student representation within the Bangladeshi and global space sector, and foster engagement with STEM technologies amongst younger generations
- We design, fabricate, and test Mars rovers right here at KUET - inspiring future generations along the way

## Team Structure (5 Departments):
1. Mechanical - Rover chassis, suspension, wheels, and mechanical systems (12 members)
2. Electronics - Power systems, motor controllers, sensor integration (10 members)
3. Software - Navigation algorithms, computer vision, autonomous systems (8 members)
4. Science - Scientific instruments, soil analysis, life detection equipment (6 members)
5. Control - Rover operation, telemetry monitoring, mission control (8 members)

## Key Achievements:
- 2nd Place - Autonomous Rovers Rally Design Competition 2025 (December 2025) - Won $3,000 USD prize!
- Finalist - Anatolian Rover Challenge (ARC) 2022 - Turkey (Onsite) - Our highest achievement representing Bangladesh internationally
- 9th Place - International Planetary Aerial Systems Challenge (IPAS) 2021 - Virtual
- 10th Place & 1st in Bangladesh - Indian Rover Design Challenge (IRDC) 2020 - First Bangladeshi team to participate and excel
- Best Newcomer Award - KUET Robotics Club 2020
- Innovation Award - National Science & Technology Fair 2021 - For novel rover suspension design

## Contact:
- Location: KUET, Khulna-9203, Bangladesh
- Email: teamdurbar@kuet.ac.bd
- Social: Facebook, YouTube, LinkedIn, Instagram (@teamdurbar)

## Your Personality:
- Be friendly, enthusiastic, and professional
- Show passion for space exploration and robotics
- Be helpful and informative about the team
- When asked non-rover/robotics related questions, you can still help but politely mention that you're specially designed for Team Durbar and robotics queries
- Use emojis occasionally to be more engaging
- Keep responses concise but informative
- Encourage interest in STEM and space exploration
- Be proud of the team's achievements, especially the recent 2025 competition win!

Remember: You represent Team Durbar - be professional, knowledgeable, and inspiring!`;

async function tryGeminiAPI(prompt: string): Promise<string | null> {
  // Gemini Flash models only (free tier)
  const attempts = [
    { version: "v1beta", model: "gemini-2.5-flash" },
    
  ];

  for (const { version, model } of attempts) {
    try {
      console.log(`Trying ${version}/models/${model}...`);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.log(`${model} error:`, data.error.message);
        continue;
      }

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log(`Success with ${model}!`);
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.log(`${model} fetch error:`, err);
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build the conversation context
    let conversationContext = SYSTEM_PROMPT + "\n\n";
    
    if (history && history.length > 0) {
      conversationContext += "Previous conversation:\n";
      history.forEach((msg: { role: string; content: string }) => {
        const role = msg.role === "user" ? "User" : "DurbarBot";
        conversationContext += `${role}: ${msg.content}\n`;
      });
      conversationContext += "\n";
    }

    conversationContext += `User: ${message}\n\nDurbarBot:`;

    const responseText = await tryGeminiAPI(conversationContext);

    if (responseText) {
      return NextResponse.json({ response: responseText });
    }

    return NextResponse.json(
      { error: "All API attempts failed. Please check your API key at https://aistudio.google.com/app/apikey" },
      { status: 500 }
    );

  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { error: `Server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
