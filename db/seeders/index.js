'use strict'

const faker = require('faker')
const _ = require('lodash')

const NUMBER_OF_SOLAR_SYSTEMS = 10

const makePlanets = (solarSystemId) =>
	_.times(_.random(1, 10), () => ({
		name: _.startCase(faker.random.word()),
		solarSystemId: solarSystemId + 1, // sequelize starts numbering at 1 not 0
	}))

module.exports = {
	up: (queryInterface /*, Sequelize */) => {
		queryInterface.bulkInsert(
			'SolarSystems',
			_.times(NUMBER_OF_SOLAR_SYSTEMS, () => ({
				name: _.startCase(faker.random.words()),
			})),
			{}
		)

		return queryInterface.bulkInsert(
			'Planets',
			_.flatten(_.times(NUMBER_OF_SOLAR_SYSTEMS, (index) => makePlanets(index))),
			{}
		)
	},

	down: (queryInterface /*, Sequelize */) => {
		queryInterface.bulkDelete('SolarSystems', null, {})
		return queryInterface.bulkDelete('Planets', null, {})
	},
}
