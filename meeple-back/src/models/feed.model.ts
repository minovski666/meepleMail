import mongoose from 'mongoose';
// An interface that describes the properties
// that are required to parse feed data
export interface FeedAttrs {
    title: string,
    link: string,
    pubDate: string,
    author: string,
    contentSnippet: string,
    postId: string,
    isoDate: string,
    comments?:string
    creator?:string
    provider?:string
    sourceId?: string
}

// Interface that describes the properties of a feed Model
export interface FeedModel extends mongoose.Model<FeedDoc> {
    build(attrs: FeedAttrs): FeedDoc;
}

// Interface that describes the properties that a feed Document has
export interface FeedDoc extends mongoose.Document {
    title: string,
    link: string,
    pubDate: string,
    author: string,
    contentSnippet: string,
    postId: string,
    isoDate: string,
    comments?:string,
    creator?:string
    provider?:string
    sourceId?: string
}

const feedSchema = new mongoose.Schema({
    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source"
    },
    postId: {
        type: String,
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    pubDate: {
        type: String
    },
    isoDate: {
        type: String
    },
    author: {
        type: String
    },
    contentSnippet: {
        type: String
    },
    comments:{
        type:String
    },
    creator:{
      type:String
    },
    provider:{
      type:String
    }
});

feedSchema.set('toJSON', {
    transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

feedSchema.statics.build = (attrs: FeedAttrs) => {
    return new Feed(attrs);
};

export const Feed = mongoose.model<FeedDoc, FeedModel>('Feed', feedSchema);
