const express = require('express');
const { register, login, logout } = require("../controllers/AuthController");
const { verifyAuth } = require('../middlewares/authorization');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyAuth,logout);

module.exports = router;
