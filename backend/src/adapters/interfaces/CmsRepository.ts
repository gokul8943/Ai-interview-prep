export interface CmsRepository {
    createDomain(domainData: any): Promise<any>;
    createTopic(topicData: any): Promise<any>;
    createLevel(levelData: any): Promise<any>;
}