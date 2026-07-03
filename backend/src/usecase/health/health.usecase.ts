import healthService from "../../framework/services/health.service";
import { HealthResponse } from "../../entity/health/health.entity";

class HealthUseCase {

    execute(): HealthResponse {

        const mongoStatus = healthService.checkMongo();

        return {

            status: mongoStatus ? "UP" : "DOWN",

            timestamp: healthService.getTimestamp(),

            version: healthService.getVersion(),

            environment: healthService.getEnvironment(),

            uptime: healthService.getUptime(),

            mongodb: {
                status: mongoStatus ? "UP" : "DOWN"
            },

            memory: healthService.getMemory(),

            system: healthService.getSystem()

        };
    }

}

export default new HealthUseCase();