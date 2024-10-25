<template>
	<div>
		<Tree :data="treeData"></Tree>
	</div>
</template>

<script lang="ts" setup>
	import Tree from '@/ui-kit/tree/tree.vue'

	const treeData = [
		{label: '1.1', children: [{label: '1.2'}, {label: '1.2'}]},
		{label: '2.1'},
		{label: '3.1', children: [{label: '3.2', children: [{label: '3.3'}]}]}
	]
</script>

<style lang="scss" scoped></style>
