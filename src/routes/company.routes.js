const express = require("express");
const router = express.Router();
const controller = require("../controllers/company.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company Management
 */

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create new company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [companyName, companyEmail]
 *             properties:
 *               companyName:
 *                 type: string
 *               companyEmail:
 *                 type: string
 *               contactPerson:
 *                 type: string
 *               country:
 *                 type: string
 *               about:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  controller.createCompany
);

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get company list
 *     tags: [Company]
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
 *     responses:
 *       200:
 *         description: Company list
 */
router.get("/", protect, controller.getCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, controller.getCompanyById);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Update company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  controller.updateCompany
);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Soft delete company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  controller.deleteCompany
);

module.exports = router;
