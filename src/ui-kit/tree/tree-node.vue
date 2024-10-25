<template>
	<div>
		{{ data.label }}
		<div class="child">
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
</script>

<style lang="scss" scoped></style>
