const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { checkApiKey } = require('../middlewares/auth.handler');
const { sendEmailSchema } = require('../schemas/email.schema')
const NodeMailerService = require('../services/nodemailer.service');
const service = new NodeMailerService();

router.post('/recovery/password',
    validatorHandler(sendEmailSchema, 'body'),
    checkApiKey,
    async (req, res, next) => {
        try {
            emailBody = req.body;
            const variable = {user: 'emailUser', pass: 'emailPassword'};         
            res.json(await service.sendMail(emailBody, variable));
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;
