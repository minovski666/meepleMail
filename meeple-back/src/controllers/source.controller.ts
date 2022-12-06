import express, {Request, Response} from 'express';
import {
    createSourceService,
    getSourceService,
    getAllSourcesService,
    updateSourceService,
    deleteSourceService, getAllSourcesForHomePageService
} from '../services/source.service'

export async function createSource(req: any,res:Response){
    const {name, image, description, link, provider} = req.body
    const createSource = await createSourceService(name, image, description, link, provider);
    return res.json(createSource);
}

export async function getSource(req: Request, res: Response) {
    const sourceId = req.params.sourceId;
    const getSource = await getSourceService(sourceId);
    return res.json(getSource);
}

export async function getAllSources(req: Request, res: Response) {
  const getAllSources = await getAllSourcesService();
  return res.json(getAllSources);
}

export async function getAllSourcesForHomePage(req: Request, res: Response) {
    const getAllSources = await getAllSourcesForHomePageService();
    return res.json(getAllSources);
}

export async function updateSource(req: any, res: Response) {
    const sourceId = req.params.sourceId;
    const requestBody = req.body;
    const updateSource = await updateSourceService(sourceId,requestBody);
    return res.json(updateSource);
}

export async function deleteSource(req: Request, res: Response) {
    const sourceId = req.params.sourceId;
    const deleteSource = await deleteSourceService(sourceId);
    return res.json(deleteSource);
}