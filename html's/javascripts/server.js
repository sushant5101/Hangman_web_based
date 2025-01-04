const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Function to add test data to your bin
async function userdata(name, pass) {
    const url = 'https://api.jsonbin.io/v3/b/67701877e41b4d34e46c73ff';
    const newUser = {
        name: name,
        pass: pass
    };

    try {
        // Fetch existing data from the bin
        const existingResponse = await axios.get(url, {
            headers: {
                'X-Master-Key': '$2a$10$TggbGJAIDn8mLPvCLxonKuv.0bQ/2ABtqejqjYQt8pWHOs8icQrgC' // Replace with your master key
            }
        });

        // Extract existing hangman_user
        let existingData = existingResponse.data.record;
        if (!existingData.hangman_user) {
            existingData.hangman_user = [];
        }

        let userExists = false;
        if (existingData.hangman_user) {
            existingData.hangman_user.forEach(user => {
                if (user.name === name) {
                    userExists = true;
                    console.log("matched");
                }
            });
        }

        if (!userExists) {
            // Add the new user to the existing hangman_user array
            existingData.hangman_user.push(newUser);

            // Update the bin with the combined data
            const updateResponse = await axios.put(
                url,
                existingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$TggbGJAIDn8mLPvCLxonKuv.0bQ/2ABtqejqjYQt8pWHOs8icQrgC' // Replace with your master key
                    }
                }
            );

            console.log('Data added successfully:', updateResponse.data.record);
        }
    } catch (error) {
        console.error('Error adding test data:', error);
    }
}

// Route to read data from your bin
app.get('/get-bin', async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/67701877e41b4d34e46c73ff', {
            headers: {
                'X-Master-Key': '$2a$10$TggbGJAIDn8mLPvCLxonKuv.0bQ/2ABtqejqjYQt8pWHOs8icQrgC' // Replace with your master key
            }
        });
        res.status(200).json(response.data.record); // .record to get the data part of the response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bin', error: error.message });
    }
});

// Endpoint to call userdata function
app.post('/add-user', async (req, res) => {
    const { name, pass } = req.body;
    await userdata(name, pass);
    res.status(200).send('User data added successfully.');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
