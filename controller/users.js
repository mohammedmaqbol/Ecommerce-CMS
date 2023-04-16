import User from '../models/users.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createUser = async (req, res) => {

    // Hashe a plain text password
    const { username, email, password } = req.body;
    if (!username || !email || !password) { return res.status(400).json({ message: 'Username OR Email OR Passowrd is EMPTY :(' }) }
    const hashPassword = (password) => {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return { salt, hash };
    }

    try {
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) { return res.status(400).json({ message: 'User already exists' }) }
        const { salt, hash } = hashPassword(password);
        const user = await User.create({ username, email, password: hash });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ user, token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // update the user's data
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            // if the password doesn't match, rehash it with a new salt and update the user in the database
            const newHash = await bcrypt.hash(password, 10);
            user.password = newHash;
            await user.save();
            return res.status(401).json({ message: 'Invalid email or password' });

        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
