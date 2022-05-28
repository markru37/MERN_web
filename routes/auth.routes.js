const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post(
    '/register',
    [
        check('email', 'Please enter a current email').isEmail(),
        check('password', 'Min length password 6 symbols').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data',
                }); // отправка ошибок на фронт
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email }); // поиск юзера по почте
            if (candidate) {
                res.status(400).json({ message: 'User already exists' }); //проверка если юзер с такой почтой уже есть, то вывод сообщения
            }
            const hashedPassword = await bcrypt.hash(password, 12); // хеширование пароля

            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'User created' });
        } catch (e) {
            res.status(500).json({ message: 'Error, try again' });
        }
    },
);

router.post(
    '/login',
    [
        check('email', 'Please enter a current email').normalizeEmail().isEmail(), // привод почты к нормальному виду, проверка на то что это почта
        check('password', 'Enter password').exists(), //  пароль должен существовать
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data',
                });
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User is not found' });
            }

            const isCoincidence = await bcrypt.compare(password, user.password);

            if (!isCoincidence) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
                expiresIn: '1h',
            });
            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: 'Error, try again' });
        }
    },
);

module.exports = router;
