import mongoose from 'mongoose';
import {Password} from '../services/password';
import {NewsLetter, newsLetterSchema} from './newsLetter.model';
// An interface that describes the properties
// that are required to create a new user
export interface UserAttrs {
    id?: mongoose.Schema.Types.ObjectId;
    googleId?: any;
    email?: string;
    password?: any;
    firstName?: string;
    lastName?: string;
    userName?: string;
    profilePicture?: string
    isAdmin?: Boolean;
    provider?: string;
    stripeCustomerId?: string;
    subscriptions?: any;
    isActive?: boolean;
    newsLetter?: any;
    scheduledOn?: any;
    isVerified?:boolean


    isNewsLetterActive?:boolean;
}

// Interface that describes the properties of a User Model
export interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties that a User Document has
export interface UserDoc extends mongoose.Document {
    id?: mongoose.Schema.Types.ObjectId;
    googleId?: string,
    email: string,
    password?: any,
    firstName?: string;
    lastName?: string;
    userName?: string;
    profilePicture?: string
    provider?: string;
    isAdmin?: boolean;
    stripeCustomerId?: string;
    subscriptions?: any;
    isActive?: boolean;
    newsLetter?: any;
    scheduledOn?: any;
    isNewsLetterActive?:boolean
    isVerified?:boolean
}

const userSchema = new mongoose.Schema({

    googleId: {
        type: String,
        required: false,
    },

    userName: {
        type: String
    },
    email: {
        type: String
        //  required: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    profilePicture: {
        type: String
    },
    password: {
        type: 'String',
        //  required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isNewsLetterActive: {
        type: Boolean,
        default: false
    },
    provider: {
        type: String
    },
    stripeCustomerId: {
        type: String,
    },
    subscriptions: [{
        id: String,
        customer: String,
        status: String,
        current_period_start: Number,
        current_period_end: Number,
        billing_cycle_anchor: Number,
        cancel_at_period_end: Boolean,
        created: Number,
        start_date: Number,
        plan: {}
    }],
    newsLetter: [{
        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Source'
        },
        numberOfPosts: {
            type: String
        },
    }],
    scheduledOn:
        {
            frequency:String,
            dayOfMonth:String,
            dayOfWeek:String,
            time:String
        },
    isVerified: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
});

userSchema.set('toJSON', {
    transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

