import { Request, Response } from "express";

import { createDomain } from "../../usecase/Cms/createDomain";
import { getAllDomains } from "../../usecase/Cms/getAllDomains";
import { getDomainById } from "../../usecase/Cms/getDomainById";
import { updateDomain } from "../../usecase/Cms/updateDomain";
import { deleteDomain } from "../../usecase/Cms/deleteDomain";

import { createTopics } from "../../usecase/Cms/createTopics";

import { getAllTopics } from "../../usecase/Cms/getAllTopics";
import { getTopicById } from "../../usecase/Cms/getTopicById";
import { updateTopics } from "../../usecase/Cms/updateTopics";
import { deleteTopic } from "../../usecase/Cms/deleteTopic";

import { createlevel } from "../../usecase/Cms/createlevel";


export class CmsController {
    private readonly createDomainUseCase: createDomain;
    private readonly getAllDomainsUseCase: getAllDomains;
    private readonly getDomainByIdUseCase: getDomainById;
    private readonly updateDomainUseCase: updateDomain;
    private readonly deleteDomainUseCase: deleteDomain;

    private readonly createTopicUseCase: createTopics;
    private readonly getAllTopicsUseCase: getAllTopics;
    private readonly getTopicByIdUseCase: getTopicById;
    private readonly updateTopicUseCase: updateTopics;
    private readonly deleteTopicUseCase: deleteTopic;   

    private readonly createLevelUseCase: createlevel;
    constructor(
        createDomainUseCase: createDomain,
        getAllDomainsUseCase: getAllDomains,
        getDomainByIdUseCase: getDomainById,
        updateDomainUseCase: updateDomain,
        deleteDomainUseCase: deleteDomain,

        createTopicUseCase: createTopics,
        getAllTopicsUseCase: getAllTopics,
        getTopicByIdUseCase: getTopicById,
        updateTopicUseCase: updateTopics,
        deleteTopicUseCase: deleteTopic,

        createLevelUseCase: createlevel
    ) {
        this.createDomainUseCase = createDomainUseCase;
        this.getAllDomainsUseCase = getAllDomainsUseCase;
        this.getDomainByIdUseCase = getDomainByIdUseCase;
        this.updateDomainUseCase = updateDomainUseCase;
        this.deleteDomainUseCase = deleteDomainUseCase;

        this.createTopicUseCase = createTopicUseCase;
        this.getAllTopicsUseCase = getAllTopicsUseCase;
        this.getTopicByIdUseCase = getTopicByIdUseCase;
        this.updateTopicUseCase = updateTopicUseCase;
        this.deleteTopicUseCase = deleteTopicUseCase;

        this.createLevelUseCase = createLevelUseCase;
    }
   // Domain CRUD operations
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
   
            res.status(200).json({ message: "Domain details retrieved successfully", domain });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    // Topic CRUD operations

    async createTopic(req: Request, res: Response) {
        try {
            const topicData = req.body;
            const topic = await this.createTopicUseCase.execute(topicData);
            res.status(201).json({ message: "Topic created successfully", topic });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async getAllTopics(req: Request, res: Response) {
        try {
            const topics = await this.getAllTopicsUseCase.execute();
            res.status(200).json({ message: "Topics retrieved successfully", topics });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async getTopicById(req: Request, res: Response) {
        try {
            const topicId = req.params.id;
            const topic = await this.getTopicByIdUseCase.execute(topicId);
  
            res.status(200).json({ message: "Topic retrieved successfully", topic });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async updateTopic(req: Request, res: Response) {
        try {
            const topicId = req.params.id;
            const updateData = req.body;
            const updatedTopic = await this.updateTopicUseCase.execute(topicId, updateData);

            res.status(200).json({ message: "Topic updated successfully", updatedTopic });
        } catch (error) {
            res.status(500).json({ message: "Error in controller", error });
        }
    }

    async deleteTopic(req: Request, res: Response) {
        try {
            const topicId = req.params.id;
            const status = req.body.status;
            const topic = await this.deleteTopicUseCase.execute(topicId, status);
    
            res.status(200).json({ message: "Topic details retrieved successfully", topic });
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