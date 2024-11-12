<template>
	<div
		:class="[ns.b(), {[ns.m('margin-left')]: props.marginLeft, [ns.m('margin-right')]: props.marginRight}]"
		:style="{color: props.color, 'font-size': props.size}"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
	import {useNamespace} from '@/utils/use-namespace'

	const ns = useNamespace('icon')

	defineOptions({
		name: 'UiIcon'
	})

	const props = defineProps({
		size: {
			type: String || Number,
			default: ''
		},
		color: {
			type: String,
			default: ''
		},
		marginLeft: {
			type: Boolean,
			default: false
		},
		marginRight: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss">
	@import './icon.scss';
</style>
