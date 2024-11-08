<template>
	<div class="tree-node" @click.stop="methods.toggle">
		{{ data.label }}
		{{ data.children?.length ? 'есть дети' : 'нет детей' }}
		<CollapseTransition>
			<div class="child ms-3" :class="{'d-none': !data.expanded}">
				<tree-node v-for="data in props.data.children" :data="data"></tree-node>
			</div>
		</CollapseTransition>
	</div>
</template>

<script lang="ts" setup>
	import type {PropType} from 'vue'
	import type {TreeNode} from './types'
	import CollapseTransition from '../collapse/collapse-transition.vue'

	const props = defineProps({
		data: {
			type: Object as PropType<TreeNode>,
			required: true
		}
	})

	const methods = {
		toggle() {
			console.log(props.data)
			props.data.expanded = !props.data.expanded
		}
	}
</script>

<style lang="scss" scoped>
	.tree-node {
	}
	.child {
	}
</style>
