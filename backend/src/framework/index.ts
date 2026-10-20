import { env } from "./config/env";
import { buildApp } from "./app";
import { dbConnection } from "./database/dbConnection";
import { connectRedis } from "./config/redis";

async function main(): Promise<void> {
    await dbConnection();
    await connectRedis();

    const app = buildApp();
    app.listen(env.port, () => {
        console.log(`[server]: Server is running at http://localhost:${env.port}`);
    });
}

main().catch((err) => {
    console.error("[server]: Fatal startup error:", err instanceof Error ? err.message : err);
    process.exit(1);
});
