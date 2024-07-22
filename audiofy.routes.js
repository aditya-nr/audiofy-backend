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
router.post('/add-audio', addAudioController);
router.post('/create-playlist', createPlaylistController);
router.put('/update-playlist', updatePlaylistController);
router.post('/get-presigned-url', getPresignedUrlController);
router.post('/download-upload-audio', downloadUploadAudioController);

export default router;