// utils
import _ from 'lodash'

// CONSTS
const PATH_TO_SELECTIONS = [`fieldNodes`, `0`, `selectionSet`, `selections`]
const PATH_TO_FIELD_VALUES = [`name`, `value`]

/**
 *
 * @param {object[]} results
 * Returns results formatted as expected by GraphQL TypeDefs
 */
export const formatResults = (results) => {
	return results.map(({ dataValues }) => ({
		...dataValues,
		planets: dataValues.Planets,
	}))
}

/**
 *
 * @param {object} info from GraphQL context.info
 *
 * Returns {Set<string>} a set of all fields issued in the query
 */
export const getFieldNames = (info) => {
	const fieldNames = new Set()
	_.get(info, PATH_TO_SELECTIONS, []).forEach((field) => {
		fieldNames.add(_.get(field, PATH_TO_FIELD_VALUES))
	})
	return fieldNames
}
