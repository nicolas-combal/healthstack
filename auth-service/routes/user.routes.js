const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { auth, authDoctor } = require('../middleware/auth');

const User = require('../models/models');

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




/**
 * @openapi
 * /allusers:
 *   get:
 *     summary: Get all users with role "user"
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users with role "user"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "8a7c6b60-0a0b-4eae-8de5-9b22d2f5ec52"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *       500:
 *         description: Internal server error
 */
router.get('/patients',authDoctor, async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 'user' },
      attributes: ['id', 'name']
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/**
 * @swagger
 * /auth/users/name/{id}:
 *   get:
 *     summary: Récupérer uniquement le nom d’un utilisateur via son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID de l'utilisateur
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Nom récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: nico
 */
router.get('/name/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId, {
      attributes: ['name']
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user); // ou res.json({ name: user.name }) si tu veux plus simple
  } catch (err) {
    res.status(500).json({ error: `Database error ${err}` });
  }
});





router.get("/check", (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Valid", user: decoded });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

/**
 * @openapi
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: "user"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - User already exists or validation error
 *       500:
 *         description: Internal server error
 */
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, role = "user" } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({
      where: { name: username }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name: username,
      password: hashedPassword,
      email: email,
      role: role
    });

    const jwtToken = jwt.sign(
        { username: newUser.name, role: newUser.role, user_id: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token: jwtToken
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login a user and return JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       401:
 *         description: Authentication failed
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const loged_user = await User.findOne({
      where: { name: username }
    });

    if (!loged_user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isValidPassword = await bcrypt.compare(password, loged_user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const role = loged_user.role;
    const user_id = loged_user.id;

    const jwtToken = jwt.sign(
        { username, role, user_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000
    });
    res.json(jwtToken);

  } catch (err) {
    console.error("Connexion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @openapi
 * /users/logout:
 *   get:
 *     summary: Logout a user and clear the cookie
 *     responses:
 *       302:
 *         description: Redirect after logout
 */
router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
  });
  res.status(200).json({ message: "Logged out" });
})


module.exports = router;
