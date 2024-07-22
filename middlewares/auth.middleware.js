import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.body.owner = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
