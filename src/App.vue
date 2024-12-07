<template>
	<UiButton @click="isOpened = true">open modal</UiButton>
	<UiModal v-model="isOpened" @start-open="startOpen" @opened="opened">
		<template #header>header title</template>

		<template #default>default content</template>
		<template #footer>footer content</template>
	</UiModal>
	<button @click="toggle = !toggle">toggle block</button>
	<Transition
		enter-active-class="active"
		enter-from-class="from"
		enter-to-class="to"
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter"
	>
		<div v-show="toggle" class="show-block">show block</div>
	</Transition>
	<div ref="test" class="test" style="">test</div>
	<!-- <UiOverlay mask @click="handleClick">
		<template #default><div style="height: 50px; background-color: red"></div></template>
		<template #other>other slot</template>
	</UiOverlay> -->
	<!-- <div @click="console.log('click2')">
		<div @click="console.log('click1')">hello</div>
	</div> -->
</template>

<script lang="ts" setup>
	import UiButton from '@/ui-kit/button/UiButton.vue'
	import {nextTick, onMounted, ref} from 'vue'
	import UiModal from './ui-kit/modal/UiModal.vue'
	//import UiOverlay from './ui-kit/overlay/UiOverlay'

	const toggle = ref(false)
	const isOpened = ref(false)

	function beforeEnter() {
		debugger
	}

	const test = ref()
	// onMounted(() => {
	// 	//debugger
	// 	debugger
	// 	//test.value.style = 'display: block;'
	// })

	// nextTick(() => {
	// 	debugger
	// 	test.value.style = 'opacity: 1'
	// })

	function enter(el) {
		//done()
		debugger
	}

	function afterEnter() {
		debugger
	}

	function startOpen() {
		console.log('mousedown')
	}

	function opened() {
		console.log('mousedown')
	}
</script>

<style lang="scss">
	.show-block {
		//transition: all 5s linear;
	}

	.from {
	}

	.active {
		opacity: 0;
		transition: all 2s linear;
		//opacity: 0;
	}

	.to {
		opacity: 1;
	}

	.test {
		opacity: 0;
		display: block;
		transition-duration: 2s;
	}
</style>
