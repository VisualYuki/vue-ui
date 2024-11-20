<template>
	<CollapseTransition>
		<div
			v-if="model"
			class="default-transition"
			:class="[
				ns.b(),
				ns.m(props.type),
				{
					[ns.m('center')]: props.center
				}
			]"
		>
			<div class="inner-wrapper">
				<div class="content">
					<UiIcon v-if="props.showIcon" :class="[ns.e('icon'), {[ns.em('icon', 'big')]: props.description}]">
						<InfoFIlledIcon v-if="props.type === 'info'"></InfoFIlledIcon>
						<SuccessFilledIcon v-else-if="props.type === 'success'"></SuccessFilledIcon>
						<CloseCircleFilledIcon v-else-if="props.type === 'danger'"></CloseCircleFilledIcon>
						<WarningFilledIcon v-else-if="props.type === 'warning'"></WarningFilledIcon>
					</UiIcon>
					<div>
						<div :class="[ns.e('title'), {[ns.em('title', 'with-description')]: props.description}]">{{ props.title }}</div>
						<div v-if="props.description" :class="ns.e('description')">{{ props.description }}</div>

						<slot name="default"></slot>
					</div>
				</div>

				<div v-if="props.closable" :class="ns.e('close')" @click="methods.handleClose()">
					<slot name="close">
						<UiIcon>
							<CloseIcon></CloseIcon>
						</UiIcon>
					</slot>
				</div>
			</div>
		</div>
	</CollapseTransition>
</template>

<script lang="ts" setup>
	import type {ColorType} from '@/types/unions'
	import type {PropType} from 'vue'
	import UiIcon from '../icon/UiIcon.vue'
	import CloseIcon from '../icons/CloseIcon.vue'
	import {useNamespace} from '@/utils/use-namespace'
	import InfoFIlledIcon from '../icons/InfoFIlledIcon.vue'
	import SuccessFilledIcon from '../icons/SuccessFilledIcon.vue'
	import WarningFilledIcon from '../icons/WarningFilledIcon.vue'
	import CloseCircleFilledIcon from '../icons/CloseCircleFilledIcon.vue'
	import CollapseTransition from '../collapse-transition/collapse-transition.vue'

	const emit = defineEmits(['close'])

	const ns = useNamespace('alert')

	const props = defineProps({
		type: {
			type: String as PropType<ColorType>,
			default: 'info'
		},
		title: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		closable: {
			type: Boolean,
			default: true
		},
		center: {
			type: Boolean,
			default: false
		},
		showIcon: {
			type: Boolean,
			default: false
		}
	})

	const model = defineModel({type: Boolean, default: true})

	const methods = {
		handleClose() {
			model.value = false
			emit('close')
		}
	}
</script>

<style lang="scss">
	@import './alert.scss';

	.ui-alert {
		margin-bottom: 10px;
	}
</style>
