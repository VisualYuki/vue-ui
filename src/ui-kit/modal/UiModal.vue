<template>
	<CustomTeleport :to="props.teleportTo" :disabled="props.teleportDisabled">
		<Transition
			v-bind="{enterActiveClass: 'fade-out', enterToClass: 'fade-in', leaveActiveClass: 'fade-out'}"
			@before-enter="methods.onBeforeEnter"
			@enter="methods.onEnter"
			@after-enter="methods.onAfterEnter"
			@before-leave="methods.onBeforeLeave"
			@after-leave="methods.onAfterLeave"
		>
			<UiOverlay v-show="model" @click="methods.closeModal('backdrop')">
				<div :id="_computed.id.value" ref="element" v-bind="$attrs" role="dialog" :class="[ns.b(), props.modalClasses]">
					<div v-if="state.ifModalContent" style="z-index: 1060" :class="[ns.e('wrapper'), _computed.modalDialogClasses.value]">
						<div :class="ns.e('content')">
							<div :class="ns.e('header')">
								<div :class="ns.e('header-slot')">
									<slot name="header"></slot>
								</div>
								<UiButton @click="methods.closeModal('close')" size="default" transparent>
									<UiIcon>
										<CloseIcon></CloseIcon>
									</UiIcon>
								</UiButton>
							</div>
							<div :class="ns.e('body')">
								<slot name="default"></slot>
							</div>
							<div :class="ns.e('footer')">
								<slot name="footer"></slot>
							</div>
						</div>
					</div>
				</div>
			</UiOverlay>
		</Transition>
	</CustomTeleport>
</template>

<script lang="ts" setup>
	import {nextTick, useId} from 'vue'
	import CustomTeleport from '@/ui-kit/custom-teleport/CustomTeleport.vue'
	import type {PropType} from 'vue'
	import {useFocusTrap} from '@vueuse/integrations/useFocusTrap'
	import {reactive} from 'vue'
	import {computed} from 'vue'
	import {onKeyStroke, useFocus} from '@vueuse/core'
	import {ref, watch} from 'vue'
	import UiOverlay from '../overlay/UiOverlay'
	import {useNamespace} from '@/utils/use-namespace'
	import UiButton from '../button/UiButton.vue'
	import UiIcon from '../icon/UiIcon.vue'
	import CloseIcon from '../icons/CloseIcon.vue'

	const props = defineProps({
		teleportTo: {
			type: String,
			default: undefined
		},
		teleportDisabled: {
			type: Boolean,
			default: false
		},
		id: {
			type: String,
			default: undefined
		},
		modalClasses: {
			type: [Array, String, Object],
			default: undefined
		},
		dialogClass: {
			type: [Array, String, Object],
			default: undefined
		},
		fade: {
			type: Boolean,
			default: true
		},
		closeOnBackdrop: {
			type: Boolean,
			default: true
		},
		closeOnEscape: {
			type: Boolean,
			default: true
		},
		fullscreen: {
			type: [Boolean],
			default: false
		},
		fullscreenSize: {
			type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>,
			default: ''
		},
		size: {
			type: String as PropType<'sm' | 'lg' | 'xl' | 'md'>,
			default: 'md'
		},
		centered: {
			type: Boolean,
			default: false
		},
		scrollable: {
			type: Boolean,
			default: false
		},
		autofocus: {
			type: Boolean,
			default: true
		},
		destroyAfterClose: {
			type: Boolean,
			default: false
		}
	})
	const emit = defineEmits(['update:modelValue', 'hide-prevented', 'backdrop', 'esc', 'start-open', 'opened', 'closed', 'start-close'])

	const ns = useNamespace('modal')

	const state = reactive({
		isActive: false,
		ifModalContent: true
	})
	const element = ref()
	const model = defineModel({
		type: Boolean,
		default: false
	})

	const {activate, deactivate} = useFocusTrap(element)

	const methods = {
		onEnter() {},
		onBeforeEnter() {
			emit('start-open')
		},
		onAfterEnter() {
			emit('opened')
			methods.openModal()
		},
		onBeforeLeave() {
			emit('start-close')
		},
		onAfterLeave() {
			emit('closed')
			methods.closeModal('hidden')
		},
		openModal() {
			state.isActive = true
			model.value = true
			state.ifModalContent = true
			//activate()
		},
		closeModal(trigger: 'ok' | 'backdrop' | 'esc' | 'close' | 'hidden' | '' = '') {
			if ((trigger === 'backdrop' && !props.closeOnBackdrop) || (trigger === 'esc' && !props.closeOnEscape)) {
				emit('hide-prevented')
				return
			}

			if (props.destroyAfterClose) {
				state.ifModalContent = false
			}

			if (trigger === 'backdrop') {
				emit(trigger)
			}

			if (trigger === 'esc') {
				emit(trigger)
			}

			model.value = false
			deactivate()
		}
	}

	const _computed = {
		id: computed(() => (props.id ? props.id : useId())),
		modalDialogClasses: computed(() => [
			props.dialogClass,
			{
				'modal-fullscreen': props.fullscreen === true,
				[`modal-fullscreen-${props.fullscreenSize}-down`]: props.fullscreenSize !== undefined,
				[`modal-${props.size}`]: props.size !== 'md',
				'modal-dialog-centered': props.centered,
				'modal-dialog-scrollable': props.scrollable
			}
		])
	}

	function setup() {
		onKeyStroke(
			'Escape',
			() => {
				methods.closeModal('esc')
			},
			{target: element}
		)

		// useFocus(element, {
		// 	initialValue: model.value && props.autofocus === true
		// })
	}

	setup()

	watch(model, (newValue, oldValue) => {
		// if (newValue === oldValue) {
		// 	return
		// }
		// if (newValue) {
		// 	methods.openModal()
		// } else {
		// 	methods.closeModal()
		// }
	})

	// const sharedSlots = computed(() => {
	// 	return {
	// 		close: () => methods.hideModal('close'),
	// 		cancel: () => methods.hideModal('cancel'),
	// 		visiable: model.value,
	// 		active: state.isActive
	// 	}
	// })

	defineExpose({
		close: methods.closeModal,
		open: methods.openModal,
		id: _computed.id
	})
</script>

<style lang="scss" scoped>
	@use './modal.scss';
</style>
