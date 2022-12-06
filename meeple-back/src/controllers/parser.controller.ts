import {parserService} from "../services/parser.service";
import {sourceService} from "../services/source.service";

export async function parseSources(req: any, res: any) {
    const {name, image, description, link, provider} = req.body;
    const parsedPosts = await sourceService(name, image, description, link, provider);
    return res.json(parsedPosts);
}

export async function parsePosts(req: any, res: any) {
    const parsedPosts = await parserService();
    return res.json(parsedPosts);
}