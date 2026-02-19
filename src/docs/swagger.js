const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Center Management System API",
      version: "1.0.0",
      description: "Internal CMS API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Program: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            code: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            currentVersion: { type: "string" },
            isActive: { type: "boolean" },
          },
        },

        ProgramInstance: {
          type: "object",
          properties: {
            _id: { type: "string" },
            program: { type: "string" },
            licenseStart: { type: "string", format: "date" },
            licenseExpire: { type: "string", format: "date" },
            environment: { type: "string" },
            installedVersion: { type: "string" },
            status: { type: "string" },
          },
        },

        PaginationQuery: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 10 },
            search: { type: "string" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
