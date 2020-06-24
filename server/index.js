import _ from 'lodash'
const serverType = _.last(process.argv)
import server from './basic'
import dataloader from './dataLoader'

if (serverType === 'dataloader') {
	module.exports = dataloader
} else {
	module.exports = server
}
