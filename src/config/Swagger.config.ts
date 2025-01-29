import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Learning',
            version: '1.0.0',
            description: 'API documentation for my E-Learning app'
        },
        servers:[{
            url:'http://localhost:3010',
            description: 'Development server'
        }]
    },
    apis: ['']
}

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express)=>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}