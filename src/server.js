const fastifySwagger = require('@fastify/swagger');
const sensible = require('@fastify/sensible');
const cors = require('@fastify/cors');
const autoLoad = require('@fastify/autoload');
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fp = require('fastify-plugin')
const path = require('path')
const UnderPressure = require('@fastify/under-pressure')


const swaggerUiOptions = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
};

const swaggerConfig = {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    urityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  }
}

const serverConfig = async (server, config) => {
    await server
      .register(sensible)
      .register(cors, {
        origin: true,
        credentials: true,
        exposedHeaders: ['content-disposition']
      })
      .register(require('@fastify/routes'))
      await server.register(UnderPressure, {
        maxEventLoopDelay: 1000,
        maxHeapUsedBytes: 1000000000,
        maxRssBytes: 1000000000,
        maxEventLoopUtilization: 0.98
      })

      
    
    
      // Normally you would need to load by hand each plugin. `fastify-autoload` is an utility
      // we wrote to solve this specific problems. It loads all the content from the specified
      // folder, even the subfolders. Take at look at its documentation, as it's doing a lot more!
      // First of all, we require all the plugins that we'll need in our application.
      
      // .register(require('./routes/users'), { prefix: '/v1' })
      await server.register(autoLoad, {
        dir: path.join(__dirname, 'routes'),
        maxDepth: 4,
        prefix: 'api/v1',
        options: Object.assign({}, config)
      })
      await server.register(autoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, config)
      })
  
      return server
      // .register(autoLoad, {
      //   dir: path.join(__dirname, 'routes'),
      //   options: config
      // })
      
  }
module.exports = fp(serverConfig)