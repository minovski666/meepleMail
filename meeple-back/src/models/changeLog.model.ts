import mongoose from 'mongoose';

export interface ChangeLogAttrs {
    userId?: mongoose.Schema.Types.ObjectId;
    title?: string;
    description?: string;
    image?: string;
    isPublished?: boolean;
    createdAt?: Date;
}

export interface ChangeLogDoc extends mongoose.Document {
    userId?: mongoose.Schema.Types.ObjectId;
    title?: string;
    description?: string;
    image?: string;
    isPublished?: boolean;
    createdAt?: Date;
}

export interface ChangeLogModel extends mongoose.Model<ChangeLogDoc> {
    build(attrs: ChangeLogAttrs): ChangeLogDoc;
}

const changeLogSchema = new mongoose.Schema({
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
});

changeLogSchema.set('toJSON', {
    transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

changeLogSchema.statics.build = (attrs: ChangeLogAttrs) => {
    return new ChangeLog(attrs);
}

export const ChangeLog = mongoose.model<ChangeLogDoc, ChangeLogModel>('ChangeLog', changeLogSchema);
