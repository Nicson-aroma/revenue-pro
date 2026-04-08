import { Router } from 'express';
import { createLead, deleteLead, getLeads, updateLead } from '../controllers/leadController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createLead);
router.get('/', requireAuth, getLeads);
router.patch('/:id', requireAuth, updateLead);
router.delete('/:id', requireAuth, deleteLead);

export default router;
