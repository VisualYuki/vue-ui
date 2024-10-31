import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import UiSpinner from '../spinner/Spinner.vue'
import UiButton from './UiButton.vue'
//import BLink from '../BLink/BLink.vue'

describe('button', () => {
	it('has static class btn', () => {
		const wrapper = mount(UiButton)

		expect(wrapper.classes()).toContain('btn')
	})

	it('has tag button by default', () => {
		const wrapper = mount(UiButton)
		expect(wrapper.element.tagName).toBe('BUTTON')
	})

	it('has class btn-{type} when prop variant', async () => {
		const wrapper = mount(UiButton, {
			props: {variant: 'primary'}
		})
		expect(wrapper.classes()).toContain('btn-primary')
		await wrapper.setProps({variant: undefined})
		expect(wrapper.classes()).not.toContain('btn-primary')
	})

	it('has class btn-{type} when prop variant', async () => {
		const wrapper = mount(UiButton, {
			props: {variant: 'primary'}
		})
		expect(wrapper.classes()).toContain('btn-primary')
		await wrapper.setProps({variant: undefined})
		expect(wrapper.classes()).not.toContain('btn-primary')
	})

	it('has class btn-{type} when prop size', async () => {
		const wrapper = mount(UiButton, {
			props: {size: 'sm'}
		})
		expect(wrapper.classes()).toContain('btn-sm')
		await wrapper.setProps({size: undefined})
		expect(wrapper.classes()).not.toContain('btn-sm')
	})

	it('has class active when prop active', async () => {
		const wrapper = mount(UiButton, {
			props: {active: true}
		})
		expect(wrapper.classes()).toContain('active')
		await wrapper.setProps({active: false})
		expect(wrapper.classes()).not.toContain('active')
	})

	it('has class rounded-pill when prop pill', async () => {
		const wrapper = mount(UiButton, {
			props: {pill: true}
		})
		expect(wrapper.classes()).toContain('rounded-pill')
		await wrapper.setProps({pill: false})
		expect(wrapper.classes()).not.toContain('rounded-pill')
	})

	it('has class rounded-0 when prop squared', async () => {
		const wrapper = mount(UiButton, {
			props: {squared: true}
		})
		expect(wrapper.classes()).toContain('rounded-0')
		await wrapper.setProps({squared: false})
		expect(wrapper.classes()).not.toContain('rounded-0')
	})

	it('has class disabled when prop disabled', async () => {
		const wrapper = mount(UiButton, {
			props: {disabled: true}
		})
		expect(wrapper.classes()).toContain('disabled')
		await wrapper.setProps({disabled: false})
		expect(wrapper.classes()).not.toContain('disabled')
	})

	it('has attr disabled when is button and prop disabled', async () => {
		const wrapper = mount(UiButton, {
			props: {disabled: true}
		})
		expect(wrapper.attributes('disabled')).toBe('')
		await wrapper.setProps({disabled: false})
		expect(wrapper.attributes('disabled')).toBeUndefined()
	})

	it('has attr type when when prop type', async () => {
		const wrapper = mount(UiButton)
		expect(wrapper.attributes('type')).toBe('button')
		await wrapper.setProps({htmlType: 'submit'})
		expect(wrapper.attributes('type')).toBe('submit')
		await wrapper.setProps({htmlType: 'reset'})
		expect(wrapper.attributes('type')).toBe('reset')
	})

	it('emits click when clicked', async () => {
		const wrapper = mount(UiButton)
		await wrapper.trigger('click')
		expect(wrapper.emitted()).toHaveProperty('click')
	})

	it('click emit value is MouseEvent', async () => {
		const wrapper = mount(UiButton)
		await wrapper.trigger('click')
		const $emitted = wrapper.emitted('click') ?? []
		expect($emitted[0][0] instanceof MouseEvent).toBe(true)
	})

	it('click does not emit event when disabled', async () => {
		const wrapper = mount(UiButton, {
			props: {disabled: true}
		})
		await wrapper.trigger('click')
		expect(wrapper.emitted('click')).toBeUndefined()
	})

	it('loading prop', async () => {
		const wrapper = mount(UiButton, {
			props: {
				loading: true
			}
		})

		expect(wrapper.attributes('disabled')).toBe('')
		expect(wrapper.findComponent(UiSpinner).exists()).toBe(true)
	})
})
