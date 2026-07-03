import { Request, Response } from "express";
import healthUseCase from "../../usecase/health/health.usecase";

class HealthController {
    public getHealth(req: Request, res: Response): void {
        const response = healthUseCase.execute();

        const statusCode = response.status === "UP" ? 200 : 503;

        res.status(statusCode).json(response);
    }
}

export default new HealthController();