const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const reportController = require('../controllers/report');
const { auth, authDoctor } = require('../middleware/auth');

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get all reports
 *     responses:
 *       200:
 *         description: List of all reports
 */
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @openapi
 * /doctor:
 *   get:
 *     summary: Get reports of a specific doctor
 *     responses:
 *       200:
 *         description: Doctor-specific reports
 */
router.get("/doctor", authDoctor, reportController.list);


/**
 * @openapi
 * /patient:
 *   get:
 *     summary: Get reports of a specific patient
 *     responses:
 *       200:
 *         description: Patient-specific reports
 */
router.get("/patient", auth, reportController.listpatient);


/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Get a report by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single report data
 */
router.get("/:id", authDoctor, reportController.read);

/**
 * @openapi
 * /:
 *   post:
 *     summary: Create a new report
 *     responses:
 *       201:
 *         description: Report created
 */
router.post("/", authDoctor, reportController.create);

/**
 * @openapi
 * /{id}:
 *   put:
 *     summary: Update a report
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Report updated
 */
router.put("/:id", authDoctor, reportController.update);

/**
 * @openapi
 * /{id}:
 *   delete:
 *     summary: Delete a report
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Report deleted
 */
router.delete("/:id", authDoctor, reportController.remove);

module.exports = router;
