import {fn} from '@storybook/test'
import type {Meta, StoryObj} from '@storybook/vue3'

import Button from '@/ui-kit/button/button.vue'
import ButtonGroup from '@/ui-kit/button/button-group.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Button',
	component: Button,
	tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
	render: (args) => ({
		components: {Button},
		setup() {
			return {args}
		},
		template: `
			<Button v-bind='args'> default</Button>
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
		components: {Button},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<Button variant='primary'> button content </Button>
				<Button variant='secondary' > button content </Button>
				<Button variant='success'> button content </Button>
				<Button variant='danger'> button content </Button>
				<Button variant='warning'> button content </Button>
				<Button variant='info'> button content </Button>
				<Button variant='light'> button content </Button>
				<Button variant='dark'> button content </Button>
				<Button variant='secondary'> button content </Button>

				<Button variant='outline-primary'> button content </Button>
				<Button variant='outline-secondary'> button content </Button>
				<Button variant='outline-success'> button content </Button>
				<Button variant='outline-danger'> button content </Button>
				<Button variant='outline-warning'> button content </Button>
				<Button variant='outline-info'> button content </Button>
				<Button variant='outline-dark'> button content </Button>
				<Button variant='outline-light'> button content </Button>
				<Button variant='link'> button content </Button>
			</div>
		`
	})
}

export const Sizes: Story = {
	render: (args) => ({
		components: {Button},
		setup() {
			return {args}
		},
		template: `
			<div class="helper-grid">
				<Button size="sm"> sm size </Button>
				<Button size="md"> md size </Button>
				<Button size="lg"> lg size </Button>
			</div>
		`
	})
}

export const states = {
	render: () => ({
		components: {Button},
		template: `
			<div class="helper-grid">
				<Button disabled> disabled </Button>
				<Button pill> pill </Button>
				<Button squared> squared </Button>
				<Button loading> loading </Button>
				<Button active> active </Button>
				<Button tag='span'> tag span </Button>
			</div>
		`
	})
}

export const group = {
	render: () => ({
		components: {Button, ButtonGroup},
		template: `
			<div class="helper-grid">
				<ButtonGroup disabled>
					<Button> first </Button>
					<Button> third </Button>
					<Button> squared </Button>
				</ButtonGroup>
			</div>
		`
	})
}
