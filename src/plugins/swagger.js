const { readFileSync } = require('fs')
const fp = require('fastify-plugin')
const Swagger = require('@fastify/swagger')
const SwaggerUI = require('@fastify/swagger-ui')
const path = require('path')
const { version } = JSON.parse(readFileSync(path.join(__dirname, '../../package.json')))
const NODE_ENV = 'dev'
async function swaggerGenerator (fastify, opts) {
  // Swagger documentation generator for Fastify.
  // It uses the schemas you declare in your routes to generate a swagger compliant doc.
  // https://github.com/fastify/fastify-swagger
  await fastify.register(Swagger, {
    swagger: {
      info: {
        title: 'Fastify URL Shortener',
        description: 'Fastify URL Shortener documentation',
        version
      },
      externalDocs: {
        url: 'https://github.com/delvedor/fastify-example',
        description: 'Find more info here'
      },
      host: 'localhost', // and your deployed url
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json', 'text/html'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Bearer',
          in: 'header'
        },
        Csrf: {
          type: 'apiKey',
          name: 'x-csrf-token',
          in: 'header'
        }
      }
    },
    // let's expose the documentation only in development
    // it's up to you decide who should see this page,
    // but it's alwaysx better to start safe.
    exposeRoute: NODE_ENV !== 'production'
  })

  if (NODE_ENV !== 'production') {
    await fastify.register(SwaggerUI, {
      routePrefix: '/documentation'
    })
  }
}

module.exports = fp(swaggerGenerator, {
  name: 'swaggerGenerator'
})