import {Source, SourceDoc} from "../models/source.model";
import {BadRequestError} from "../errors/badRequestError";
import logger from '../utils/logger/logger';

export const sourceService = async (name: string, image: string, description: string, link: string, provider: string) => {

    const existingSource = await Source.findOne<SourceDoc>({provider});

    if (existingSource) {
        logger.error('source already exists');
        throw new BadRequestError('source already exists');
    }

    const source = Source.build({name, image, description, link, provider});
    await source.save();

    return true;
}

export const createSourceService = async (name: string, image: string, description: string, link: string, provider: string) => {
    const newSource = Source.build({name, image, description, link, provider});
    await newSource.save();
    return true;
}

export const getSourceService = async (sourceId: string) => {
    const source = await Source.findById<SourceDoc>(sourceId);
    if (!source) {
        logger.error('source does not exist!!');
    }
    return {
        success: true,
        data: source
    };
}

export const getAllSourcesService = async () => {
    return await Source.find<SourceDoc>({});
}
export const getAllSourcesForHomePageService = async () => {
   const sources = Source.find<SourceDoc>( {  }, { Feed:0 } );

    return sources;
}


export const updateSourceService = async (sourceId: string, requestBody: SourceDoc) => {
    const updateSource = await Source.findByIdAndUpdate<SourceDoc>(
        {
            _id: sourceId
        }, {
            name: requestBody.name,
            image: requestBody.image,
            description: requestBody.description,
            link: requestBody.link,
            provider: requestBody.provider
        }, {
            new: true
        })

    return {
        success: true,
        data: updateSource
    }
}

export const deleteSourceService = async (sourceId: string) => {
    const source = await Source.findById<SourceDoc>(sourceId);
    if (source) {
        await source.remove();
    } else {
        logger.error('source does not exist!!');
    }
    return true;
}