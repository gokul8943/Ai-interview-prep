import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class createDomain {
    constructor(
        private cmsRepository: CmsRepository
    ) { }   
    async execute(domainData: any): Promise<any> {
        return this.cmsRepository.createDomain(domainData);
    }   
}