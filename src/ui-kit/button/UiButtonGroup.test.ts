import {mount} from '@vue/test-utils'

import {expect, it, describe} from 'vitest'
import UiButtonGroup from './UiButtonGroup.vue'

describe('', () => {
	it('default', () => {
		const wrapper = mount(UiButtonGroup, {})

		expect(wrapper.classes()).toContain('btn-group')
		expect(wrapper.classes()).not.toContain('btn-group-vertical')
		expect(wrapper.classes()).not.toContain('btn-group-md')
		expect(wrapper.element.tagName).toBe('DIV')
	})

	it('props', () => {
		const wrapper = mount(UiButtonGroup, {
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
		const wrapper = mount(UiButtonGroup, {
			slots: {
				default: 'text'
			}
		})

		expect(wrapper.text()).toBe('text')
	})
})
