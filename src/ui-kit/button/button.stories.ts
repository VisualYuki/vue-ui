import type {Meta, StoryObj} from '@storybook/vue3'
import '/src/theme/scss/index.scss'
import UiButton from '@/ui-kit/button/UiButton.vue'
import UiButtonGroup from '@/ui-kit/button/UiButtonGroup.vue'
import UiIcon from '@/ui-kit/icon/UiIcon.vue'
import LoadingIcon from '@/ui-kit/icons/LoadingIcon.vue'
import CloseIcon from '@/ui-kit/icons/CloseIcon.vue'
import {Colors} from '@/types/unions'
import {Sizes} from '@/types/size'

const meta = {
	title: 'UiButton',
	component: UiButton,
	tags: ['!autodocs']
} satisfies Meta<typeof UiButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: {UiButton},
		setup() {
			return {args}
		},
		template: `
			<UiButton v-bind='args'> default</UiButton>
		`
	}),
	argTypes: {
		size: {control: 'select', options: Sizes},
		type: {
			control: 'select',
			options: Colors
		},
		disabled: {
			control: 'boolean'
		},
		loading: {
			control: 'boolean'
		},
		circle: {
			control: 'boolean'
		}
	},
	args: {
		type: 'primary',
		size: 'default',
		disabled: false,
		loading: false,
		tag: 'button',
		htmlType: 'button',
		circle: false
	}
}

export const Types: Story = {
	render: (args) => ({
		components: {UiButton},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<UiButton> default </UiButton>
				<UiButton type='primary'> primary </UiButton>
				<UiButton type='success'> success </UiButton>
				<UiButton type='danger'> danger </UiButton>
				<UiButton type='warning'> warning </UiButton>
				<UiButton type='info'> button info </UiButton>
			</div>
		`
	})
}

export const _Sizes: Story = {
	render: (args) => ({
		components: {UiButton},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<UiButton size="small"> small size </UiButton>
				<UiButton> default size </UiButton>
				<UiButton size="large"> large size </UiButton>
			</div>
		`
	})
}

export const states = {
	render: () => ({
		components: {UiButton, UiIcon, CloseIcon},
		template: `
			<div class="helper-grid">
				<UiButton disabled> disabled </UiButton>
				<UiButton circle>
					<UiIcon>
						<CloseIcon> </CloseIcon>
					</UiIcon>
				</UiButton>
				<UiButton loading> loading </UiButton>
				<UiButton tag='span'> tag span </UiButton>
				<UiButton round> round </UiButton>
			</div>
		`
	})
}

export const Group = {
	render: (args: any) => ({
		components: {UiButton, UiButtonGroup},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<UiButtonGroup v-bind='args'>
					<UiButton> 1 </UiButton>
					<UiButton> 2 </UiButton>
					<UiButton> 3 </UiButton>
				</UiButtonGroup>
			</div>
			<div class="helper-grid">
				<UiButtonGroup v-bind='args' direction="vertical">
					<UiButton> 1 </UiButton>
					<UiButton> 2 </UiButton>
					<UiButton> 3 </UiButton>
				</UiButtonGroup>
			</div>

			<div class="helper-grid">
				<UiButtonGroup v-bind='args' direction="vertical" type=''>
					<UiButton> 1 </UiButton>
					<UiButton> 2 </UiButton>
					<UiButton> 3 </UiButton>
				</UiButtonGroup>
			</div>
		`
	}),
	argTypes: {
		size: {control: 'select', options: Sizes},
		type: {
			control: 'select',
			options: Colors
		}
	},
	args: {
		type: 'primary',
		size: 'default'
	}
}
