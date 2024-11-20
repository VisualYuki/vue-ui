import {mount} from '@vue/test-utils'
import {expect, it, describe} from 'vitest'
import UiButtonGroup from './UiButtonGroup.vue'
import UiButton from './UiButton.vue'
import {h} from 'vue'
import {useNamespace} from '@/utils/use-namespace'

let buttonNs = useNamespace('button')
let buttoGroupnNs = useNamespace('button-group')

describe('button-group', () => {
	it('default', () => {
		const wrapper = mount(UiButtonGroup, {
			props: {
				type: 'danger',
				size: 'large',
				tag: 'span'
			},
			slots: {
				default: [
					h(
						UiButton,
						{
							type: 'primary',
							size: 'small'
						},
						{
							default: () => 'button 1'
						}
					),
					h(
						UiButton,
						{},
						{
							default: () => 'button 2'
						}
					),
					h(
						UiButton,
						{
							size: 'default'
						},
						{
							default: () => 'button 3'
						}
					)
				]
			}
		})

		let buttons = wrapper.findAllComponents(UiButton)

		expect(wrapper.element.tagName).toBe('SPAN')

		expect(buttons[0].classes()).toContain(buttonNs.m('primary'))
		expect(buttons[0].classes()).toContain(buttonNs.m('small'))

		expect(buttons[1].classes()).toContain(buttonNs.m('danger'))
		expect(buttons[1].classes()).toContain(buttonNs.m('large'))

		expect(buttons[2].classes()).not.toContain(buttonNs.m('large'))

		wrapper.setProps({type: 'info'}).then(() => {
			expect(buttons[0].classes()).toContain(buttonNs.m('primary'))
			expect(buttons[1].classes()).toContain(buttonNs.m('info'))
		})
	})

	it('prop horizontal', async () => {
		const wrapper = mount(UiButtonGroup, {
			props: {},
			slots: {
				default: [
					h(
						UiButton,
						{
							type: 'primary',
							size: 'small'
						},
						{
							default: () => 'button 1'
						}
					),
					h(
						UiButton,
						{
							type: 'primary',
							size: 'small'
						},
						{
							default: () => 'button 2'
						}
					),
					h(
						UiButton,
						{
							type: 'primary',
							size: 'small'
						},
						{
							default: () => 'button 3'
						}
					)
				]
			}
		})

		expect(wrapper.classes()).toContain(buttoGroupnNs.m('horizontal'))
		expect(wrapper.classes()).not.toContain(buttoGroupnNs.m('vertical'))

		await wrapper.setProps({direction: 'vertical'})

		expect(wrapper.classes()).toContain(buttoGroupnNs.m('vertical'))
		expect(wrapper.classes()).not.toContain(buttoGroupnNs.m('horizontal'))
	})
})
