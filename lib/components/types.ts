import type { CSSProperties as ReactCSSProperties } from 'react'

export interface PrimaryComponent {
	shouldWrite?: boolean
	shouldClean?: boolean | number
	isChild?: boolean
	isIndented?: boolean
	loop?: boolean | number
}

export namespace HTMLWriter {
	export interface Theme {
		cursorColor?: ReactCSSProperties['color']
		textColor?: ReactCSSProperties['color']
		tagHookColor?: ReactCSSProperties['color']
		tagNameColor?: ReactCSSProperties['color']
		attrNameColor?: ReactCSSProperties['color']
		attrSymbolColor?: ReactCSSProperties['color']
		attrQuoteColor?: ReactCSSProperties['color']
		attrValueColor?: ReactCSSProperties['color']
		selectColor?: ReactCSSProperties['color']
		selectBackgroundColor?: ReactCSSProperties['backgroundColor']

		fontSize?: ReactCSSProperties['fontSize']
		tagTabsize?: ReactCSSProperties['marginLeft']
		fontFamily?: ReactCSSProperties['fontFamily']
	}

	export interface Attr extends Tobj<string> {}
}
