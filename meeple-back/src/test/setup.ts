import mongoose from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server';
import connect from '../utils/connect';


import config from 'config';
import {app} from '../app';

let mongo: any;
let jwtSecret: string;
beforeAll(async () => {
    process.env.JWT_SECRET = 'qweiopufnqeiop1231fsdas'
    mongo = await MongoMemoryServer.create();

    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close()
    await mongo.stop()
})