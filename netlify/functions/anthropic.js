// anthropic.js (serverless function)
import Anthropic from "@anthropic-ai/sdk";

export async function handler(event) {
  try {
    // Parse the POST body from React
    const { ingredients } = JSON.parse(event.body);

    if (!ingredients || !Array.isArray(ingredients)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Ingredients array is required" }),
      };
    }

    // Your system prompt
    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

    // Read the API key from environment variables
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Join ingredients into a string
    const ingredientsString = ingredients.join(", ");

    // Call the Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ content: response }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
