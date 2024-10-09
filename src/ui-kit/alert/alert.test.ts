import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import alert from './alert.vue'

describe('button', () => {
	it('closable', async () => {
		const wrapper = mount(alert, {
			props: {
				closable: true
			}
		})

		await wrapper.find('.btn-close').trigger('click')

		expect(wrapper.emitted()).toHaveProperty('close')
		expect(wrapper.emitted()).toHaveProperty('click')
		expect(wrapper.emitted()).toHaveProperty('update:modelValue')
		expect(wrapper.classes()).not.toContain('alert')
	})

	it('icon slot', async () => {
		const wrapper = mount(alert, {
			props: {
				showIcon: false
			}
		})

		expect(wrapper.element.querySelector('.alert-icon')).toBeFalsy()

		await wrapper.setProps({
			showIcon: true,
			variant: 'success'
		})

		expect(wrapper.element.querySelector('.alert-icon')).toBeTruthy()
	})
})
