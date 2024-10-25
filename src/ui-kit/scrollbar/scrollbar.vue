<template>
	<div ref="scrollbarRef" class="scrollbar">
		<div class="content-wrap" @scroll="handleScroll">
			<div ref="resizeRef">

			</div>
		</div>
		<template v-if="!native">bar component</template>
	</div>
</template>

<script lang="ts" setup>
	import {ref} from 'vue'

	const props = defineProps({
		heigth: {
			type: [String, Number],
			default: undefined
		},
		maxHeigth: {
			type: [String, Number],
			default: undefined
		},
		native: {
			type: Boolean,
			default: false
		},

		always: {
			type: Boolean,
			default: false
		},
		minSize: {
			type: Number,
			default: 20
		}
	})

	const scrollbarRef = ref<HTMLDivElement>()
	const resizeRef = ref<HTMLDivElement>()
</script>

<style lang="scss" scoped></style>
