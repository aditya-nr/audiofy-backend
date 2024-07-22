import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { client as s3 } from '../services/file.service.js';
import { env } from '../constants.js';


const downloadUploadAudioController = async (req, res) => {
    const { youtubeURL } = req.body;
    console.log(youtubeURL);

    if (!youtubeURL) {
        return res.status(400).json({ status: 'error', message: 'YouTube URL is required' });
    }

    const outputFileName = `${Date.now()}.mp3`;
    const outputFilePath = path.resolve('downloads', outputFileName);
    try {
        // Step 1: Download the audio using yt-dlp
        await new Promise((resolve, reject) => {
            exec(`yt-dlp -x --audio-format mp3 -o "${outputFilePath}" ${youtubeURL}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`yt-dlp error:::`, stderr);
                    reject(new Error('Failed to download audio'));
                } else {
                    resolve();
                    console.log(`yt-dlp success :::`, stdout);
                }
            });
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ status: 'error', message: `Unavilable to download` });
    }

    try {
        // Step 2: Upload the audio to AWS S3
        const fileStream = await fs.readFile(outputFilePath);
        const params = {
            Bucket: env.AWS_S3_BUCKET,
            Key: `audios/${outputFileName}`,
            Body: fileStream,
            ContentType: 'audio/mpeg',
        };

        const command = new PutObjectCommand(params);
        try {
            const data = await s3.send(command);
            console.log("S3 upload success:: ", data);
        } catch (error) {
            console.log("S3 upload error::", error);
        }


        // Step 3: Delete the local file
        await fs.unlink(outputFilePath);

        res.status(200).json({ status: 'ok', url: `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_S3_REGION}.amazonaws.com/${params.Key}` });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
};

export default downloadUploadAudioController;
