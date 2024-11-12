<template>
	<component
		:is="props.tag"
		:class="[
			ns.m(_computed.type.value),
			ns.is('disabled', _computed.disabled.value),
			ns.is('circle', props.circle),
			ns.is('loading', props.loading),
			ns.is('round', props.round),
			ns.m(_computed.size.value),
			ns.b()
		]"
		:disabled="_computed.disabled.value"
		:type="props.htmlType"
		@click="methods.onClickEvent"
	>
		<template v-if="props.loading">
			<slot name="loading">
				<UiIcon margin-right>
					<LoadingIcon class="rotate360-animation"></LoadingIcon>
				</UiIcon>
			</slot>
		</template>
		<template v-else>
			<UiIcon v-if="$slots.icon || props.icon" margin-right>
				<component v-if="props.icon" :is="props.icon" />
				<slot v-else name="icon"></slot>
			</UiIcon>
		</template>
		<div class="default-slot" v-if="$slots.default">
			<slot name="default"></slot>
		</div>
	</component>
</template>

<script lang="ts" setup>
	import {type ColorType} from '@/types/unions'
	import {inject, type PropType, type Component} from 'vue'
	import type {Size} from '@/types/size'
	import type {ButtonType} from '@/types/button'
	import {computed} from 'vue'
	import {buttonGroupKey} from './constants'
	import {useNamespace} from '@/utils/use-namespace'
	import UiIcon from '../icon/UiIcon.vue'
	import LoadingIcon from '../icons/LoadingIcon.vue'

	defineOptions({
		name: 'UiButton'
	})

	const props = defineProps({
		tag: {
			type: String as PropType<keyof HTMLElementTagNameMap | 'RouterLink'>,
			default: 'button'
		},
		circle: {
			type: Boolean,
			default: false
		},
		type: {
			type: String as PropType<ColorType>,
			default: ''
		},
		size: {
			type: String as PropType<Size>,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		htmlType: {
			type: String as PropType<ButtonType>,
			default: 'button'
		},
		loading: {
			type: Boolean,
			default: false
		},
		round: {
			type: Boolean,
			default: false
		},
		icon: {
			type: [Object, String] as PropType<Component | String>,
			default: ''
		}
	})

	const emits = defineEmits<{
		click: [e: MouseEvent]
	}>()

	const buttonGroupInject = inject(buttonGroupKey, undefined)
	const ns = useNamespace('button')

	const _computed = {
		type: computed(() => props.type || buttonGroupInject?.type || ''),
		size: computed(() => {
			if (props.size === 'default') {
				return ''
			}

			return props.size || buttonGroupInject?.size || ''
		}),
		disabled: computed(() => props.disabled || props.loading)
	}

	const methods = {
		onClickEvent(e: MouseEvent) {
			if (_computed.disabled.value || props.loading) {
				e.preventDefault()
				e.stopPropagation()
				return
			}

			emits('click', e)
		}
	}
</script>

<style lang="scss" scoped>
	@use './button.scss';
</style>
