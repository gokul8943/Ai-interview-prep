import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer | undefined;

export async function setup() {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_TEST_URI = mongoServer.getUri();
}

export async function teardown() {
    await mongoServer?.stop();
}
