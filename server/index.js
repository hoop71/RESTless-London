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
		solarSystems: [SolarSystem]
	}
`

const resolvers = {
	Query: {
		solarSystems: async () => {
			return []
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
