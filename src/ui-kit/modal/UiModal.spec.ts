import {mount} from '@vue/test-utils'
import {describe, expect, it, afterEach, beforeEach, test} from 'vitest'
import UiModal from './UiModal.vue'

describe('modal', () => {
	beforeEach(() => {
		const el = document.createElement('div')
		el.id = 'teleportDiv'

		document.body.appendChild(el)
	})

	afterEach(() => {
		const el = document.getElementById('teleportDiv')

		if (el) document.body.removeChild(el)
	})

	it('teleportTo prop', () => {
		const wrapper = mount(UiModal, {
			props: {
				teleportTo: '#teleportDiv'
			}
		})

		expect(wrapper.exists()).toBe(true)
		expect(document.getElementById('teleportDiv')?.querySelector('.modal')).toBeTruthy()
	})

	it('root has .modal class', async () => {
		const wrapper = mount(UiModal, {
			global: {
				stubs: {
					teleport: true
				}
			}
		})

		expect(wrapper.element?.querySelector('.modal')).toBeTruthy()
	})

	it('test emits', () => {
		const wrapper = mount(UiModal, {
			global: {
				stubs: {
					teleport: true
				}
			}
		})

		wrapper.find('.modal-backdrop').trigger('click')

		//expect(wrapper.emitted()).toHaveProperty('backdrop')
		//expect(wrapper.emitted()).toHaveProperty('beforeShow')
	})
})
