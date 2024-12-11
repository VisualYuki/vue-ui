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
				<div
					:id="_computed.id.value"
					ref="element"
					v-bind="$attrs"
					role="dialog"
					:class="[ns.b(), props.modalClasses, _computed.modalDialogClasses.value]"
				>
					<div v-if="state.ifModalContent" style="z-index: 1060" :class="[ns.e('wrapper')]">
						<div :class="ns.e('content')">
							<div :class="ns.e('header')">
								<div :class="ns.e('header-slot')">
									<slot name="header"></slot>
								</div>
								<UiButton @click="methods.closeModal('close')" transparent>
									<UiIcon size="18px">
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
	import type {Size} from '@/types/size'

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
		// fade: {
		// 	type: Boolean,
		// 	default: true
		// },
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
		size: {
			type: String as PropType<Size>,
			default: 'default'
		},
		center: {
			type: Boolean,
			default: false
		},
		// scrollable: {
		// 	type: Boolean,
		// 	default: false
		// },
		destroyAfterClose: {
			type: Boolean,
			default: false
		}
	})
	const emit = defineEmits(['update:modelValue', 'hide-prevented', 'backdrop', 'esc', 'start-open', 'opened', 'closed', 'start-close'])

	const ns = useNamespace('modal')

	const state = reactive({
		//isActive: false,
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
			methods.beforeOpen()
		},
		onBeforeLeave() {
			emit('start-close')
		},
		onAfterLeave() {
			emit('closed')
			methods.closeModal('hidden')
		},
		beforeOpen() {
			methods.open()
		},
		open() {
			//state.isActive = true
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
			{
				[ns.m('fullscreen')]: props.fullscreen === true,
				[ns.m(props.size)]: props.size !== 'md',
				[ns.m('center')]: props.center
				// 'modal-dialog-scrollable': props.scrollable
				// [`modal-fullscreen-${props.fullscreenSize}-down`]: props.fullscreenSize !== undefined,
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
		open: methods.open,
		id: _computed.id
	})
</script>

<style lang="scss" scoped>
	@use './modal.scss';
</style>
