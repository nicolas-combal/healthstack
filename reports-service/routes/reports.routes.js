const express = require('express');
const router = express.Router();
const Report = require('../models/report'); // Your Sequelize model
const reportController = require('../controllers/report')
const { auth, authDoctor } = require('../middleware/auth')

router.get('/',auth,  async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Tous les rapport d'un docteur
router.get("/doctor", authDoctor, reportController.list)

// Detail d'un ropport
router.get("/:id", authDoctor, reportController.read)

// Creer un rapport
router.post("/", authDoctor, reportController.create)

// Modifier un rapport
router.put("/:id", authDoctor, reportController.update)

// Suprimer un rapport
router.delete("/:id", authDoctor, reportController.remove)


module.exports = router;
