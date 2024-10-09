import {useTimestamp} from '@vueuse/core'
import {ref} from 'vue'

export function useCountdown(options: {interval: number}) {
	const endTimestamp = Date.now() + options.interval

	const {timestamp, pause, resume} = useTimestamp({
		controls: true,

		callback: () => {
			if (endTimestamp - timestamp.value >= 0) {
				remainTime.value = endTimestamp - timestamp.value
			} else {
				remainTime.value = 0
				pause()
			}
		}
	})

	const remainTime = ref(options.interval)

	return {remainTime, pause, resume}
}
