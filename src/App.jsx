import React from "react";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

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
      <ul>{ingredientsListItems}</ul>
    </main>
  );
}

export default App;
