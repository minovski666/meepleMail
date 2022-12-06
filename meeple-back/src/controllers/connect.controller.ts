import {Contact} from "../models/contact.model";

export async function createContact(req: any, res: any) {
    const newContact = Contact.build({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        isBug: req.body.isBug
    });
    await newContact.save();
    res.send({status: 200, data: newContact});
}

export async function getAllContacts(req: any, res: any) {
    const contacts = await Contact.find({isBug: false}).sort({date: -1})
    res.json(contacts);
}

export async function getAllReportedBugs(req: any, res: any) {
const getAllReportedBugs = await Contact.find({isBug: true}).sort({date: -1});
res.json(getAllReportedBugs)
}