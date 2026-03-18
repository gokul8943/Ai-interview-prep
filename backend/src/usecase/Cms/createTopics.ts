import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class createTopics {
    constructor(
        private cmsRepository: CmsRepository
    ) { }   

    async execute(topicData: any): Promise<any> {
        return this.cmsRepository.createTopic(topicData);
    }
}