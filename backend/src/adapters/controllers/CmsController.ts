import { Request, Response } from "express";
import { createDomain } from "../../usecase/Cms/createDomain";
import { createTopics } from "../../usecase/Cms/createTopics";
import { createlevel } from "../../usecase/Cms/createlevel";


export class CmsController {
    private readonly createDomainUseCase: createDomain;
    private readonly createTopicUseCase: createTopics;
    private readonly createLevelUseCase: createlevel;
    constructor(
        createDomainUseCase: createDomain,
        createTopicUseCase: createTopics,
        createLevelUseCase: createlevel
    ) {
        this.createDomainUseCase = createDomainUseCase;
        this.createTopicUseCase = createTopicUseCase;
        this.createLevelUseCase = createLevelUseCase;
    }

    async createDomain(req: Request, res: Response) {
        try {
            const domainData = req.body;
            const data = await this.createDomainUseCase.execute(domainData);
            res.status(201).json({ message: "Domain created successfully", data });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async createTopic(req: Request, res: Response) {
        try {
            const topicData = req.body;
            const topic = await this.createTopicUseCase.execute(topicData);
            res.status(201).json({ message: "Topic created successfully", topic });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async createLevel(req: Request, res: Response) {
        try {
            const levelData = req.body;
            const level = await this.createLevelUseCase.execute(levelData);
            res.status(201).json({ message: "Level created successfully", level });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }




}