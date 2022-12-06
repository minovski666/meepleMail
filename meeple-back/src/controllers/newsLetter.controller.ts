import {User} from '../models/user.model';
import {Feed} from "../models/feed.model";


export async function createNewsLetter(req: any, res: any) {
    try {
        const sources = req.body.source;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (user!.newsLetter) {
            user!.newsLetter.splice(0, user!.newsLetter.length)
        }


        sources.map(async (data: any) => {
            const newsLetter = {
                sourceId: data.sourceId,
                numberOfPosts: data.numberOfPosts !== -1 ? data.numberOfPosts : 3
            };
            await user!.newsLetter.push(newsLetter);
        })

        await user!.save();

        res.json(user!.newsLetter)

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong', error: error});
    }
}

export async function getNewsLetter(req: any, res: any) {
    try {
        const feeds = await Feed.find()
        const user = await User.find({_id: req.user.id})
            .populate({
                path: 'newsLetter',
                populate: {
                    path: 'sourceId',

                    model: 'Source'
                }
            });

        const userNewsLetter = user[0].newsLetter;
        const sources: any = []

        if (userNewsLetter) {

            userNewsLetter.forEach((data: any) => {
                const source = {
                    id: '',
                    name: '',
                    description: '',
                    link: '',
                    provider: '',
                    image: '',
                    numberOfPosts: '',
                    feeds: [],
                }
                let feedsToSource: any = []

                feeds.forEach((feed: any) => {

                    if (feed.sourceId.toString() === data.sourceId.id) {
                        if (feedsToSource.length < data.numberOfPosts) {
                            feedsToSource.push(feed)
                        }
                    }
                })
                source.id = data.sourceId.id;
                source.name = data.sourceId.name;
                source.description = data.sourceId.description;
                source.link = data.sourceId.link;
                source.provider = data.sourceId.provider;
                source.image = data.sourceId.image;
                source.numberOfPosts = data.numberOfPosts;
                source.feeds = feedsToSource

                sources.push(source)
            })
        }
        res.json(sources);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong', error: error});
    }
}

export async function scheduleNewsLetter(req: any, res: any) {
    try {
        const {scheduledOn} = req.body;
        const userId = req.user.id;

        const updated = await User.findByIdAndUpdate(userId, {scheduledOn: scheduledOn,}, {new: true});

        res.json(updated)

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong', error: error});
    }
}

export async function isNewsLetterActive(req: any, res: any) {
    try {
        const userId = req.user.id;
        const user = await User.find({_id: userId})
        let newUserData: any = []

        if (user[0].isNewsLetterActive) {
            newUserData = await User.findByIdAndUpdate(userId, {isNewsLetterActive: false,}, {new: true});
        } else {
            newUserData = await User.findByIdAndUpdate(userId, {isNewsLetterActive: true,}, {new: true});
        }

        res.json(newUserData)

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong', error: error});
    }
}