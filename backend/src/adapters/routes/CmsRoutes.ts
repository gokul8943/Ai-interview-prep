import { Router } from "express";
import { CmsController } from "../controllers/CmsController";
import { createDomain } from "../../usecase/Cms/createDomain";
import { createTopics } from "../../usecase/Cms/createTopics";
import { createlevel } from "../../usecase/Cms/createlevel";
import { CmsRepositoryImpl } from "../repositories/CmsRepositoryImpl";
import { authMiddleware } from "../middleware/userAuth";
import DomainModel from "../../framework/models/domainModel";
import TopicModel from "../../framework/models/topicModel";


const cmsRepository = new CmsRepositoryImpl(DomainModel, TopicModel);
const createDomainUseCase = new createDomain(cmsRepository);
const createTopicUseCase = new createTopics(cmsRepository);
const createLevelUseCase = new createlevel(cmsRepository);
const cmsController = new CmsController(createDomainUseCase, createTopicUseCase, createLevelUseCase);

const router = Router();

router.post('/v1/domain/create', authMiddleware, cmsController.createDomain.bind(cmsController))

router.post('/v1/topic/create', authMiddleware, cmsController.createTopic.bind(cmsController))

router.post('/v1/level/create', authMiddleware, cmsController.createLevel.bind(cmsController))

export default router
