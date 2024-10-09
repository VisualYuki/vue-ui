<template>
	<component :is="props.tag" :class="computedClasses"></component>
</template>

<script lang="ts" setup>
	import {type Variant} from '@/types/unions'
	import {computed} from 'vue'
	import {type PropType} from 'vue'

	const props = defineProps({
		tag: {
			type: String as PropType<keyof HTMLElementTagNameMap>,
			default: 'span'
		},
		type: {
			type: String as PropType<'border' | 'grow'>,
			default: 'border'
		},
		variant: {
			type: String as PropType<Variant>,
			default: ''
		},
		small: {
			type: Boolean,
			default: false
		}
	})

	const computedClasses = computed(() => {
		return [
			`spinner-${props.type}`,

			{
				[`text-${props.variant}`]: props.variant,
				[`spinner-${props.type}-sm`]: props.small
			}
		]
	})
</script>

<style lang="scss" scoped></style>
