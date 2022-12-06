import {Post} from "../models/post.model";
import {BadRequestError} from "../errors/badRequestError";
import * as dotenv from "dotenv";


dotenv.config();
const path = require('path')
export const createService = async (title: string, description: string, files: any, isPublished: boolean) => {
    const image = files.image;

//create custom file name

  image.name = `image_${image.name}`

    image.mv(`${process.env.FILE_UPLOAD_PATH}/${image.name}`, async (err: any) => {
        if (err) {
            console.log(err);
            throw new BadRequestError('bad request');
        }
       const newPost = Post.build({title, description, image:image.name, isPublished});
       await newPost.save();
       return true;
    })

}

export const updateService = async (_id: string, title: string, description: string, files: any, isPublished: boolean) => {

    const image = files.image;

//create custom file name

    image.name = `image_${image.name}`

    image.mv(`${process.env.FILE_UPLOAD_PATH}/${image.name}`, async (err: any) => {
        if (err) {
            console.log(err);
            throw new BadRequestError('bad request');
        }
        await Post.findByIdAndUpdate({_id},{title, description, image, isPublished}, {new: true});
        return true;
    })


}

export const getAllService = async () => {
    return await Post.find().sort({date: -1});
}

export const getAllServicePublished = async () => {
    return await Post.find().where('isPublished', 'true').sort({date: -1});
}

export const getPostService = async (postId: any) => {
    const post = await Post.findById(postId);
    if (!post) throw new BadRequestError('post does not exist');
    return post
}

export const deletePostService = async (postId: any) => {
    const post = await Post.findById(postId);
    if (!post) throw new BadRequestError('post does not exist');
    await post.remove();
    return post
}