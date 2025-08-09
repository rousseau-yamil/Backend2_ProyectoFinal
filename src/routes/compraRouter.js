import { Router } from 'express';
import passport from 'passport';
import { generatePurchase } from '../controller/purchaseController.js';

const router = Router();

router.post('/checkout', passport.authenticate('jwt', { session: false }), generatePurchase);

export default router;
