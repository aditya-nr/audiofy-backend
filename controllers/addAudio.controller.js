import { AudioModel } from '../models/audiofy.js'

const addAudioController = async (req, res) => {
    const { title, coverImgUrl, audioUrl, owner } = req.body;

    if (!title || !coverImgUrl || !audioUrl || !owner) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    try {
        const newAudio = new AudioModel({
            title,
            coverImgUrl,
            audioUrl,
            owner
        });

        await newAudio.save();

        res.status(201).json({ status: 'ok', message: 'Audio added successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
};

export default addAudioController;
