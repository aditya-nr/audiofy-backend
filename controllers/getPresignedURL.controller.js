import { FileServie } from "../services/file.service.js";
import { env } from '../constants.js';
import { logme } from "../services/logs.service.js";
const getPresignedUrlController = async (req, res) => {
    logme(req);
    const { extension, mimeType } = req.body;

    if (!extension || !mimeType) {
        return res.status(400).json({ status: 'error', message: 'Extension and mimeType are required' });
    }

    try {
        const key = `cover-img/${Date.now()}_${Math.floor(Math.random() * 100000)}.${extension}`;
        const uploadUrl = await FileServie.putObjectUrl(key, mimeType);
        res.status(200).json({
            status: 'ok', uploadUrl, url: `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_S3_REGION}.amazonaws.com/${key}`
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Server error!' });
    }
};

export default getPresignedUrlController;
