import { env } from "./config/env";
import { buildApp } from "./app";
import { dbConnection } from "./database/dbConnection";
import { connectRedis } from "./config/redis";
import fs from "fs";
import path from "path";
import https from "https";

async function main(): Promise<void> {
    await dbConnection();
    await connectRedis();

    const app = buildApp();

    if (env.isProduction) {
        app.listen(env.port, () => {
            console.log(`[server]: Server is running at http://localhost:${env.port}`);
        });
    } else {
        const certPath = path.join(process.env.USERPROFILE || "", ".vite-plugin-mkcert", "cert.pem");
        const keyPath = path.join(process.env.USERPROFILE || "", ".vite-plugin-mkcert", "dev.pem");

        if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
            const server = https.createServer(
                {
                    cert: fs.readFileSync(certPath),
                    key: fs.readFileSync(keyPath),
                },
                app
            );
            server.listen(env.port, () => {
                console.log(`[server]: Server is running at https://localhost:${env.port}`);
            });
        } else {
            app.listen(env.port, () => {
                console.log(`[server]: Server is running at http://localhost:${env.port} (HTTP fallback - certs not found)`);
            });
        }
    }
}

main().catch((err) => {
    console.error("[server]: Fatal startup error:", err instanceof Error ? err.message : err);
    process.exit(1);
});
