<template>
	<Tree :data="treeData"></Tree>
	<!-- <UiButton>sdf</UiButton> -->

	<!-- <collapse v-model="activeNames" accordion @change="change">
			<collapse-item title="Consistency" name="1">
				<div>
					Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are
					used to;
				</div>
				<div>
					Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.
				</div>
			</collapse-item>
			<collapse-item title="Feedback" name="2">
				<div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
				<div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
			</collapse-item>
		</collapse> -->

	<UiButton @click="console.log('click')" loading>default button</UiButton>
	<UiButton type="primary" size="default" :icon="CircleCloseIcon">primary</UiButton>
	<UiButton type="danger">danger</UiButton>
	<UiButton type="danger" size="small" loading>danger small</UiButton>
	<UiButton type="primary" circle disabled>primary circle</UiButton>
	<UiButtonGroup type="success">
		<UiButton>primary</UiButton>
		<UiButton>danger</UiButton>
		<UiButton>danger</UiButton>
	</UiButtonGroup>
	<br />
	<UiIcon color="blue" size="30px" class="loading-animation">
		<LoadingIcon></LoadingIcon>
	</UiIcon>
</template>

<script lang="ts" setup>
	import Tree from '@/ui-kit/tree/tree.vue'
	import Collapse from './ui-kit/collapse/collapse.vue'
	import CollapseItem from './ui-kit/collapse/collapse-item.vue'
	import UiButton from '@/ui-kit/button/UiButton.vue'
	import UiButtonGroup from '@/ui-kit/button/UiButtonGroup.vue'
	import {ref, watch} from 'vue'
	import UiIcon from './ui-kit/icon/UiIcon.vue'
	import LoadingIcon from './ui-kit/icons/LoadingIcon.vue'
	import CircleCloseIcon from './ui-kit/icons/CircleCloseIcon.vue'

	const test = ref('danger')

	setTimeout(() => {
		test.value = 'info'
	}, 5000)

	const activeNames = ref(['2'])

	const treeData = [
		{label: '1.1', children: [{label: '1.2', children: [{label: '1.2.1'}, {label: '1.2.2'}]}, {label: '1.2'}]},
		{label: '2.1'},
		{label: '3.1', children: [{label: '3.2', children: [{label: '3.3'}]}]}
	]

	function change(value: any) {
		console.log(value)
	}
</script>

<style lang="scss" scoped></style>
