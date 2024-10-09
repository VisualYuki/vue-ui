<template>
	<Transition v-bind="{enterActiveClass: 'fade', enterToClass: 'show', leaveFromClass: 'show', leaveActiveClass: 'fade'}">
		<component v-if="model" :is="tag" class="alert d-flex justify-content-start align-items-center" :class="_computed.class.value">
			<div v-if="slots.icon || props.showIcon" class="alert-icon me-3">
				<slot name="icon">
					<img class="slot-img d-block" v-if="props.showIcon" :src="_computed.icon.value" />
				</slot>
			</div>
			<div class="alert-content flex-grow-1 d-flex justify-content-between align-items-center">
				<div>
					<slot name="default"></slot>
				</div>

				<slot name="close"><CloseButton v-if="props.closable" @click="methods.close()"></CloseButton></slot>
			</div>
		</component>
	</Transition>
</template>

<script lang="ts" setup>
	import type {Variant} from '@/types/unions'
	import type {PropType} from 'vue'
	import InfoCircle from 'bootstrap-icons/icons/info-circle.svg'
	import CheckCircle from 'bootstrap-icons/icons/check-circle.svg'
	import ExclamationTriangle from 'bootstrap-icons/icons/exclamation-triangle.svg'
	import CloseButton from '@/ui-kit/button/close-button.vue'
	import {computed} from 'vue'

	const emit = defineEmits(['close'])

	const slots = defineSlots<{
		icon?: (props: {}) => any
		close?: (props: {}) => any
		default?: (props: {}) => any
	}>()

	const props = defineProps({
		tag: {
			type: String as PropType<keyof HTMLElementTagNameMap>,
			default: 'div'
		},
		variant: {
			type: String as PropType<Variant>,
			default: 'primary'
		},
		showIcon: {
			type: Boolean,
			default: false
		},
		closable: {
			type: Boolean,
			default: false
		}
	})

	const model = defineModel({
		default: true
	})

	const _computed = {
		icon: computed(() => {
			switch (props.variant) {
				case 'info':
					return InfoCircle
				case 'success':
					return CheckCircle
				case 'danger':
				case 'warning':
					return ExclamationTriangle
			}
		}),
		class: computed(() => [{[`alert-${props.variant}`]: props.variant}])
	}

	const methods = {
		close() {
			model.value = false
			emit('close')
		}
	}
</script>

<style lang="scss" scoped></style>
