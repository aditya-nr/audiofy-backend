import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const audioSchema = new Schema({
    title: { type: String, required: true },
    coverImgUrl: { type: String, required: true },
    audioUrl: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const AudioModel = mongoose.model('Audio', audioSchema);
export default AudioModel;
