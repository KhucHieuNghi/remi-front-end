const express = require('express');
const mongoose = require('mongoose');
const passwordHash = require('password-hash');

const router = express.Router();

const User = mongoose.model('User', { email: String, password: String });

router
    .route('/user')
    .post(async (req, res) => {
        try {
            const { email, password } = req.query;
            const hashedPassword = passwordHash.generate(password);
            const user = new User({ email, password: hashedPassword });

            const result = await user.save();
            return res.json({ status: 200, data: result });
        } catch {
           return res.status(400);
        }
    })
    .put(async (req, res) => {
        try {
            const { email, password } = req.query;
            const hashedPassword = passwordHash.generate(password);
            const user = new User({ email, password: hashedPassword });

            const result = await user.save();
            return res.json({ status: 200, data: result });
        } catch {
           return res.status(400);
        }
    });

const getServerRoutes = (app) => {
    app.use('/api', router);
  };

module.exports = getServerRoutes;
