const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

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
  const { username, password } = req.body;
  const loged_user = await User.findOne({where: {name: username, password: password}});
  const role = loged_user?.role;
  const user_id = loged_user?.id;

  if (loged_user){
    const jwtToken = jwt.sign({ username, role, user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: false });
    res.json(jwtToken);
  } else {
    res.status(401).json({ message: "Authentification échouée" });
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
  res.clearCookie("jwtToken");
  res.redirect('/auth/users');
});

module.exports = router;
