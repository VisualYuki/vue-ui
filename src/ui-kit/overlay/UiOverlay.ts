import './overlay.scss'

import {useNamespace} from '@/utils/use-namespace'
import {useSameTarget} from '@/utils/use-same-target'
import {defineComponent, h, renderSlot, type CSSProperties} from 'vue'
const ns = useNamespace('overlay')

export default defineComponent({
	name: 'UiOverlay',
	props: {
		mask: {
			type: Boolean,
			default: true
		}
	},
	emits: {
		click: (evt: MouseEvent) => evt instanceof MouseEvent
	},
	setup(props, {slots, emit}) {
		function onMaskClick(e: MouseEvent) {
			emit('click', e)
		}

		const {onMousedown, onMouseup, onClick} = useSameTarget(onMaskClick)

		return () => {
			return h(
				'div',
				{
					class: [ns.b(), 'default-transition', {[ns.m('mask')]: props.mask}],
					style: {
						zIndex: '2000'
					} satisfies CSSProperties,
					onMousedown,
					onMouseup,
					onClick
				},
				[renderSlot(slots, 'default')]
			)
		}
	}
})
