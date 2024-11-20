import type {Meta, StoryObj} from '@storybook/vue3'
import '/src/theme/scss/index.scss'
import UiAlert from '@/ui-kit/alert/UiAlert.vue'
import {Colors} from '@/types/unions'

const meta = {
	title: 'UiAlert',
	component: UiAlert,
	tags: ['!autodocs']
} satisfies Meta<typeof UiAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: {UiAlert},
		setup() {
			return {args}
		},
		template: `
			<UiAlert v-bind='args'> </UiAlert>
		`
	}),
	argTypes: {
		type: {
			control: 'select',
			options: Colors
		},
		center: {
			control: 'boolean'
		},
		closable: {
			control: 'boolean'
		},
		title: {
			control: 'text'
		},
		modelValue: {
			control: 'boolean'
		},
		description: {
			control: 'text'
		},
		showIcon: {
			control: 'boolean'
		}
	},
	args: {
		type: 'info',
		closable: true,
		center: false,
		title: 'title 1',
		description: 'description 1',
		showIcon: false,
		modelValue: true
	}
}
