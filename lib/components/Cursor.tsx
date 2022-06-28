import { CursorContainer } from '@lib/style/index.style'
import React, { useEffect, useState } from 'react'

interface CursorProps {
	blinkDeps?: any[]
	display: boolean
}

export default function Cursor({ blinkDeps, display }: CursorProps) {
	const [bool, setBool] = useState(false)

	useEffect(() => {
		const blink = setTimeout(() => setBool(true), 350)
		return () => {
			clearTimeout(blink)
			setBool(false)
		}
	}, [...(blinkDeps || [])])

	return (
		<CursorContainer hidden={!display} blink={bool}>
			&#8205;
		</CursorContainer>
	)
}
