export type TreeNode = {
	label: string
	children?: TreeNode[]
	expanded: boolean
}

export type RawDataItem = {
	[index: string]: string | RawDataItem[] | undefined
	label?: string
	children?: RawDataItem[]
}
