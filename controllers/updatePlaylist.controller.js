import { PlaylistModel } from '../models/audiofy.js';

const updatePlaylistController = async (req, res) => {
    const { id, name, owner, audio } = req.body;

    if (!id || !name || !owner) {
        return res.status(400).json({ status: 'error', message: 'ID, name, and owner are required' });
    }

    try {
        const updatedPlaylist = await PlaylistModel.findByIdAndUpdate(
            id,
            { name, owner, audio },
            { new: true }
        );

        if (!updatedPlaylist) {
            return res.status(404).json({ status: 'error', message: 'Playlist not found' });
        }

        res.status(200).json({ status: 'ok', message: 'Playlist updated successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
};
export default updatePlaylistController;
