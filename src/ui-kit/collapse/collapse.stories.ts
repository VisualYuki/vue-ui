import type {Meta, StoryObj} from '@storybook/vue3'

import Collapse from '@/ui-kit/collapse/collapse.vue'
import CollapseItem from '@/ui-kit/collapse/collapse-item.vue'

const meta = {
	title: 'Collapse',
	component: Collapse,
	tags: ['autodocs']
} satisfies Meta<typeof Collapse>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: {Collapse, CollapseItem},
		setup() {
			return {args}
		},
		template: `
			<Collapse v-bind='args'>
				<CollapseItem name='1' title='ttile1'> content </CollapseItem>
				<CollapseItem name='2' title='title2'> content</CollapseItem>
				<CollapseItem name='3' title='title3'> content </CollapseItem>
			</Collapse>
		`
	}),
	argTypes: {
		accordion: {
			control: 'boolean'
		}
	},
	args: {
		accordion: false,
		modelValue: ['2', '3']
	}
}

export const Accordion: Story = {
	render: (args) => ({
		components: {Collapse, CollapseItem},
		setup() {
			return {args}
		},
		template: `
			<Collapse v-bind='args'>
				<CollapseItem name='1' title='ttile1'> content </CollapseItem>
				<CollapseItem name='2' title='title2'> content</CollapseItem>
				<CollapseItem name='3' title='title3'> content </CollapseItem>
			</Collapse>
		`
	}),
	argTypes: {
		accordion: {
			control: 'boolean'
		}
	},
	args: {
		accordion: true,
		modelValue: ['2']
	}
}
