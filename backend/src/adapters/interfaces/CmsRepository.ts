export interface CmsRepository {

    createDomain(domainData: any): Promise<any>;
    getAllDomains(): Promise<any>;
    getDomainById(id: string): Promise<any>;
    updateDomain(id: string, updateData: any): Promise<any>;
    deleteDomain(domainId: string, status: boolean): Promise<any>;

    createTopic(topicData: any): Promise<any>;
    getAllTopics(): Promise<any>;
    getTopicById(id: string): Promise<any>;
    updateTopic(topicId: string, updateData: any): Promise<any>;
    deleteTopic(topicId: string, status: boolean): Promise<any>;

    createLevel(levelData: any): Promise<any>;
}