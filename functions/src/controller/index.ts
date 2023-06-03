import { Router } from 'express';
import { getItem } from './controller';
import { ItemParamDto } from '../dto/item.param.dto';
import { validateParams } from '../lib/middleware/validation.middleware';

const router = Router();

router.get(
  '/item/:itemId/option/:optionId',
  validateParams(ItemParamDto),
  getItem,
);

export default router;
