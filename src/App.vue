<template>
	<div>
		<!-- <UiButton v-model:pressed="pressed" variant="link">loading test</UiButton> -->
		<UiAlert ref="myRef" variant="warning" closable v-model="alert">
			alert content
			<template #header>header</template>
		</UiAlert>
		<!-- <UiModal v-model="isOpen" destroy-after-close>
			<button @click="isOpen = false">open dialog</button>
			<p v-for="i in 20" :key="i" class="my-4">
				Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
				consectetur ac, vestibulum at eros.
			</p>
		</UiModal> -->
		<!-- <UiModal v-model="isOpen2">
			<p v-for="i in 20" :key="i" class="my-4">1212</p>
		</UiModal> -->
		<!-- <UiButtonGroup vertical>
			<UiButton variant="primary">loading test</UiButton>
			<UiButton variant="primary">loading test</UiButton>
			<UiButton variant="primary">loading test</UiButton>
		</UiButtonGroup> -->
		<button @click="isOpen = true">open dialog</button>
	</div>
</template>

<script lang="ts" setup>
	import UiButton from '@/ui-kit/button/UiButton.vue'
	import UiModal from '@/ui-kit/modal/UiModal.vue'
	import UiAlert from '@/ui-kit/alert/alert.vue'
	import {onMounted, ref} from 'vue'
	import UiButtonGroup from './ui-kit/button/UiButtonGroup.vue'

	const alert = ref(true)
	const myRef = ref()

	onMounted(() => {
		console.log(myRef.value)
		debugger
	})

	setTimeout(() => {
		alert.value = true
	}, 3000)

	const isOpen = ref(false)
	const isOpen2 = ref(false)
	const pressed = ref(false)
</script>

<style lang="scss" scoped></style>
