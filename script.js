document.addEventListener('DOMContentLoaded', () => {

    // console.log("Created By Satendra Kumar Parteti");
    console.log('%cCreated By Satendra Kumar Parteti', 'background: linear-gradient(to bottom, #6dd5ed, #2193b0); color: black; padding: 8px;');


    const anotherJokeButton = document.getElementById('anotherJokeButton');
    const textBox = document.getElementById('textbox');

    // Event listener for the "Another Joke" button
    anotherJokeButton.addEventListener('click', fetchJoke);

    // Function to fetch joke from the API
    function fetchJoke() {
        const apiUrl = 'https://v2.jokeapi.dev/joke/Any';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Hide the textbox
                textBox.classList.remove('show');

                // Delay showing the new joke for better transition effect
                setTimeout(() => {
                    if (data.type === "single") {
                        textBox.innerText = data.joke;
                    } else if (data.type === "twopart") {
                        textBox.innerText = data.setup;
                        setTimeout(() => {
                            textBox.innerText += "\n\n" + data.delivery;
                            textBox.classList.add('show');
                        }, 3000);
                    } else {
                        textBox.innerText = "Oops! Unexpected joke type.";
                    }
                    // Show the textbox after delay
                    textBox.classList.add('show');
                }, 500); // Delay for the same duration as the transition

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
                textBox.innerText = 'Failed to fetch joke. Please try again later.'; // Display error message
            });
    }

    // Fetch the first joke when the page loads
    fetchJoke();

});
