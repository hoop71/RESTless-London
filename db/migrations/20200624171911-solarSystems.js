'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('SolarSystems', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
		})
	},

	down: (queryInterface /*, Sequelize */) => {
		return queryInterface.dropTable('SolarSystems')
	},
}
