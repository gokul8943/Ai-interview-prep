import { Router } from "express";
import { CmsController } from "../controllers/cms.controller";

import { createDomain } from "../../usecase/Cms/createDomain";
import { getAllDomains } from "../../usecase/Cms/getAllDomains";
import { getDomainById } from "../../usecase/Cms/getDomainById";
import { updateDomain } from "../../usecase/Cms/updateDomain";
import { deleteDomain } from "../../usecase/Cms/deleteDomain";

import { createTopics } from "../../usecase/Cms/createTopics";

import { getAllTopics } from "../../usecase/Cms/getAllTopics";
import { getTopicById } from "../../usecase/Cms/getTopicById";
import { updateTopics } from "../../usecase/Cms/updateTopics";
import { deleteTopic } from "../../usecase/Cms/deleteTopic";

import { createlevel } from "../../usecase/Cms/createlevel";

import { CmsRepositoryImpl } from "../repositories/cms.repositoryImpl";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/requireRole";
import DomainModel from "../../framework/models/domain.model";
import TopicModel from "../../framework/models/topic.model";


const cmsRepository = new CmsRepositoryImpl(DomainModel, TopicModel);

const createDomainUseCase = new createDomain(cmsRepository);
const getAllDomainsUseCase = new getAllDomains(cmsRepository);
const getDomainByIdUseCase = new getDomainById(cmsRepository);
const updateDomainUseCase = new updateDomain(cmsRepository);
const deleteDomainUseCase = new deleteDomain(cmsRepository);

const createTopicUseCase = new createTopics(cmsRepository);
const getAllTopicsUseCase = new getAllTopics(cmsRepository);
const getTopicByIdUseCase = new getTopicById(cmsRepository);
const updateTopicUseCase = new updateTopics(cmsRepository);
const deleteTopicUseCase = new deleteTopic(cmsRepository);

const createLevelUseCase = new createlevel(cmsRepository);
const cmsController = new CmsController(createDomainUseCase, getAllDomainsUseCase, getDomainByIdUseCase, updateDomainUseCase, deleteDomainUseCase, createTopicUseCase, getAllTopicsUseCase, getTopicByIdUseCase, updateTopicUseCase, deleteTopicUseCase,createLevelUseCase);

const router = Router();

router.use(authMiddleware, requireRole("admin"));

router.post('/v1/domain/create', cmsController.createDomain.bind(cmsController))

router.get('/v1/domain/all', cmsController.getAllDomains.bind(cmsController))

router.get('/v1/domain/:id', cmsController.getDomainById.bind(cmsController))

router.put('/v1/domain/update/:id', cmsController.updateDomain.bind(cmsController))

router.delete('/v1/domain/delete/:id', cmsController.deleteDomain.bind(cmsController))

router.post('/v1/topic/create', cmsController.createTopic.bind(cmsController))

router.get('/v1/topic/all', cmsController.getAllTopics.bind(cmsController))

router.get('/v1/topic/:id', cmsController.getTopicById.bind(cmsController))

router.post('/v1/topic/update/:id', cmsController.updateTopic.bind(cmsController))

router.delete('/v1/topic/delete/:id', cmsController.deleteTopic.bind(cmsController))

router.post('/v1/level/create', cmsController.createLevel.bind(cmsController))

export default router
