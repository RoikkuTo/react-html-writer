import React, { useEffect } from 'react'
import usePencil, { PencilEvents } from '@lib/hooks/usePencil'
import Cursor from '@lib/components/Cursor'
import { AttrName, AttrQuote, AttrSymbol, AttrValue } from '@lib/style/index.style'

type PencilContent = {
	key: string
	symbol: string
}

interface AttrProps extends PencilEvents {
	content: Record<'key' | 'symbol' | 'quote1' | 'value' | 'quote2', string>
	shouldWrite: boolean
	shouldClean: boolean | number
}

export default function Attr({ content, shouldWrite, shouldClean, onStart, onEnd }: AttrProps) {
	const { pencil, play, clean } = usePencil(content, { onStart, onEnd })

	useEffect(() => {
		if (shouldClean) clean()
	}, [shouldClean])

	useEffect(() => {
		if (shouldWrite) play()
	}, [shouldWrite])

	return (
		<span>
			<AttrName>{pencil.key}</AttrName>
			<AttrSymbol>{pencil.symbol}</AttrSymbol>
			<AttrQuote>{pencil.quote1}</AttrQuote>
			<AttrValue>{pencil.value}</AttrValue>
			<AttrQuote>{pencil.quote2}</AttrQuote>
			<Cursor display={shouldWrite} blinkDeps={[pencil]} />
		</span>
	)
}
