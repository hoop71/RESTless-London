'use strict'
module.exports = (sequelize, DataTypes) => {
	const Planets = sequelize.define(
		'Planets',
		{
			name: DataTypes.STRING,
		},
		{ timestamps: false }
	)

	return Planets
}
