import mongoose from 'mongoose';


export interface NewsLetterAttrs {
    sourceId?: string
    numberOfPosts?: number
}

export interface NewsLetterDoc extends mongoose.Document {

    sourceId?: string
    numberOfPosts?: number
}

interface newsLetterModel extends mongoose.Model<NewsLetterDoc> {
    build(attrs: NewsLetterAttrs): NewsLetterDoc;
}

export const newsLetterSchema = new mongoose.Schema({
    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source'
    },
    numberOfPosts: {
        type: Number
    },
});

newsLetterSchema.statics.build = (attrs: NewsLetterAttrs) => {
    return new NewsLetter(attrs);
}
export const NewsLetter = mongoose.model<NewsLetterDoc, newsLetterModel>('NewsLetter', newsLetterSchema);