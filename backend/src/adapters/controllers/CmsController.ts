import { Request, Response } from "express";
import { createDomain } from "../../usecase/Cms/createDomain";
import { getAllDomains } from "../../usecase/Cms/getAllDomains";
import { getDomainById } from "../../usecase/Cms/getDomainById";
import { updateDomain } from "../../usecase/Cms/updateDomain";
import { deleteDomain } from "../../usecase/Cms/deleteDomain";

import { createTopics } from "../../usecase/Cms/createTopics";
import { createlevel } from "../../usecase/Cms/createlevel";



export class CmsController {
    private readonly createDomainUseCase: createDomain;
    private readonly getAllDomainsUseCase: getAllDomains;
    private readonly getDomainByIdUseCase: getDomainById;
    private readonly updateDomainUseCase: updateDomain;
    private readonly deleteDomainUseCase: deleteDomain;
    private readonly createTopicUseCase: createTopics;
    private readonly createLevelUseCase: createlevel;
    constructor(
        createDomainUseCase: createDomain,
        getAllDomainsUseCase: getAllDomains,
        getDomainByIdUseCase: getDomainById,
        updateDomainUseCase: updateDomain,
        deleteDomainUseCase: deleteDomain,
        createTopicUseCase: createTopics,
        createLevelUseCase: createlevel
    ) {
        this.createDomainUseCase = createDomainUseCase;
        this.getAllDomainsUseCase = getAllDomainsUseCase;
        this.getDomainByIdUseCase = getDomainByIdUseCase;
        this.updateDomainUseCase = updateDomainUseCase;
        this.deleteDomainUseCase = deleteDomainUseCase;
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

    async getAllDomains(req: Request, res: Response) {
        try {
            const domains = await this.getAllDomainsUseCase.execute();
            res.status(200).json({ message: "Domains retrieved successfully", domains });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async getDomainById(req: Request, res: Response) {
        try {
            const domainId = req.params.id;
            const domain = await this.getDomainByIdUseCase.execute(domainId);
            if (!domain) {
                return res.status(404).json({ message: "Domain not found" });
            }
            res.status(200).json({ message: "Domain retrieved successfully", domain });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }


    async updateDomain(req: Request, res: Response) {
        try {
            const domainId = req.params.id;
            const updateData = req.body;
            const updatedDomain = await this.updateDomainUseCase.execute(domainId, updateData);
            if (!updatedDomain) {
                return res.status(404).json({ message: "Domain not found" });
            }
            res.status(200).json({ message: "Domain updated successfully", updatedDomain });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async deleteDomain(req: Request, res: Response) {
        try {
            const domainId = req.params.id;
            const status = req.body.status;
            const domain = await this.deleteDomainUseCase.execute(domainId, status);
            if (!domain) {
                return res.status(404).json({ message: "Domain not found" });
            }
            res.status(200).json({ message: "Domain details retrieved successfully", domain });
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