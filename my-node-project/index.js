const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


const users = [];

app.get('/', (req, res) => {
    res.send('Authentication Server is running!');
});

app.post('/api/users/signup', (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const newUser = { id: users.length + 1, name, email, password };
        users.push(newUser);

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { id: newUser.id, name: newUser.name, email: newUser.email } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.post('/api/users/login', (req, res) => {
    try {
        const { email, password } = req.body;

    
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ 
            message: 'Login successful', 
            user: { id: user.id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Authentication server listening at http://localhost:${port}`);
});