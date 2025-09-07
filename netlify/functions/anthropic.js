// This is the code for the serverless function.

import Anthropic from "@anthropic-ai/sdk";

// Netlify expects the export function name to be handler.
export async function handler(event) {
  try {
    // ingredients equals the data from the body. The data is being converted into a js objeect.
    // Destructuring the ingredients
    // Expecting an array from the body.
    const { ingredients } = JSON.parse(event.body);

    //If there isn't any ingredients or an array of ingredients then an error will be returned.
    if (!ingredients || !Array.isArray(ingredients)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Ingredients array is required" }),
      };
    }

    // When interacting with AI, it needs to be given a system prompt.
    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

    // Read the API key from environment variables
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Join ingredients into a string, taking them out of an array format for the user to see clearly.
    const ingredientsString = ingredients.join(", ");

    // Calling the Anthropic API and getting anthropics reponse with the await below.
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
      body: JSON.stringify({ content: response.content[0].text }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
