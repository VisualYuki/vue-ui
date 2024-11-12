import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Button from './UiButton.vue'
import {useNamespace} from '@/utils/use-namespace'
import {h} from 'vue'
import CloseIcon from '../icons/CloseIcon.vue'

let ns = useNamespace('button')

const SIMPLE_TEXT = 'simple text 123'

describe('button', () => {
	it('default classes', () => {
		const wrapper = mount(Button)

		expect(wrapper.classes()).toContain(ns.b())
	})

	it('has tag button by default', () => {
		const wrapper = mount(Button)
		expect(wrapper.element.tagName).toBe('BUTTON')
	})

	it('type prop', async () => {
		const wrapper = mount(Button, {
			props: {type: 'danger'}
		})

		expect(wrapper.classes()).toContain(ns.m('danger'))
		await wrapper.setProps({type: undefined})
		expect(wrapper.classes()).not.toContain(ns.m('danger'))
	})

	it('size prop', async () => {
		const wrapper = mount(Button, {
			props: {size: 'large'}
		})

		expect(wrapper.classes()).toContain(ns.m('large'))
		await wrapper.setProps({size: undefined})
		expect(wrapper.classes()).not.toContain(ns.m('large'))
	})

	it('circle prop', async () => {
		const wrapper = mount(Button, {
			props: {circle: true}
		})

		expect(wrapper.classes()).toContain(ns.is('circle'))
	})

	it('round prop', async () => {
		const wrapper = mount(Button, {
			props: {round: true}
		})

		expect(wrapper.classes()).toContain(ns.is('round'))
	})

	it('disabled prop', async () => {
		const wrapper = mount(Button, {
			props: {disabled: true}
		})

		await wrapper.trigger('click')
		expect(wrapper.emitted('click')).toBeUndefined()

		expect(wrapper.classes()).toContain(ns.is('disabled'))
	})

	it('loading prop', async () => {
		const wrapper = mount(Button, {
			props: {loading: true},
			slots: {
				icon: [h(CloseIcon, {})],
				default: SIMPLE_TEXT
			}
		})

		const CloseIconComponent = wrapper.findComponent(CloseIcon)
		expect(CloseIconComponent.exists()).toBe(false)

		expect(wrapper.find('.default-slot').text()).toBe(SIMPLE_TEXT)

		await wrapper.trigger('click')
		expect(wrapper.emitted('click')).toBeUndefined()
		expect(wrapper.classes()).toContain(ns.is('loading'))
		expect(wrapper.classes()).toContain(ns.is('disabled'))
	})

	it('emits click when clicked', async () => {
		const wrapper = mount(Button)
		await wrapper.trigger('click')
		expect(wrapper.emitted()).toHaveProperty('click')
	})
})
