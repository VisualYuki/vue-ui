<template>
	<div class="accordion accordion-flush">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
	import {provide, watch} from 'vue'

	const model = defineModel<string[]>({
		default: [],
		set(value) {
			emit('change', model.value)

			return value
		}
	})

	const emit = defineEmits(['change'])

	const props = defineProps({
		accordion: {
			type: Boolean,
			default: false
		}
	})

	provide('collapse', {activeNames: model, parentProps: props})
</script>

<style lang="scss" scoped></style>
