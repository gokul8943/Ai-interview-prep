import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class updateDomain {
    constructor(
        private cmsRepository: CmsRepository
    ) { }
    async execute(id: string, updateData: any): Promise<any> {
        return this.cmsRepository.updateDomain(id, updateData);
    }
}