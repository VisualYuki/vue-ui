import {NOOP} from '@vue/shared'

export function useSameTarget(handleClick?: (e: MouseEvent) => void) {
	if (!handleClick) {
		return {
			onClick: NOOP,
			onMouseDown: NOOP,
			onMouseUp: NOOP
		}
	}

	let isMouseDownEqualTarget = false
	let isMouseUpEqualTarget = false

	function onClick(e: MouseEvent) {
		if (isMouseUpEqualTarget && isMouseDownEqualTarget && handleClick) {
			handleClick(e)
		}

		isMouseDownEqualTarget = isMouseUpEqualTarget = false
	}

	function onMousedown(e: MouseEvent) {
		isMouseDownEqualTarget = e.target === e.currentTarget
	}

	function onMouseup(e: MouseEvent) {
		isMouseUpEqualTarget = e.target === e.currentTarget
	}

	return {
		onMouseup,
		onMousedown,
		onClick
	}
}
