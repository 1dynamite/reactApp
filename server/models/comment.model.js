import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    created: {
        type: Date,
        index: true,
        default: Date.now
    },
    body: String,
    userId: String,
    lessonId: String
});

export default mongoose.model('Comment', CommentSchema);