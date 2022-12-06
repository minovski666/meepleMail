import { landingPage } from "../models/landingPage";

export async function saveCustomerEmail(req: any, res: any) {
    const newContact = landingPage.build({
        email: req.body.email,
    });
    await newContact.save();
    res.send({status: 200, data: newContact});
}

export async function getAllEmailsFromLandingPage(req: any, res: any) {
    const emails = await landingPage.find().sort({date: -1})
    res.json(emails);
}