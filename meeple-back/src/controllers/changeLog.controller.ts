import {ChangeLog, ChangeLogAttrs} from "../models/changeLog.model";


export async function createLog(req: any, res: any) {
    const newLog = ChangeLog.build({
        title: req.body.title,
        description: req.body.description,
        isPublished: req.body.isPublished,
        image: req.body.image,
    });
    await newLog.save();
    res.send({status: 200, data: newLog});
}

export async function updateLog(req: any, res: any) {
    const updatedResult = await ChangeLog.findByIdAndUpdate(
        {_id: req.params.id},
        {
            title: req.body.title,
            description: req.body.description,
            isPublished: req.body.isPublished,
        },
        {
            new: true,
        }
    );

    res.json({status: 200, data: updatedResult});

}

export async function getAllLogs(req: any, res: any) {
    const changeLog = await ChangeLog.find().sort({date: -1})
    res.json(changeLog);
}

export async function getAllPublishedLogs(req: any, res: any) {
    const changeLog = await ChangeLog.find().where('isPublished', 'true').sort({date: -1})
    res.json(changeLog);
}

export async function getLog(req: any, res: any) {
    const changeLog = await ChangeLog.findById(req.params.id);
    if (!changeLog) {
        return res.status(404).json({message: 'log not found'});
    }
    res.json(changeLog);

}

export async function deleteLog(req: any, res: any) {
    const changeLog = await ChangeLog.findById(req.params.id);
    if (!changeLog) {
        return res.status(404).json({message: 'post not found'});
    }
    await changeLog.remove();
    res.json({message: 'changeLog removed'});
}