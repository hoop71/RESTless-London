import { ApolloServer, gql } from 'apollo-server'
import models from 'db/models'
import DataLoader from 'dataloader'
import _ from 'lodash'

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

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return {
			planetsLoader: new DataLoader(async (keys) => {
				const planets = await models.Planets.findAll({ where: { solarSystemId: keys } })

				const planetMap = {}
				planets.forEach(({ dataValues: planetData }) => {
					if (planetMap[planetData.solarSystemId]) {
						planetMap[planetData.solarSystemId] = planetMap[planetData.solarSystemId].concat(planetData)
					} else {
						planetMap[planetData.solarSystemId] = [planetData]
					}
				})
				return keys.map((key) => planetMap[key])

				// Alternate method with reduce, only one loop over the data but harder to quickly reason about
				// return _.compact(
				// 	planets.reduce((acc, { dataValues: planetData }) => {
				// 		if (acc[planetData.solarSystemId]) {
				// 			acc[planetData.solarSystemId] = acc[planetData.solarSystemId].concat(planetData)
				// 		} else {
				// 			acc[planetData.solarSystemId] = [planetData]
				// 		}
				// 		return acc
				// 	}, [])
				// )
			}),
			models,
		}
	},
})

models.sequelize.sync()

export default server
