const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Admin API",
      version: "1.0.0",
      description: "API documentation for the Admin project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3400}`,
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            productName: {
              type: "string",
              example: "Microwave",
            },
            productImage: {
              type: "string",
              example: "http://localhost:3400/uploads/image.jpg",
            },
            productDescription: {
              type: "string",
              example: "A high-quality microwave",
            },
            categoryId: {
              type: "string",
              example: "66a3705bda801e63666954b4",
            },
          },
          required: [
            "productName",
            "productImage",
            "productDescription",
            "categoryId",
          ],
        },
        Category:{
            type: "object",
            properties:{
                name:{
                    type: "string",
                    example: "Electronics"
                }
            },
            required: [
                "name"
            ]
        }
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
