const fp = require('fastify-plugin')

const userRequest = async function(server){
    server.addHook('onRoute', ()=> console.log('registered'))
    console.log('user')
    const healthCheckRouteSchema = {
        tags: ['users']
    }

    const healthCheckOptions = {
        schema: {
            ...healthCheckRouteSchema,
            description: 'health check api'
        }
    }

    server.get('/', healthCheckOptions, async (req,res) => {
        return 'Server is healthy & working fine'
    })
}

module.export = userRequest