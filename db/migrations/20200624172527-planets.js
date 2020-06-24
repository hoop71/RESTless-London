'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Planets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			solarSystemId: {
				foriegnKey: true,
				type: Sequelize.INTEGER,
			},
		})
	},

	down: (queryInterface /*, Sequelize */) => {
		return queryInterface.dropTable('Planets')
	},
}
