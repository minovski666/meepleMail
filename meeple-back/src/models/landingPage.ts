import mongoose from 'mongoose';


export interface landingPageAttrs {
    email:string;
}

export interface landingPageDoc extends mongoose.Document {

    email:string;
}

interface landingPageModel extends mongoose.Model<landingPageDoc> {
    build(attrs: landingPageAttrs): landingPageDoc;
}

export const landingPageSchema = new mongoose.Schema({
    email: {
        type: String
    },
});

landingPageSchema.statics.build = (attrs: landingPageAttrs) => {
    return new landingPage(attrs);
}
export const landingPage = mongoose.model<landingPageDoc, landingPageModel>('landingPage', landingPageSchema);