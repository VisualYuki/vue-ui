<template>
	<CustomTeleport :to="props.teleportTo" :disabled="props.teleportDisabled">
		<Transition
			v-bind="{enterActiveClass: 'fade', enterToClass: 'show', leaveFromClass: 'show', leaveActiveClass: 'fade'}"
			@before-enter="methods.onBeforeEnter"
			@after-enter="methods.onAfterEnter"
			@enter="methods.onEnter"
			@leave="methods.onLeave"
			@after-leave="methods.onAfterLeave"
		>
			<div v-show="model" :id="_computed.id.value" ref="element" v-bind="$attrs" class="modal" role="dialog" :class="[props.modalClasses]">
				<div
					v-if="state.ifModalContent"
					class="modal-dialog"
					style="z-index: 1060; position: relative"
					:class="_computed.modalDialogClasses.value"
				>
					<div class="modal-content">
						<Button>click</Button>
						<div class="modal-header">
							<slot name="header">
								<button ref="cancelBtn" class="btn btn-primary">close</button>
							</slot>
						</div>
						<div class="modal-body">
							<slot name="default"></slot>
						</div>
						<div class="model-footer">
							<slot name="footer"></slot>
						</div>
					</div>
				</div>

				<div class="modal-backdrop fade show" @click="methods.hideModal('backdrop')"></div>
			</div>
		</Transition>
	</CustomTeleport>
</template>

<script lang="ts" setup>
	import {useId} from 'vue'
	import CustomTeleport from '@/ui-kit/custom-teleport/CustomTeleport.vue'
	import type {PropType} from 'vue'
	import {useFocusTrap} from '@vueuse/integrations/useFocusTrap'
	import {reactive} from 'vue'
	import {computed} from 'vue'
	import {onKeyStroke, useFocus} from '@vueuse/core'
	import {ref, watch} from 'vue'
	import Button from '../button/button.vue'

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
	const emit = defineEmits(['update:modelValue', 'hide-prevented', 'backdrop', 'esc', 'beforeShow', 'cancel', 'close', 'hidden'])

	const state = reactive({
		isActive: false,
		ifModalContent: true
	})
	const element = ref()
	const cancelBtn = ref()
	const model = defineModel({
		type: Boolean,
		default: false
	})

	const {activate, deactivate} = useFocusTrap(element)

	const methods = {
		onBeforeEnter() {
			emit('beforeShow')
			methods.showModal()
			console.log('beforeShow')
		},
		onAfterEnter() {
			state.isActive = true

			activate()
		},
		onEnter() {},
		onLeave() {},
		onAfterLeave() {
			methods.hideModal('hidden')
		},
		showModal() {
			model.value = true
			state.ifModalContent = true
		},
		hideModal(trigger: 'ok' | 'backdrop' | 'esc' | 'close' | 'cancel' | 'hidden' | '' = '') {
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
				methods.hideModal('esc')
			},
			{target: element}
		)

		useFocus(element, {
			initialValue: model.value && props.autofocus === true
		})
	}

	setup()

	watch(model, (newValue, oldValue) => {
		if (newValue === oldValue) {
			return
		}

		if (newValue) {
			methods.showModal()
		} else {
			methods.hideModal()
		}
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
		hide: methods.hideModal,
		id: _computed.id,
		show: methods
	})
</script>

<style lang="scss" scoped>
	.modal {
		display: block;
	}
</style>
