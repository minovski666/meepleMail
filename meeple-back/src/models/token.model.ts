import mongoose from 'mongoose';

export interface TokenAttrs {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    expiresAt: Date;
}

export interface TokenDoc extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    expiresAt: Date;
}

export interface TokenModel extends mongoose.Model<TokenDoc> {
    build(attrs: TokenAttrs): TokenDoc;
}

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time in seconds
    },
});

tokenSchema.set('toJSON',{
    transform(doc:any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

tokenSchema.statics.build = (attrs:TokenAttrs) => {
    return new Token(attrs);
}

export const Token = mongoose.model<TokenDoc,TokenModel>('Token', tokenSchema);
