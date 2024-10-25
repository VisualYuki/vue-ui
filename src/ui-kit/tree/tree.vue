<template>
	<tree-node v-for="data in state.treeData" :data="data"></tree-node>
</template>

<script lang="ts" setup>
	import {reactive, type PropType} from 'vue'
	import treeNode from './tree-node.vue'
	import type {RawDataItem, TreeNode} from './types'

	const props = defineProps({
		data: {
			type: Array as PropType<RawDataItem[]>,
			required: true
		},
		propNames: {
			type: Object as PropType<{label: string; children: string}>,
			default: () => {
				return {label: 'label', children: 'children'}
			}
		}
	})

	const state = reactive({
		treeData: [] as TreeNode[]
	})

	function createNode(data: RawDataItem[]): TreeNode[] {
		let upperNodes: TreeNode[] = []

		data.forEach((item) => {
			let lowerNodes: TreeNode = {label: item[props.propNames.label] as string, children: [], expanded: false}
			let children: RawDataItem[] = item[props.propNames.children] as RawDataItem[]

			if (children) {
				lowerNodes['children'] = createNode(children)
			}

			upperNodes.push(lowerNodes)
		})

		return upperNodes
	}

	function setup() {
		state.treeData = createNode(props.data)
	}

	setup()
</script>

<style lang="scss" scoped></style>
