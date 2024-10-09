<template>
	<button class="btn-close" :type="props.htmlType"></button>
</template>

<script lang="ts" setup>
	import type {PropType} from 'vue'
	import Button from './UiButton.vue'
	import type {ButtonType} from '@/types/button'

	const props = defineProps({
		htmlType: {
			type: String as PropType<ButtonType>,
			default: 'button'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped>
	// .btn-close:hover {
	// 	color: red !important;
	// }
</style>
