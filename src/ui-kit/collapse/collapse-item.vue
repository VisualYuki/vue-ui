<template>
	<div :id="props.name" class="accordion-item">
		<div class="accordion-header" @click="methods.handleClick">
			<button class="accordion-button" :class="{collapsed: !isActive}">{{ props.title }}</button>
		</div>
		<collapse-transition>
			<div v-show="isActive" class="transition-accordion-body">
				<div class="accordion-body">
					<slot></slot>
				</div>
			</div>
		</collapse-transition>
	</div>
</template>

<script lang="ts" setup>
	import {computed, inject, type Ref} from 'vue'
	import CollapseTransition from './collapse-transition.vue'

	const props = defineProps({
		name: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: ''
		}
	})

	let {activeNames, parentProps} = inject<any>('collapse')

	const isActive = computed(() => {
		return activeNames.value.includes(props.name)
	})

	const methods = {
		handleClick() {
			console.log('handleClick')

			if (parentProps.accordion) {
				if (isActive.value) {
					activeNames.value = []
				} else {
					activeNames.value = [props.name]
				}
			} else {
				if (activeNames.value.includes(props.name)) {
					activeNames.value.splice(activeNames.value.indexOf(props.name), 1)
				} else {
					activeNames.value.push(props.name)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accordion-body {
		transition: 1.5s all;
	}

	.transition-accordion-body {
		transition: all 0.5s;
		overflow: hidden;
	}
</style>
