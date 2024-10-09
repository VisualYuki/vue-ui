<template>
	<Teleport :to="$props.to" :disabled="$props.disabled">
		<slot name="default"></slot>
	</Teleport>
</template>

<script lang="ts">
	import {defineComponent} from 'vue'

	export default defineComponent({
		name: '',
		props: {
			to: {
				type: String,
				default: 'body'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		}
	})
</script>

<style lang="scss" scoped></style>
