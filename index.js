import server from 'server'

const PORT = 5000

server.listen({ port: PORT }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
