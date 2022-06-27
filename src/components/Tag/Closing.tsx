import React, { useEffect } from 'react'
import usePencil, { ContainerEvents } from '@lib/hooks/usePencil'
import styles from '@lib/style/style.module.css'
import Cursor from '../Cursor'

interface ClosingProps {
	name: string
	shouldWrite: boolean
	shouldClean: boolean | number
	shouldDisplayCursor: boolean
}

export default function Opening({ name, shouldWrite, shouldClean, shouldDisplayCursor, onEnd }: ClosingProps & ContainerEvents) {
	const { pencil, play, clean, isRunning, isPaused } = usePencil(
		{
			oHook: '</',
			name,
			cHook: '>'
		},
		{
			onEnd
		}
	)

	useEffect(() => {
		if (shouldClean) clean()
	}, [shouldClean])

	useEffect(() => {
		if (shouldWrite && !isRunning && !isPaused) play()
	}, [shouldWrite, isRunning, isPaused])

	return (
		<div className={`${styles.hwe} ${styles['open-tag']}`}>
			<span className={`${styles.hwe} ${styles['open-tag__hook']}`}>{pencil.oHook}</span>
			<span className={`${styles.hwe} ${styles['open-tag__name']}`}>{pencil.name}</span>
			<span className={`${styles.hwe} ${styles['open-tag__hook']}`}>{pencil.cHook}</span>
			<Cursor display={shouldWrite || shouldDisplayCursor} blinkDeps={[pencil]} />
		</div>
	)
}
