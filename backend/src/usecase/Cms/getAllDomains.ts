

import { CmsRepository } from "../../adapters/interfaces/CmsRepository";

export class getAllDomains {
    constructor(
        private cmsRepository: CmsRepository
    ) { }
    async execute(): Promise<any> {
        return this.cmsRepository.getAllDomains();
    }
}
