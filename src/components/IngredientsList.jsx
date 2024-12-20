function IngredientsList(props) {
  // mapping through each ingredinet.
  // giving each ingredient a list item along with adding the actual ingredient so it is then returned below in the un ordered list.
  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  // if the ingredients length is greater than 3 the ready for a recipe section is displayed to the user.
  // using props to get the ingredients length and toggling the recipe.
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.toggleRecipeShown}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}

export default IngredientsList;
