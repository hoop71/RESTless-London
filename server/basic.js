// Server
import { ApolloServer, gql } from 'apollo-server'

// DB
import models from 'db/models'

// TypeDefs
const typeDefs = gql`
  type Planet {
    id: ID!
    name: String!
  }

  type SolarSystem {
    id: ID!
    name: String!
    planets: [Planet]
  }

  type Query {
    getAllSolarSystems: [SolarSystem]
  }
`
// Resolvers
const resolvers = {
  Query: {
    getAllSolarSystems: async (parent, args, { models }) =>
      await models.SolarSystems.findAll({ limit: 10 })
  },
  SolarSystem: {
    planets: async (parent, args, { models }) => {
      return await models.Planets.findAll({ where: { solarSystemId: parent.id } })
    }
  }
}

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})

// Sync DB
models.sequelize.sync()

export default server
