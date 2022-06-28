import 'styled-components'
import type { CSSProperties as ReactCSSProperties } from 'react'
import type defaultTheme from './style/theme.style'

declare module 'styled-components' {
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
}
