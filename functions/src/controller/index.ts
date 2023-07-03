import { Router } from 'express';
import {
  addEmail,
  getEmails,
  getItem,
  setData,
  updareCoupang,
} from './controller';
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../lib/middleware/validation.middleware';
import { DataBodyDto, ItemParamDto, OptionQueryDto } from '../dto';
import { EmailParamDto } from '../dto/email.param.dto';

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

router.get('/email', getEmails);

router.post('/email/:email', validateParams(EmailParamDto), addEmail);

router.get('/update', updateCoupang);

export default router;
