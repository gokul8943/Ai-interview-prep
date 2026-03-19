import { Model } from "mongoose";
import { IDomain } from "../interfaces/IDomainSchema";
import { ITopic } from "../interfaces/ITopicSchema";
import { CmsRepository } from "../interfaces/CmsRepository";


export class CmsRepositoryImpl implements CmsRepository {
    private readonly DomainModel: Model<IDomain>
    private readonly TopicModel: Model<ITopic>
    constructor(
        domainModel: Model<IDomain>,
        topicModel: Model<ITopic>
    ) {
        this.DomainModel = domainModel;
        this.TopicModel = topicModel;
    }


    async createDomain(domainData: any): Promise<any> {
        try {
            const data = await this.DomainModel.create(domainData);
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }

    async getAllDomains(): Promise<any> {
        try {
            const data = await this.DomainModel.find();
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }

    async getDomainById(id: string): Promise<any> {
        try {
            const data = await this.DomainModel.findById(id);
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }

    async updateDomain(id: string, updateData: any): Promise<any> {
        try {
            const data = await this.DomainModel.findByIdAndUpdate(id, updateData, { new: true });
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }

    async deleteDomain(domainId: string, status: boolean): Promise<any> {
        try {
            const data = await this.DomainModel.findByIdAndUpdate(domainId, { status }, { new: true });
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }


    async createTopic(topicData: any): Promise<any> {
        try {
            const data = await this.TopicModel.create(topicData);
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }

    async createLevel(levelData: any): Promise<any> {
        try {
            const data = await this.TopicModel.create(levelData);
            return data
        }
        catch (error) {
            console.error("An error occurred on CMS repo", error);
            return false;
        }
    }
}