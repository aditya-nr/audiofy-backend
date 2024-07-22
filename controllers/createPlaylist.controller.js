import { PlaylistModel } from '../models/audiofy.js';

const createPlaylistController = async (req, res) => {
    const { name, owner, audio } = req.body;

    if (!name || !owner) {
        return res.status(400).json({ status: 'error', message: 'Name and owner are required' });
    }

    try {
        const newPlaylist = new PlaylistModel({
            name,
            owner,
            audio: audio || []
        });

        await newPlaylist.save();

        res.status(201).json({ status: 'ok', message: 'Playlist created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
};

export default createPlaylistController;
