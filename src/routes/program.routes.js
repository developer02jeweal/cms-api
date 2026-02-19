const express = require("express");
const router = express.Router();
const controller = require("../controllers/program.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Program
 *   description: Program Master Management
 */

/**
 * @swagger
 * /api/programs:
 *   post:
 *     summary: Create new program
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, code]
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               currentVersion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Program created
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  controller.createProgram
);

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Get program list
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 */
router.get("/", protect, controller.getPrograms);

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Get program by ID
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, controller.getProgramById);

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     summary: Update program
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  controller.updateProgram
);

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     summary: Soft delete program
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  controller.deleteProgram
);

module.exports = router;
