import {logger} from "../app";
import Parser from 'rss-parser';
import {Feed} from "../models/feed.model";
import {CustomFeed, CustomItem} from "../types";
import {Source} from "../models/source.model";

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
        feed: ['foo'],
        item: ['bar']
    }
});

export const parserService = async () => {
    const sources = await Source.find({});
    let sourceLink

    for (const document of sources) {

        const sourceUrl = document.link;
        const sourceProvider = document.provider;
        const feed = await parser.parseURL(sourceUrl);
const sourceId = document._id
        for (const item of feed.items) {

            const existingPost = await Feed.findOne({title: item.title});
            if (existingPost) {
                logger.error('Post already exists');
            } else {

                const feed = Feed.build({

                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                    author: item.author,
                    contentSnippet: item.contentSnippet,
                    isoDate: item.isoDate,
                    postId: item.id,
                    comments: item.comments,
                    creator: item.creator,
                    provider:sourceProvider,
                    sourceId:sourceId
                });
               await feed.save();
            }
        }
    }
    return true
}