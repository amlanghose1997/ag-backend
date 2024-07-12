const healthRequest = async(server) => {
    console.log(server)
    // server.addHook('onRoute', ()=> console.log('registered'))
    const healthCheckRouteSchema = {
        tags: ['health-check']
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

module.export = healthRequest