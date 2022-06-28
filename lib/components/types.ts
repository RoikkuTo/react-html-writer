import { Theme } from 'styled-components'

export interface PrimaryComponent {
	theme?: Theme
	shouldWrite?: boolean
	shouldClean?: boolean | number
	isChild?: boolean
	isIndented?: boolean
	loop?: boolean | number
}
