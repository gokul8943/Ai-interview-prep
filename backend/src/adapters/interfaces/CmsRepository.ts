export interface CmsRepository {
    createDomain(domainData: any): Promise<any>;
    getAllDomains(): Promise<any>;
    getDomainById(id: string): Promise<any>;
    updateDomain(id: string, updateData: any): Promise<any>;
    createTopic(topicData: any): Promise<any>;
    createLevel(levelData: any): Promise<any>;
}