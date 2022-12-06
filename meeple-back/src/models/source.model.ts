import mongoose from 'mongoose';
import {FeedAttrs, FeedDoc, FeedModel} from "./feed.model";
// An interface that describes the properties
// that are required to parse feed data
export interface SourceAttrs {
    name:string,
    image:string,
    description:string,
    link:string,
    provider:string
}

// Interface that describes the properties of a feed Model
export interface SourceModel extends mongoose.Model<SourceDoc> {
    build(attrs: SourceAttrs): SourceDoc;
}

// Interface that describes the properties that a feed Document has
export interface SourceDoc extends mongoose.Document {
    name:string,
    image:string,
    description:string,
    link:string,
    provider:string
}

const sourceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    provider: {
        type: String
    }
});

sourceSchema.set('toJSON', {
    transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

sourceSchema.statics.build = (attrs: SourceAttrs) => {
    return new Source(attrs);
};

export const Source = mongoose.model<SourceDoc, SourceModel>('Source', sourceSchema);
