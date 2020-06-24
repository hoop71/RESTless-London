'use strict'
module.exports = (sequelize, DataTypes) => {
	const SolarSystems = sequelize.define(
		'SolarSystems',
		{
			name: DataTypes.STRING,
		},
		{ timestamps: false }
	)
	SolarSystems.associate = (models) => {
		SolarSystems.hasMany(models.Planets, {
			foreignKey: 'solarSystemId',
		})
	}
	return SolarSystems
}
