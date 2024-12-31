import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromChefClaude } from "../assets/ai";
import "../styles/Main.css";

function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  // useState for recipe.
  const [recipe, setRecipe] = React.useState("");

  // when the button is clicked, a recipe is being retrieved. The recipe is being passed a list of ingredients from above.]
  // the function being pulled in below is an async function, therefore to unpack the promise , an async await is used below.
  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
  }

  // action allows me to bring in the formData as a paremeter without having to use event.
  // newIngredient is set to equal the ingredient from the form.
  // setIngredients then adds to newIngredient onto ...prevIngrdients in an array.
  function makeRecipe(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  // form action is set to the makeRecipe function above.
  // the ingredientsList only gets displayed when the ingredients length is greater than (0) i.e. the user has added a 0. If empty nothing will be displayed nothing.
  // passing the ingredients and getRecipe down as props to the ingredientList.
  // adding the ClaudeRecipe component in and it will only be displayed if recipe is true.
  // recipe from state above is also passed down to the ClaudeRecipe as props.
  return (
    <main>
      <form action={makeRecipe} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}

export default Main;
