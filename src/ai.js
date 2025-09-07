// This is the frontend helper function

// function accepts the array of ingredients.
export async function getRecipeFromChefClaude(ingredientsArr) {
  // Sends HTTP request to the netlify function and await waits until it gets a response.
  // Post request is used as data (ingredients array) is being sent to the request body.
  // The netlify function takes the ingredients and makes a real API request to Anthropic with the hidden key.
  // header tells server the body is JSON so it parses it correctly.
  // In the body, data is converted to JSON formatted string, by wrapping with object and giving it a key value pair.
  const res = await fetch("/.netlify/functions/anthropic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });

  // the response from JSON is now in msg.
  const msg = await res.json();

  // If the resonse is not okay then an error will be thrown.
  if (!res.ok) {
    console.error(msg);
    throw new Error(msg.error || "Failed to get recipe from Claude");
  }

  // Using optional chaining. Only looking for content if message exists
  // Only looing for text if the first item exists
  // If everything exists then the recipe will be displayed otherwise the default is an empty string.
  return msg.content?.[0]?.text || console.log("nothing"); //issue is here
}
