import express from 'express';

import asyncHandler from '@/lib/async-handler';
import Controller from '@/user/controller';
import Repository from '@/user/repository';
import Service from '@/user/service';

const router = express.Router();

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

router.post('/register', asyncHandler(controller.register));

export default router;
