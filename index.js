import server from 'server'

const PORT = 5001

server.listen({ port: PORT }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})

// Sequelize CLI Commands
// https://github.com/sequelize/cli
