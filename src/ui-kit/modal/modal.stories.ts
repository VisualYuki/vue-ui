import type {Meta, StoryObj} from '@storybook/vue3'
import '/src/theme/scss/index.scss'
import UiModal from '@/ui-kit/modal/UiModal.vue'
import UiIcon from '@/ui-kit/icon/UiIcon.vue'
import UiButton from '../button/UiButton.vue'
import LoadingIcon from '@/ui-kit/icons/LoadingIcon.vue'
import CloseIcon from '@/ui-kit/icons/CloseIcon.vue'
import {Colors} from '@/types/unions'
import {Sizes} from '@/types/size'

const meta = {
	title: 'UiModal',
	component: UiModal,
	tags: ['!autodocs']
} satisfies Meta<typeof UiModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: {UiModal, UiButton},
		setup() {
			return {args}
		},

		template: `
			<UiModal v-bind='args'> default</UiModal>
		`
	}),
	argTypes: {
		modelValue: {
			control: 'boolean'
		},
		size: {control: 'select', options: Sizes},

		closeOnBackdrop: {
			control: 'boolean'
		},
		closeOnEscape: {
			control: 'boolean'
		},
		fullscreen: {
			control: 'boolean'
		},
		center: {
			control: 'boolean'
		},
		destroyAfterClose: {
			control: 'boolean'
		}
	},
	args: {
		size: 'default',
		closeOnBackdrop: true,
		modelValue: true,
		closeOnEscape: true,
		fullscreen: false,
		center: false,
		destroyAfterClose: false
	}
}

// export const Types: Story = {
// 	render: (args) => ({
// 		components: {UiButton},
// 		setup() {
// 			return {args}
// 		},
// 		template: `
// 			<div class="helper-grid">
// 				<UiButton> default </UiButton>
// 				<UiButton type='primary'> primary </UiButton>
// 				<UiButton type='success'> success </UiButton>
// 				<UiButton type='danger'> danger </UiButton>
// 				<UiButton type='warning'> warning </UiButton>
// 				<UiButton type='info'> button info </UiButton>
// 			</div>
// 		`
// 	})
// }

// export const _Sizes: Story = {
// 	render: (args) => ({
// 		components: {UiButton},
// 		setup() {
// 			return {args}
// 		},
// 		template: `
// 			<div class="helper-grid">
// 				<UiButton size="small"> small size </UiButton>
// 				<UiButton> default size </UiButton>
// 				<UiButton size="large"> large size </UiButton>
// 			</div>
// 		`
// 	})
// }

// export const states = {
// 	render: () => ({
// 		components: {UiButton, UiIcon, CloseIcon},
// 		template: `
// 			<div class="helper-grid">
// 				<UiButton disabled> disabled </UiButton>
// 				<UiButton circle>
// 					<UiIcon>
// 						<CloseIcon> </CloseIcon>
// 					</UiIcon>
// 				</UiButton>
// 				<UiButton transparent>
// 					<UiIcon>
// 						<CloseIcon> </CloseIcon>
// 					</UiIcon>
// 				</UiButton>
// 				<UiButton loading> loading </UiButton>

// 				<UiButton tag='span'> tag span </UiButton>
// 				<UiButton round> round </UiButton>
// 			</div>
// 		`
// 	})
// }

// export const Group = {
// 	render: (args: any) => ({
// 		components: {UiButton, UiButtonGroup},
// 		setup() {
// 			return {args}
// 		},
// 		template: `
// 			<div class="helper-grid">
// 				<UiButtonGroup v-bind='args'>
// 					<UiButton> 1 </UiButton>
// 					<UiButton> 2 </UiButton>
// 					<UiButton> 3 </UiButton>
// 				</UiButtonGroup>
// 			</div>
// 			<div class="helper-grid">
// 				<UiButtonGroup v-bind='args' direction="vertical">
// 					<UiButton> 1 </UiButton>
// 					<UiButton> 2 </UiButton>
// 					<UiButton> 3 </UiButton>
// 				</UiButtonGroup>
// 			</div>

// 			<div class="helper-grid">
// 				<UiButtonGroup v-bind='args' direction="vertical" type=''>
// 					<UiButton> 1 </UiButton>
// 					<UiButton> 2 </UiButton>
// 					<UiButton> 3 </UiButton>
// 				</UiButtonGroup>
// 			</div>
// 		`
// 	}),
// 	argTypes: {
// 		size: {control: 'select', options: Sizes},
// 		type: {
// 			control: 'select',
// 			options: Colors
// 		}
// 	},
// 	args: {
// 		type: 'primary',
// 		size: 'default'
// 	}
// }
