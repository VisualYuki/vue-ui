import {fn} from '@storybook/test'
import type {Meta, StoryObj} from '@storybook/vue3'

import UiButton from '@/ui-kit/button/UiButton.vue'
import UiButtonGroup from '@/ui-kit/button/UiButtonGroup.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Example/UiButton',
	component: UiButton,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs']
} satisfies Meta<typeof UiButton>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

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
		size: {control: 'select', options: ['sm', 'md', 'lg']},
		variant: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'success',
				'danger',
				'warning',
				'info',
				'light',
				'dark',
				'outline-primary',
				'outline-secondary',
				'outline-success',
				'outline-danger',
				'outline-warning',
				'outline-info',
				'outline-light',
				'outline-dark',
				'link'
			]
		},
		disabled: {
			control: 'boolean'
		},
		active: {
			control: 'boolean'
		},
		pill: {
			control: 'boolean'
		},
		squared: {
			control: 'boolean'
		},
		loading: {
			control: 'boolean'
		}
	},
	args: {
		variant: 'primary',
		size: 'md',
		disabled: false,
		active: false,
		pill: false,
		squared: false,
		loading: false,
		tag: 'button',
		htmlType: 'button'
	}
}

export const Variant: Story = {
	render: (args) => ({
		components: {UiButton},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<UiButton variant='primary'> button content </UiButton>
				<UiButton variant='secondary' > button content </UiButton>
				<UiButton variant='success'> button content </UiButton>
				<UiButton variant='danger'> button content </UiButton>
				<UiButton variant='warning'> button content </UiButton>
				<UiButton variant='info'> button content </UiButton>
				<UiButton variant='light'> button content </UiButton>
				<UiButton variant='dark'> button content </UiButton>
				<UiButton variant='secondary'> button content </UiButton>

				<UiButton variant='outline-primary'> button content </UiButton>
				<UiButton variant='outline-secondary'> button content </UiButton>
				<UiButton variant='outline-success'> button content </UiButton>
				<UiButton variant='outline-danger'> button content </UiButton>
				<UiButton variant='outline-warning'> button content </UiButton>
				<UiButton variant='outline-info'> button content </UiButton>
				<UiButton variant='outline-dark'> button content </UiButton>
				<UiButton variant='outline-light'> button content </UiButton>
				<UiButton variant='link'> button content </UiButton>
			</div>
		`
	}),
	argTypes: {
		size: {control: 'select', options: ['small', 'medium', 'large', '1']},
		backgroundColor: {control: 'color'}
	},

	args: {}
}

export const Sizes: Story = {
	render: (args) => ({
		components: {UiButton},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<UiButton size="sm"> sm size </UiButton>
				<UiButton size="md"> md size </UiButton>
				<UiButton size="lg"> lg size </UiButton>
			</div>
		`
	})
}

export const states = {
	render: () => ({
		components: {UiButton},
		template: `
			<div class="helper-grid">
				<UiButton disabled> disabled </UiButton>
				<UiButton pill> pill </UiButton>
				<UiButton squared> squared </UiButton>
				<UiButton loading> loading </UiButton>
				<UiButton active> active </UiButton>
				<UiButton tag='span'> tag span </UiButton>
			</div>
		`
	})
}

export const group = {
	render: () => ({
		components: {UiButton, UiButtonGroup},
		template: `
			<div class="helper-grid">
				<UiButtonGroup disabled>
					<UiButton> first </UiButton>
					<UiButton> third </UiButton>
					<UiButton> squared </UiButton>
				</UiButtonGroup>
			</div>
		`
	})
}
