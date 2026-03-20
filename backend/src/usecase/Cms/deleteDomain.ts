import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class deleteDomain {
    constructor(
        private cmsRepository: CmsRepository
    ) { }
    async execute(domainId: string, status: boolean): Promise<void> {
        return this.cmsRepository.deleteDomain(domainId, status);
    }
}