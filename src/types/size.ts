export const Sizes = ['small', 'default', 'large'] as const

export type Size = (typeof Sizes)[number]
