import {
    createService,
    getAllService,
    getPostService,
    deletePostService,
    updateService,
    getAllServicePublished
} from "../services/blog.service";
import {BadRequestError} from "../errors/badRequestError";

export async function createPost(req: any, res: any) {
    const {title, description, isPublished} = req.body;
    if (!req.files) {
        throw new BadRequestError('please upload a file');
    }

    const files = req.files
    const createPost = await createService(title, description, files, isPublished);
    return res.json(createPost);
}

export async function updatePost(req: any, res: any) {
    const {title, description, image, isPublished} = req.body;
    const id = req.params.id;
    if (!req.files) {
        throw new BadRequestError('please upload a file');
    }

    const files = req.files
    const updatePost = await updateService(id, title, description, files, isPublished);
    return res.json(updatePost);
}

export async function getAllPosts(req: any, res: any) {
    const getPosts = await getAllService();
    return res.json(getPosts);
}

export async function getAllPublishedPosts(req: any, res: any) {
    const getPosts = await getAllServicePublished();
    return res.json(getPosts);
}

export async function getPost(req: any, res: any) {
    const postId = req.params.id, getPost = await getPostService(postId);
    return res.json(getPost);
}

export async function deletePost(req: any, res: any) {
    const postId = req.params.id, deletePost = await deletePostService(postId);
    res.json(deletePost);
}