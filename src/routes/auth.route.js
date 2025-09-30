import express from 'express';
const router = express.Router();

import {
      register,
      login,
      logout,
      foodpartnerregister,
      foodpartnerlogin,
      foodpartnerlogout
} from '../controllers/auth.controller.js';

// ====== USER ROUTES ======
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/logout', logout);

// ====== FOODPARTNER ROUTES ======
router.post('/foodpartner/register', foodpartnerregister);
router.post('/foodpartner/login', foodpartnerlogin);
router.post('/foodpartner/logout', foodpartnerlogout);

export default router;
