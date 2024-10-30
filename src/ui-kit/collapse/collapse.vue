<template>
	<div class="accordion accordion-flush">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
	import {provide} from 'vue'

	const model = defineModel<string[]>({
		default: []
	})

	const props = defineProps({
		accordion: {
			type: Boolean,
			default: false
		}
	})

	provide('collapse', {activeNames: model, parentProps: props})
</script>

<style lang="scss" scoped></style>
