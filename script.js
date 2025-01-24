document.getElementById('recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Gather input values
    const allergies = document.getElementById('allergies').value;
    const mood = document.getElementById('mood').value;
    const leftovers = document.getElementById('leftovers').value;

    const recipesDiv = document.getElementById('recipes');
    const recipeOutput = document.getElementById('recipe-output');
    recipeOutput.classList.remove('hidden');
    recipesDiv.textContent = 'Loading...';

    try {
        // Replace with your actual API URL
        const apiURL = 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;

        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                allergies: allergies.split(',').map(a => a.trim()),
                mood,
                leftovers: leftovers.split(',').map(l => l.trim()),
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if recipes are available
        if (!data.recipes || data.recipes.length === 0) {
            recipesDiv.textContent = 'No recipes found for your input.';
            return;
        }

        // Display a random recipe
        const randomRecipe = data.recipes[Math.floor(Math.random() * data.recipes.length)];

        // Render the recipe details
        recipesDiv.innerHTML = `
            <h3>${randomRecipe.title || 'Untitled Recipe'}</h3>
            <h4>Ingredients:</h4>
            <ul>
                ${randomRecipe.ingredients ? randomRecipe.ingredients.map(i => `<li>${i}</li>`).join('') : '<li>No ingredients listed.</li>'}
            </ul>
            <h4>Steps:</h4>
            <ol>
                ${randomRecipe.steps ? randomRecipe.steps.map(s => `<li>${s}</li>`).join('') : '<li>No steps provided.</li>'}
            </ol>
        `;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesDiv.textContent = 'An error occurred while fetching recipes. Please try again.';
    }
});
