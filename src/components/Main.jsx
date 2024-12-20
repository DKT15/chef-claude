import React from "react";
import IngredientsList from "./IngredientsList";

function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  // useState for getRecipe
  const [recipeShown, setRecipeShown] = React.useState(false);

  // Flipping the value of of the recipe from false to true and back from true to fales when clicked again.
  function toggleRecipeShown() {
    setRecipeShown((prevShown) => !prevShown);
  }

  // action allows me to bring in the formData as a paremeter without having to use event.
  // newIngredient is set to equal the ingredient from the form.
  // setIngredients then adds to newIngredient onto to prevIngrdients in an array.
  function makeRecipe(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  // form action is set to the makeRecipe function above.
  // the ingredientsList only gets displayed when the ingredients length is greater than (0) i.e. the user has added a 0. If empty nothing will be displayed nothing.
  // passing the ingredients and toggleRecipeShown down as props to the ingredientList.
  // Adding the Recipe component in and it will only be displayed if RecipeShow is true.
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
      {ingredients.length > 0 && <IngredientsList
      ingredients={ingredients}
      toggleRecipeShown={toggleRecipeShown}/>}
      {recipeShown && <Recipe />}
    </main>
  );
}

export default Main;
