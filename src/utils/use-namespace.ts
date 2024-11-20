const namespace = 'ui'
const conditionPrefix = 'is'

function bem(block: string, element?: string, modifier?: string) {
	let result = `${namespace}-${block}`

	if (element) {
		result += '__' + element
	}

	if (modifier) {
		result += '_' + modifier
	}

	return result
}

export function useNamespace(blockName: string) {
	function is(name: string, condition: boolean = true) {
		return condition ? conditionPrefix + '-' + name : ''
	}

	function m(modifier: string) {
		return modifier ? bem(blockName, '', modifier) : ''
	}

	function e(element: string) {
		return element ? bem(blockName, element, '') : ''
	}

	function em(element: string, modifier: string) {
		return bem(blockName, element, modifier)
	}

	function b() {
		return bem(blockName, '', '')
	}

	// function component() {
	// 	return `${upperFirst(namespace)}${upperFirst(blockName)}`
	// }

	return {
		is,
		bem,
		m,
		b,
		e,
		em
		//component
	}
}
