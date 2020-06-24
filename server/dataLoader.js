import { ApolloServer, gql } from 'apollo-server'
import models from 'db/models'
import DataLoader from 'dataloader'

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
		planets: async (parent, args, context) => {
			return context.planetsLoader.load(parent.id)
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({
		planetsLoader: new DataLoader(async (keys) => {
			console.log(`keys`, keys)
			const planets = await models.Planets.findAll({ where: { solarSystemId: [keys] } })
			console.log(planets)
			return planets
		}),
		models,
	}),
})

models.sequelize.sync()

export default server
