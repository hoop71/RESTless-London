import Sequelize from 'sequelize'
import chalk from 'chalk'

const db_name = 'restless'
const sequelize = new Sequelize(db_name, null, null, {
	storage: 'db/restless.sqlite3',
	dialect: 'sqlite',
	typeValidation: true,
	logging: (log, benchmark) => {
		console.table(`${chalk.blue(log)} in ${chalk.bold.magenta(`${benchmark}ms`)}`)
	},
	benchmark: true,
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
