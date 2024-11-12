export const Colors = ['primary', 'success', 'danger', 'warning', 'info'] as const
export type ColorType = (typeof Colors)[number]
