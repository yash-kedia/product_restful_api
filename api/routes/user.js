const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/user');


router.post('/signup',UserController.user_sign_up);

router.post('/login', UserController.user_log_in);


router.delete('/:userId',UserController.user_delete);





module.exports = router;
