// Servers
import server from 'server/basic'
import dataloader from 'server/dataloader'
import join from 'server/join'

// Utils
import _ from 'lodash'

// Args
const serverType = _.last(process.argv)

// Hacky way to export the appropriate server :|
export const exportServer = () => {
	switch (serverType) {
		case 'dataloader':
			module.exports = dataloader
			break
		case 'join':
			module.exports = join
			break
		case 'basic':
			module.exports = server
			break
	}
}

exportServer()
