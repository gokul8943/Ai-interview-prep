import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class getDomainById {
    constructor(
        private cmsRepository: CmsRepository
    ) { }
    async execute(id: string): Promise<any> {
        return this.cmsRepository.getDomainById(id);
    }
}