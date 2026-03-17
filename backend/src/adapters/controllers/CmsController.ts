import { Request, Response } from "express";


export class CmsController {
    constructor(
    ) { }

    async createDomain(req: Request, res: Response) {
        try {
            const domainData = req.body;

            res.status(201).json({ message: "Domain created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async createTopic(req: Request, res: Response) {
        try {
            const topicData = req.body;

            res.status(201).json({ message: "Topic created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async createLevel(req: Request, res: Response) {
        try {
            const levelData = req.body;

            res.status(201).json({ message: "Level created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }




}