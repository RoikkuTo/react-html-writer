import defaultTheme from '../style/theme.style'
import React from 'react'
import { Theme, ThemeProvider } from 'styled-components'

interface ParentProps {
	theme?: Theme
	isChild?: boolean
	children: React.ReactNode
}

export default function Parent({ isChild, theme, children }: ParentProps) {
	return !isChild ? <ThemeProvider theme={{ ...defaultTheme, ...theme }}>{children}</ThemeProvider> : <>{children}</>
}
