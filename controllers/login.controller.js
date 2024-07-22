import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/audiofy.js';

const JWT_SECRET = "jwt-secret";
const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: 'error', message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ status: 'error', message: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);

        res.status(200).json({ status: 'ok', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
};

export default loginController;
