const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "My API Docs",
      version: "1.0.0",
      description: "API documentation for my project",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    // ✅ ADD TAGS HERE
    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Types",
        description: "Types management APIs",
      },
      {
        name: "Category",
        description: "Category management APIs",
      },
      {
        name: "Subcategory",
        description: "Subcategory management APIs",
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
    },

    security: [{ bearerAuth: [] }],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
