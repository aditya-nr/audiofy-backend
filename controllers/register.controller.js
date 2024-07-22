import bcrypt from 'bcrypt';
import { UserModel } from '../models/audiofy.js';

const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ status: 'ok', message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
};

export default registerController;
