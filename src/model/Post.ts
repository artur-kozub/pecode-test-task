import mongoose, { Document, Schema } from "mongoose";

interface PostDocument extends Document {
    createdBy: Schema.Types.ObjectId;
    post: string;
}

const postSchema = new Schema<PostDocument>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: String,
        required: true
    }
});

const Post = mongoose.model<PostDocument>('Post', postSchema);

export default Post;