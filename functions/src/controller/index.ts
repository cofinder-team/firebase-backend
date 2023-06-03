import { Router } from 'express';
import { doTest } from './controller';

const router = Router();

router.get('/', doTest);

export default router;
