import mongoose from "mongoose";
import os from "os";
import packageJson from "../../../package.json";

class HealthService {

    checkMongo() {
        return mongoose.connection.readyState === 1;
    }

    getMemory() {
        const memory = process.memoryUsage();

        return {
            rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
            heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`
        };
    }

    getSystem() {
        return {
            cpuCount: os.cpus().length,
            totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
            freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`
        };
    }

    getVersion() {
        return packageJson.version;
    }

    getEnvironment() {
        return process.env.NODE_ENV || "development";
    }

    getTimestamp() {
        return new Date().toISOString();
    }

    getUptime() {
        return Math.floor(process.uptime());
    }
}

export default new HealthService();