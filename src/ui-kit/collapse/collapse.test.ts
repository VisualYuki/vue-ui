import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Collapse from './collapse.vue'
import CollapseItem from './collapse-item.vue'
import {h} from 'vue'

describe('collapse', () => {
	it('default', async () => {
		const wrapper = mount(Collapse, {
			props: {
				modelValue: ['1']
			},
			slots: {
				default: [
					h(
						CollapseItem,
						{name: '1'},
						{
							default: () => 'collapse item 1'
						}
					),
					h(
						CollapseItem,
						{name: '2'},
						{
							default: () => 'collapse item 2'
						}
					)
				]
			}
		})

		await wrapper.find(".accordion-item[id='2'] .accordion-header").trigger('click')

		expect(wrapper.vm.modelValue).toEqual(['1', '2'])
	})

	it('prop: accordion', async () => {
		const wrapper = mount(Collapse, {
			props: {
				modelValue: ['1'],
				accordion: true,
				'onUpdate:modelValue': (e: string[]) => wrapper.setProps({modelValue: e})
			},
			slots: {
				default: [
					h(
						CollapseItem,
						{name: '1'},
						{
							default: () => 'collapse item 1'
						}
					),
					h(
						CollapseItem,
						{name: '2'},
						{
							default: () => 'collapse item 2'
						}
					)
				]
			}
		})

		await wrapper.find(".accordion-item[id='2'] .accordion-header").trigger('click')

		expect(wrapper.vm.modelValue).toEqual(['2'])
	})
})
