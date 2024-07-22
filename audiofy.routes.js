import express from 'express';
import {
    addAudioController,
    createPlaylistController,
    downloadUploadAudioController,
    getPresignedUrlController,
    loginController,
    registerController,
    updatePlaylistController
} from './controllers/audiofy.js';
import { authMiddleware } from './middlewares/audiofy.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/add-audio', authMiddleware, addAudioController);
router.post('/create-playlist', authMiddleware, createPlaylistController);
router.put('/update-playlist', authMiddleware, updatePlaylistController);
router.post('/get-presigned-url', authMiddleware, getPresignedUrlController);
router.post('/process-url', authMiddleware, downloadUploadAudioController);

export default router;
