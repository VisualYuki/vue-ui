<template>
	<div @click="methods.toggle">
		{{ data.label }}
		{{ data.children?.length ? 'есть дети' : 'нет детей' }}
		<div class="child" :class="{'d-none': !data.expanded}">
			<tree-node v-for="data in props.data.children" :data="data"></tree-node>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type {PropType} from 'vue'
	import type {TreeNode} from './types'

	const props = defineProps({
		data: {
			type: Object as PropType<TreeNode>,
			required: true
		}
	})

	const methods = {
		toggle() {
			props.data.expanded = !props.data.expanded
		}
	}
</script>

<style lang="scss" scoped>
	.child {
	}
</style>
