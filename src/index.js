const serverConfig = require('./server')
const Fastify = require('fastify')

const config = {
  fastify: {
    logger: { level: 'info'}
  },
  server: {
    host: '127.0.0.1',
    port: 8802
  }
}

process.on('unhandleRejection', (err)=> {
  console.log(err)
  process.exit(1)
})
const start = async () => {
  const server = Fastify({ logger: 'info' })
  server.register(serverConfig, config)
  try {
    
    await server.listen(config.server)
    server.swagger()
    console.log(server.routes)
    server.log.info('server got started successfully')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()