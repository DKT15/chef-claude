import Anthropic from "@anthropic-ai/sdk";

const AnthropicAPI =
  "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";

//When interacting with AI, it needs to be given a sysytem prompt.
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

// Passing the api key and becuase it is being passed froma browser dangerouslyAllowBrowser is set to true.
const anthropic = new Anthropic({
  apiKey: AnthropicAPI,
  dangerouslyAllowBrowser: true,
});

// inside the fuction, it takes the ingredients array and makes a call to the anthropic api.
export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  const msg = await anthropic.messages.create({
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
  return msg.content[0].text;
}
