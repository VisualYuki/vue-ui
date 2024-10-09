<template>
	<component
		:is="props.tag"
		ref="button"
		class="btn"
		:class="[
			`btn-${props.variant}`,
			{
				[`btn-${props.size}`]: props.size !== 'md',
				active: props.active || pressedValue,
				'rounded-pill': props.pill,
				'rounded-0': props.squared,
				disabled: _computed.disabled.value
			}
		]"
		:disabled="_computed.disabled.value"
		:type="props.htmlType"
		@click="methods.onClickEvent"
	>
		<template v-if="props.loading">
			<slot name="loading">
				<div class="spinner-slot">
					<UiSpinner></UiSpinner>
				</div>
			</slot>
		</template>
		<slot name="default"></slot>
		<slot name="loading"></slot>
	</component>
</template>

<script lang="ts" setup>
	import {type Variant} from '@/types/unions'
	import {type PropType, useTemplateRef} from 'vue'
	import UiSpinner from '../spinner/Spinner.vue'
	import type {Size} from '@/types/size'
	import type {ButtonType} from '@/types/button'
	import {computed} from 'vue'

	defineOptions({
		name: 'UiButton'
	})

	const props = defineProps({
		tag: {
			type: String as PropType<keyof HTMLElementTagNameMap | 'RouterLink'>,
			default: 'button'
		},
		variant: {
			type: String as PropType<
				| Variant
				| 'outline-primary'
				| 'outline-secondary'
				| 'outline-success'
				| 'outline-danger'
				| 'outline-warning'
				| 'outline-info'
				| 'outline-light'
				| 'outline-dark'
				| 'link'
			>,
			default: ''
		},
		size: {
			type: String as PropType<Size>,
			default: 'md'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		htmlType: {
			type: String as PropType<ButtonType>,
			default: 'button'
		},
		active: {
			type: Boolean,
			default: false
		},
		pill: {
			type: Boolean,
			default: false
		},
		squared: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	})

	const emits = defineEmits<{
		click: [e: MouseEvent]
	}>()

	const pressedValue = defineModel<undefined | boolean>('pressed', {default: undefined})

	const state = {
		buttonRef: useTemplateRef('button')
	}

	const _computed = {
		isToggle: computed(() => (typeof pressedValue.value === 'boolean' ? true : false)),
		disabled: computed(() => props.disabled || props.loading)
	}

	const methods = {
		onClickEvent(e: MouseEvent) {
			if (_computed.disabled) {
				e.preventDefault()
				e.stopPropagation()
				return
			}

			if (_computed.isToggle.value) {
				pressedValue.value = !pressedValue.value
			}

			emits('click', e)
		}
	}

	defineExpose({
		ref: state.buttonRef
	})
</script>

<style lang="scss" scoped>
	.spinner-slot {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.btn {
		position: relative;

		&.disabled {
			pointer-events: all;
			cursor: not-allowed;
		}
	}
</style>
