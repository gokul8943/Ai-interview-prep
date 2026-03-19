import { Router } from "express";
import { CmsController } from "../controllers/CmsController";
import { createDomain } from "../../usecase/Cms/createDomain";
import { getAllDomains } from "../../usecase/Cms/getAllDomains";
import { getDomainById } from "../../usecase/Cms/getDomainById";
import { updateDomain } from "../../usecase/Cms/updateDomain";
import { deleteDomain } from "../../usecase/Cms/deleteDomain";
import { createTopics } from "../../usecase/Cms/createTopics";
import { createlevel } from "../../usecase/Cms/createlevel";
import { CmsRepositoryImpl } from "../repositories/CmsRepositoryImpl";
import { authMiddleware } from "../middleware/userAuth";
import DomainModel from "../../framework/models/domainModel";
import TopicModel from "../../framework/models/topicModel";


const cmsRepository = new CmsRepositoryImpl(DomainModel, TopicModel);
const createDomainUseCase = new createDomain(cmsRepository);
const getAllDomainsUseCase = new getAllDomains(cmsRepository);
const getDomainByIdUseCase = new getDomainById(cmsRepository);
const updateDomainUseCase = new updateDomain(cmsRepository);
const deleteDomainUseCase = new deleteDomain(cmsRepository);
const createTopicUseCase = new createTopics(cmsRepository);
const createLevelUseCase = new createlevel(cmsRepository);
const cmsController = new CmsController(createDomainUseCase, getAllDomainsUseCase, getDomainByIdUseCase, updateDomainUseCase, deleteDomainUseCase, createTopicUseCase, createLevelUseCase);

const router = Router();

router.post('/v1/domain/create', authMiddleware, cmsController.createDomain.bind(cmsController))

router.get('/v1/domain/all', authMiddleware, cmsController.getAllDomains.bind(cmsController))

router.get('/v1/domain/:id', authMiddleware, cmsController.getDomainById.bind(cmsController))

router.put('/v1/domain/update/:id', authMiddleware, cmsController.updateDomain.bind(cmsController))

router.delete('/v1/domain/delete/:id', authMiddleware, cmsController.deleteDomain.bind(cmsController))


router.post('/v1/topic/create', authMiddleware, cmsController.createTopic.bind(cmsController))

router.post('/v1/level/create', authMiddleware, cmsController.createLevel.bind(cmsController))

export default router
