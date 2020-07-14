import server from 'server'

import _ from 'lodash'
const serverType = _.last(process.argv)

const PORT = 5000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server '${serverType}' ready at ${url}`)
})

// Sequelize CLI Commands
// https://github.com/sequelize/cli
