import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class getAllTopics {
    constructor(
        private cmsRepository: CmsRepository
    ) { }   

    async execute(): Promise<any> {
        return this.cmsRepository.getAllTopics();
    }
}