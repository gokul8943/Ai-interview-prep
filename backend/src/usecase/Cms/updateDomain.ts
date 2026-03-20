import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class updateDomain {
    constructor(
        private cmsRepository: CmsRepository
    ) { }
    async execute(id: string, updateData: any): Promise<void> {
        return this.cmsRepository.updateDomain(id, updateData);
    }
}