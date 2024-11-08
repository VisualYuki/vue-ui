<template>
	<component
		:is="props.tag"
		:class="{[`btn-group-${props.size}`]: props.size !== 'md', 'btn-group-vertical': props.vertical, 'btn-group': !props.vertical}"
	>
		<slot></slot>
	</component>
</template>

<script lang="ts" setup>
	import type {Size} from '@/types/size'
	import type {PropType} from 'vue'

	const props = defineProps({
		tag: {
			type: String as PropType<keyof HTMLElementTagNameMap>,
			default: 'div'
		},
		size: {
			type: String as PropType<Size>,
			default: 'md'
		},
		vertical: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped></style>
