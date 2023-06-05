import { Router } from 'express';
import { getItem, setData } from './controller';
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../lib/middleware/validation.middleware';
import { DataBodyDto, ItemParamDto, OptionQueryDto } from '../dto';

const router = Router();

router.get(
  '/item/:itemId/option/:optionId',
  validateParams(ItemParamDto),
  validateQuery(OptionQueryDto),
  getItem,
);

router.post(
  '/item/:itemId/option/:optionId',
  validateParams(ItemParamDto),
  validateQuery(OptionQueryDto),
  validateBody(DataBodyDto),
  setData,
);

export default router;
