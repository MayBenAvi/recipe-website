document.getElementById('recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const allergies = document.getElementById('allergies').value;
    const mood = document.getElementById('mood').value;
    const leftovers = document.getElementById('leftovers').value;

    const recipesDiv = document.getElementById('recipes');
    const recipeOutput = document.getElementById('recipe-output');
    recipeOutput.classList.remove('hidden');
    recipesDiv.textContent = 'Loading...';

    try {
        const response = await fetch('https://api.example.com/recipes', {
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

        if (!response.ok) throw new Error('Failed to fetch recipes.');

        const data = await response.json();

        if (!data.recipes || data.recipes.length === 0) {
            recipesDiv.textContent = 'No recipes found for your input.';
            return;
        }

        const randomRecipe = data.recipes[Math.floor(Math.random() * data.recipes.length)];
        recipesDiv.innerHTML = `
            <h3>${randomRecipe.title}</h3>
            <ul>${randomRecipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            <ol>${randomRecipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        `;
    } catch (error) {
        recipesDiv.textContent = 'An error occurred while fetching recipes. Please try again.';
    }
});
