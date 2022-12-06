import mongoose from 'mongoose';

export interface PostAttrs {
    userId?: mongoose.Schema.Types.ObjectId;
    title?: string;
    description?: string;
    image?: string;
    isPublished?: boolean;
    createdAt?: Date;
}

export interface PostDoc extends mongoose.Document {
    userId?: mongoose.Schema.Types.ObjectId;
    title?: string;
    description?: string;
    image?: string;
    isPublished?: boolean;
    createdAt?: Date;
}

export interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    isPublished: {
        type: Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
});

postSchema.set('toJSON', {
    transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

postSchema.statics.build = (attrs: PostAttrs) => {
    return new Post(attrs);
}

export const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);
