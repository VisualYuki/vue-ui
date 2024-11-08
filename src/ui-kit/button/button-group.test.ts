import {mount} from '@vue/test-utils'

import {expect, it, describe} from 'vitest'
import ButtonGroup from './button-group.vue'

describe('', () => {
	it('default', () => {
		const wrapper = mount(ButtonGroup, {})

		expect(wrapper.classes()).toContain('btn-group')
		expect(wrapper.classes()).not.toContain('btn-group-vertical')
		expect(wrapper.classes()).not.toContain('btn-group-md')
		expect(wrapper.element.tagName).toBe('DIV')
	})

	it('props', () => {
		const wrapper = mount(ButtonGroup, {
			props: {
				vertical: true,
				tag: 'span',
				size: 'lg'
			}
		})

		expect(wrapper.classes()).toContain('btn-group-vertical')
		expect(wrapper.classes()).not.toContain('btn-group')
		expect(wrapper.element.tagName).toBe('SPAN')
	})

	it('render default slot', () => {
		const wrapper = mount(ButtonGroup, {
			slots: {
				default: 'text'
			}
		})

		expect(wrapper.text()).toBe('text')
	})
})
