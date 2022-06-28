import React, { useEffect, useRef } from 'react'
import Attr from './Attr'
import { ContainerEvents } from '@lib/hooks/usePencil'
import useHand from '@lib/hooks/useHand'

interface AttrListProps extends ContainerEvents {
	attr: Tobj<string>
	shouldWrite: boolean
	shouldClean: boolean | number
}

export default function AttrList({ attr, shouldWrite, shouldClean, onEnd }: AttrListProps) {
	const list = useRef(Object.entries(attr))
	const { hand, setHand, incrementHand, reset } = useHand(-1, list.current.length, { onEnd })

	useEffect(() => {
		if (shouldClean) reset()
	}, [shouldClean])

	useEffect(() => {
		if (shouldWrite) setHand(prev => (prev === -1 ? prev + 1 : prev))
	}, [shouldWrite])

	return (
		<>
			{list.current.map(([key, value], i) => (
				<Attr
					key={i}
					content={{ key: ' ' + key, symbol: '=', quote1: '"', value, quote2: '"' }}
					shouldWrite={i === hand}
					shouldClean={shouldClean}
					onEnd={incrementHand as any}
				/>
			))}
		</>
	)
}
