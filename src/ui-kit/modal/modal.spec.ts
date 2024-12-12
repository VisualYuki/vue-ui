import {BaseWrapper, mount, VueWrapper} from '@vue/test-utils'
import {describe, expect, it, afterEach, beforeEach, test, vi} from 'vitest'
import UiModal from './UiModal.vue'
import {useNamespace} from '@/utils/use-namespace'
import UiOverlay from '../overlay/UiOverlay'
import UiButton from '../button/UiButton.vue'
import {nextTick} from 'vue'

const ns = useNamespace('modal')

async function triggerCompositeClick(wrapper: VueWrapper) {
	await wrapper.trigger('mousedown')
	await wrapper.trigger('mouseup')
	await wrapper.trigger('click')
}

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

	it('teleportTo to id prop', async () => {
		const wrapper = mount(UiModal, {
			props: {
				teleportTo: '#teleportDiv'
			}
		})

		expect(wrapper.exists()).toBe(true)
		expect(document.getElementById('teleportDiv')?.querySelector(`.${ns.b()}`)).not.toBeNull()
	})

	it('teleportTo to body prop', async () => {
		const wrapper = mount(UiModal, {
			props: {
				teleportTo: 'body'
			}
		})

		expect(document.body.lastElementChild?.querySelector(`.${ns.b()}`)).toBeTruthy()
	})

	it('closeOnBackdrop prop', async () => {
		const wrapper = mount(UiModal, {
			props: {
				modelValue: true,
				'onUpdate:modelValue': (e) => wrapper.setProps({modelValue: e})
			},
			global: {
				stubs: ['teleport']
			}
		})

		expect(wrapper.props('modelValue')).toBe(true)
		await triggerCompositeClick(wrapper.findComponent(UiOverlay))
		expect(wrapper.props('modelValue')).toBe(false)

		await wrapper.setProps({modelValue: true, closeOnBackdrop: false})
		await triggerCompositeClick(wrapper.findComponent(UiOverlay))
		expect(wrapper.props('modelValue')).toBe(true)
	})

	it('beforeClose', async () => {
		const beforeClose = vi.fn()

		const wrapper = mount(UiModal, {
			props: {
				beforeClose: beforeClose,
				modelValue: true
			}
		})

		await triggerCompositeClick(wrapper.findComponent(UiOverlay))

		expect(beforeClose).toHaveBeenCalled()
		expect(wrapper.vm.modelValue).toBe(true)
	})
})
