import 'styled-components'
import { HTMLWriterTheme } from './components/types'

declare module 'styled-components' {
	export interface Theme extends HTMLWriterTheme {}
}
