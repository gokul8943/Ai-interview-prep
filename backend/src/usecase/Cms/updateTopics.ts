import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class updateTopics {
    constructor(
        private cmsRepository: CmsRepository
    ) { }

    async execute(topicId: string, updateData: any): Promise<void> {
        return this.cmsRepository.updateTopic(topicId, updateData);
    }
}