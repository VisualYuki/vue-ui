<template>
	<component :is="props.tag" :class="[ns.b(), ns.m(props.direction)]">
		<slot></slot>
	</component>
</template>

<script lang="ts" setup>
	import type {Size} from '@/types/size'
	import {provide, reactive, ref, toRef, type PropType} from 'vue'
	import {buttonGroupKey} from './constants'
	import type {ColorType} from '@/types/unions'
	import {useNamespace} from '@/utils/use-namespace'

	const props = defineProps({
		tag: {
			type: String as PropType<keyof HTMLElementTagNameMap>,
			default: 'div'
		},
		size: {
			type: String as PropType<Size>,
			default: ''
		},
		type: {
			type: String as PropType<ColorType>,
			default: ''
		},
		direction: {
			type: String as PropType<'horizontal' | 'vertical'>,
			default: 'horizontal'
		}
	})

	const ns = useNamespace('button-group')

	provide(
		buttonGroupKey,
		reactive({
			size: toRef(props, 'size'),
			type: toRef(props, 'type')
		})
	)
</script>

<style lang="scss">
	@import './button-group.scss';
</style>
