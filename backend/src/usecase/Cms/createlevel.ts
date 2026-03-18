import { CmsRepository } from "../../adapters/interfaces/CmsRepository";


export class createlevel {
    constructor(
        private cmsRepository: CmsRepository
    ) { }   
    async execute(levelData: any): Promise<any> {
        return this.cmsRepository.createLevel(levelData);
    }
}