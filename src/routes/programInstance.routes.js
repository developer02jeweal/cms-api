const express = require("express");
const router = express.Router();
const controller = require("../controllers/programInstance.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

/**
 * @swagger
 * tags:
 *   name: ProgramInstance
 *   description: Company Program License Management
 */

/**
 * @swagger
 * /api/program-instances:
 *   post:
 *     summary: Create program instance
 *     tags: [ProgramInstance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Instance created
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  controller.createInstance
);

/**
 * @swagger
 * /api/program-instances:
 *   get:
 *     summary: Get program instances
 *     tags: [ProgramInstance]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", protect, controller.getInstances);

/**
 * @swagger
 * /api/program-instances/{id}:
 *   get:
 *     summary: Get program instance by ID
 *     tags: [ProgramInstance]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, controller.getInstanceById);

/**
 * @swagger
 * /api/program-instances/{id}:
 *   put:
 *     summary: Update program instance
 *     tags: [ProgramInstance]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  controller.updateInstance
);

/**
 * @swagger
 * /api/program-instances/{id}:
 *   delete:
 *     summary: Soft delete program instance
 *     tags: [ProgramInstance]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  controller.deleteInstance
);

module.exports = router;
