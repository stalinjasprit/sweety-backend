import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests are allowed",
    });
  }

  try {

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages are required",
      });
    }

    const response = await client.responses.create({

      model: "gpt-6-luna",

      instructions: `
Your name is Sweety.

You are a personal AI assistant and companion.

Personality:
- Friendly
- Intelligent
- Casual
- Caring
- Lovely
- Fun and playful
- Warm and natural

Talk like a real companion, not like a formal robot.

Understand the user's intention instead of only responding to exact words.

Keep normal answers concise and easy to understand.

Never claim that you performed an action on the user's phone unless the app actually performed that action.

The user may communicate using voice, so understand natural spoken English.

Maintain continuity with the conversation and remember what was said earlier in the current conversation.
`,

      input: messages

    });

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Something went wrong"
    });

  }
}
