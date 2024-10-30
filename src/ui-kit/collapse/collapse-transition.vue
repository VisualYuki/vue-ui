<template>
	<Transition v-on="on">
		<slot></slot>
	</Transition>
</template>

<script lang="ts" setup>
	import type {RendererElement} from 'vue'

	const on = {
		beforeEnter(el: RendererElement) {
			el.style.height = '0'
		},
		enter(el: RendererElement) {
			el.style.height = `${el.scrollHeight}px`
		},
		afterEnter(el: RendererElement) {
			el.style.height = ''
		},
		beforeLeave(el: RendererElement) {
			el.style.height = `${el.scrollHeight}px`
		},
		leave(el: RendererElement) {
			el.style.height = '0'
		},
		afterLeave(el: RendererElement) {
			el.style.height = ''
		}
	}
</script>

<style lang="scss" scoped></style>
