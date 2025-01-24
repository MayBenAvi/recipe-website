document.getElementById('generateBtn').addEventListener('click', async () => {
    const userPrompt = prompt('Enter a prompt for OpenAI:');
    if (!userPrompt) return; // Don't proceed if no prompt is entered

    // Send the prompt to the backend server (which will interact with OpenAI API)
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userPrompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to get a response from the server');
        }

        const data = await response.json();
        document.getElementById('output').innerText = data.result || 'No response from OpenAI.';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'An error occurred while contacting the server.';
    }
});
