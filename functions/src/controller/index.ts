import { Router } from 'express';
import { getItem } from './controller';
import {
  validateParams,
  validateQuery,
} from '../lib/middleware/validation.middleware';
import { ItemParamDto, OptionQueryDto } from '../dto';

const router = Router();

router.get(
  '/item/:itemId/option/:optionId',
  validateParams(ItemParamDto),
  validateQuery(OptionQueryDto),
  getItem,
);

export default router;
