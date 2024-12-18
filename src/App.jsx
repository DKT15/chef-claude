import React from "react";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  // useState for getRecipe
  const [recipeShown, setRecipeShown] = React.useState(false);

  // Flipping the value of of the recipe from false to true and back from true to fales when clicked again.
  function toggleRecipeShown() {
    setRecipeShown((prevShown) => !prevShown);
  }

  // mapping through each ingredinet.
  // giving each ingredient a list item along with adding the actual ingredient so it is then returned below in the un ordered list.
  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  // action allows me to bring in the formData as a paremeter without having to use event.
  // newIngredient is set to equal the ingredient from the form.
  // setIngredients then adds to newIngredient onto to prevIngrdients in an array.
  function makeRecipe(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  // form action is set to the makeRecipe function above.
  // the ingredients on hand only get displayed when the ingredients length is greater than (0) i.e. the user has added a 0. If empty nothing will be displayed (null).
  // if the ingredients length is greater than 3 the ready for a recipe section is displayed to the user.
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
      {ingredients.length > 0 ? (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>
          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={toggleRecipeShown}>Get a recipe</button>
            </div>
          )}
        </section>
      ) : null}
      {recipeShown && <section></section>}
    </main>
  );
}

export default App;
