import mongoose from 'mongoose';

export interface ConnectAttrs {
    name?: string;
    email?: string;
    comment?: string;
    isBug?: boolean;
    createdAt?: Date;
}

export interface ConnectDoc extends mongoose.Document {
    name?: string;
    email?: string;
    comment?: string;
    isBug?: boolean;
    createdAt?: Date;
}

export interface contactModel extends mongoose.Model<ConnectDoc> {
    build(attrs: ConnectAttrs): ConnectDoc;
}

const connectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    comment: {
        type: String,
    },
    isBug:{
        type: Boolean,
    }
});

connectSchema.set('toJSON', {
    transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

connectSchema.statics.build = (attrs: ConnectAttrs) => {
    return new Contact(attrs);
}

export const Contact = mongoose.model<ConnectDoc, contactModel>('Contact', connectSchema);
