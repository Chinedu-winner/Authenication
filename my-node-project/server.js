const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./user");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const mongoURL = "mongodb+srv://Login-Winner:holyspirit(2002)@cluster0.xrwjhoz.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>console.log("MongoDB connected"))
    .catch(err=>console.log(err));

app.post('/api/users/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        fetch
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
}); 