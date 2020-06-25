// Server
import { ApolloServer, gql } from 'apollo-server'

// DB
import models from 'db/models'

// Utils
import _ from 'lodash'
import DataLoader from 'dataloader'

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
		getAllPlanetsByIds: [Planet]
	}
`
// Resolvers
const resolvers = {
	Query: {
		getAllSolarSystems: async (parent, args, { models }) => await models.SolarSystems.findAll(),
		getAllPlanetsByIds: async (parent, args, { models }) => {
			return await models.Planets.findAll({ where: { solarSystemId: [1, 2] } })
		},
	},
	SolarSystem: {
		planets: async (parent, args, context) => {
			return context.planetsLoader.load(parent.id)
		},
	},
}

// Server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return {
			planetsLoader: new DataLoader(async (keys) => {
				// Load all planets that has a cooresponding solarSystemId
				const planets = await models.Planets.findAll({ where: { solarSystemId: keys } })

				// Create a map to ogranize them by solarSystemId
				const planetMap = {}
				planets.forEach(({ dataValues: planetData }) => {
					// If the key exists, concat, otherwise, make an array with planetData
					_.set(planetMap, planetData.solarSystemId, _.get(planetMap, planetData.solarSystemId, []).concat(planetData))
				})
				return keys.map((key) => planetMap[key])

				// Alternate method with reduce, only one loop over the data but harder to quickly reason about
				// return _.compact(
				// 	planets.reduce((acc, { dataValues: planetData }) => {
				// If the key exists, concat, otherwise, make an array with planetData
				// 		_.set(acc, planetData.solarSystemId, _.get(acc, planetData.solarSystemId, []).concat(planetData))
				// 		return acc
				// 	}, [])
				// )
			}),
			models,
		}
	},
})

// Sync DB
models.sequelize.sync()

export default server
