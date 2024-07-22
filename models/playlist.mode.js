import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    audio: [{ type: Schema.Types.ObjectId, ref: 'Audio' }]
});

const PlaylistModel = mongoose.model('Playlist', playlistSchema);
export default PlaylistModel;