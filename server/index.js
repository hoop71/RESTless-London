import { ApolloServer, gql } from 'apollo-server'
import models from 'db/models'

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

const resolvers = {
	Query: {
		getAllSolarSystems: async (parent, args, { models }) => await models.SolarSystems.findAll(),
	},
	SolarSystem: {
		planets: async (parent, args, { models }) => {
			const planets = await models.Planets.findAll({ where: { solarSystemId: parent.id } })
			return planets
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: { models },
})

models.sequelize.sync()

export default server
