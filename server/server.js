require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./database/db");
const User = require("./models/user-models");




app.use(cors());

app.use(express.json());

app.use('/api/auth', router);

app.put('/api/auth/users/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const { paymentDone } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { paymentDone }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ message: 'Payment status updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
app.put('/api/auth/users/:userId/allow-batch-change', async (req, res, next) => {
    const userId = req.params.userId;
    const { selectedBatch } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the selectedBatch for the user
        user.selectedBatch = selectedBatch;
        await user.save();

        return res.json({ message: 'Selected batch updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});
const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    })
})

