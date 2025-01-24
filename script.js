document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const recipeOutput = document.getElementById('recipe-output');
    const recipesDiv = document.getElementById('recipes');

    // Check if the form exists
    if (!form) {
        console.error('Form element not found');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const allergies = document.getElementById('allergies').value;
        const mood = document.getElementById('mood').value;
        const leftovers = document.getElementById('leftovers').value;

        // Check if the required fields are filled
        if (!allergies || !mood || !leftovers) {
            alert('Please fill out all fields.');
            return;
        }

        // Send the form data to the backend server (which will interact with OpenAI API)
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    allergies,
                    mood,
                    leftovers
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get a response from the server');
            }

            const data = await response.json();
            recipesDiv.innerHTML = data.result || 'No response from OpenAI.';
            recipeOutput.classList.remove('hidden');
        } catch (error) {
            console.error('Error:', error);
            recipesDiv.innerHTML = 'An error occurred while contacting the server.';
            recipeOutput.classList.remove('hidden');
        }
    });
});
