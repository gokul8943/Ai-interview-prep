import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class deleteTopic {
    constructor(
        private cmsRepository: CmsRepository
    ) { }   

    async execute(topicId: string, status: boolean): Promise<void> {
        return this.cmsRepository.deleteTopic(topicId, status);
    }
}