import type {Size} from '@/types/size'
import type {ColorType} from '@/types/unions'
import type {InjectionKey} from 'vue'

export const buttonGroupKey: InjectionKey<{
	type?: ColorType
	size?: Size
}> = Symbol('buttonGroupKey')
