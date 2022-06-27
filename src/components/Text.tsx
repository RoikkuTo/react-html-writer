import React, { useEffect, useState } from 'react'
import usePencil, { ContainerEvents } from '@lib/hooks/usePencil'
import Cursor from './Cursor'
import styles from '../style/style.module.css'
import { rand } from '@lib/utils'

interface StringProps extends ContainerEvents {
	text: string
	style?: Tobj<string>
	shouldWrite?: boolean
	shouldClean?: boolean | number
	isChild?: boolean
	isIndented?: boolean
	loop?: boolean | number
}

export default function Text({ text, style, shouldWrite, shouldClean, isChild, isIndented, loop, onEnd }: StringProps) {
	const [state, setState] = useState({
		isOpen: false,
		isSelected: false,
		loopCount: 0
	})
	const { pencil, play, clean } = usePencil(
		{ text },
		{
			onEnd() {
				onEnd?.()
				if (!isChild && (loop || (typeof loop === 'number' && state.loopCount < loop))) {
					setTimeout(() => {
						setState(prev => ({ ...prev, isSelected: true }))
						setTimeout(() => setState(prev => ({ ...prev, isSelected: false, loopCount: prev.loopCount + 1 })), 1000)
					}, 2000)
				}
			},
			deps: [state.loopCount]
		}
	)

	useEffect(() => {
		if (shouldClean) clean()
	}, [shouldClean])

	useEffect(() => {
		if (!isChild || shouldWrite) play(!isIndented || rand(500, 600))
	}, [shouldWrite])

	return (
		<div className={`${styles.hwe} ${styles.string}`} style={style}>
			<span>{pencil.text}</span>
			<Cursor display={!!shouldWrite} blinkDeps={[pencil]} />
		</div>
	)
}
