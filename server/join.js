// Apollo
import { ApolloServer, gql } from 'apollo-server'

// DB
import models from 'db/models'

// Utils
import { getFieldNames, formatResults } from 'server/utils'

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
		getAllSolarSystemsConditionally: [SolarSystem]
	}
`

// Resolvers
const resolvers = {
	Query: {
		getAllSolarSystems: async (parent, args, { model }) => {
			// `SELECT * FROM SolarSystems LEFT JOIN Planets ON SolarSystems.id = Planets.solarSystemId`
			const solarSystems = await models.SolarSystems.findAll({
				include: [
					{
						model: models.Planets,
						required: true,
					},
				],
			})
			return formatResults(solarSystems)
		},
		getAllSolarSystemsConditionally: async (parent, args, { models }, info) => {
			// Base Query: `SELECT * FROM SolarSystems`

			let conditionalJoin = {}
			// If planets is issued in the query, join the table

			if (getFieldNames(info).has('planets')) {
				// Augment Base Query
				// `SELECT * FROM SolarSystems LEFT JOIN Planets ON SolarSystems.id = Planets.solarSystemId`
				conditionalJoin = {
					include: [
						{
							model: models.Planets,
							required: true,
						},
					],
				}
			}
			const solarSystems = await models.SolarSystems.findAll(conditionalJoin)
			return formatResults(solarSystems)
		},
	},
}

// Server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: { models },
})

// Sync DB
models.sequelize.sync()

export default server
