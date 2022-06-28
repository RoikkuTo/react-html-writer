import { useEffect, useRef, useState } from 'react'
import { ContainerEvents } from './usePencil'

export default function useHand(init: number, max: number, e?: Exclude<ContainerEvents, 'onPause'>) {
	const initRef = useRef(init)
	const [hand, setHand] = useState(initRef.current)
	const [isFinished, setIsFinished] = useState(false)

	useEffect(() => {
		e?.onChange?.(hand)
		if (!isFinished && hand >= max /* || hand < 0 */) {
			setIsFinished(true)
			e?.onEnd?.()
		}
	}, [hand, isFinished, ...(e?.deps || [])])

	return {
		hand,
		init: initRef.current,
		max,
		setHand,
		isFinished,
		incrementHand: (condition: boolean | ((prev: number, init: number) => boolean) = true) =>
			setHand(prev =>
				(typeof condition === 'function' && condition(prev, initRef.current)) || (typeof condition !== 'function' && condition)
					? prev + 1
					: prev
			),
		derementHand: (condition: boolean | ((prev: number, init: number) => boolean)) =>
			setHand(prev =>
				(typeof condition === 'function' && condition(prev, initRef.current)) || (typeof condition !== 'function' && condition)
					? prev - 1
					: prev
			),
		reset: () => {
			setHand(initRef.current)
			setIsFinished(false)
		}
	}
}
