import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class getTopicById {
    constructor(
        private cmsRepository: CmsRepository
    ) { }   

    async execute(topicId: string): Promise<void> {
        return this.cmsRepository.getTopicById(topicId);
    }
}