import Sequelize from 'sequelize'

const db_name = 'restless'
const sequelize = new Sequelize(db_name, null, null, {
	storage: 'db/restless.sqlite3',
	dialect: 'sqlite',
	typeValidation: true,
})

const db = {
	Planets: sequelize.import('./planets'),
	SolarSystems: sequelize.import('./solarSystems'),
}

Object.keys(db).forEach((modelName) => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
export default db
