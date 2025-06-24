const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/models');

// GET /users/ → return all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const loged_user = await User.findOne({where: {name: username, password: password}})
  const role = loged_user.role
  const user_id = loged_user.id

  if (loged_user){
    // Encodage du JWT dans un variable d'environement JWT_SECRET
    const jwtToken = jwt.sign({ username, role: role, user_id: user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    // Stockage du JWT dans un cookie HttpOnly
    res.cookie("jwtToken", jwtToken, {httpOnly: true, secure: false});
    res.json(jwtToken)
  } else {
    res.status(401).json({message: "Authentification echoer"})
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.redirect('/auth/users');
})


module.exports = router;
