import React, { useEffect, useState } from 'react'
import AttrList from './Attr/AttrList'
import usePencil, { ContainerEvents } from '@lib/hooks/usePencil'
import styles from '@lib/style/style.module.css'
import Cursor from '../Cursor'
import { rand } from '@lib/utils'

interface OpeningProps {
	name: string
	attr: obj
	shouldWrite: boolean
	shouldClean: boolean | number
	shouldDisplayCursor: boolean
	isIndented?: boolean
}

export default function Opening({ name, attr, shouldWrite, shouldClean, shouldDisplayCursor, isIndented, onEnd }: OpeningProps & ContainerEvents) {
	const [shouldWriteAttr, setShouldWriteAttr] = useState(false)
	const { pencil, play, clean, isRunning, isPaused } = usePencil(
		{
			oHook: '<',
			name,
			attr: '',
			cHook: '>'
		},
		{
			onPause(pencilTarget) {
				if (pencilTarget.key === 'attr') setShouldWriteAttr(true)
			},
			onEnd() {
				onEnd?.()
				setShouldWriteAttr(false)
			}
		}
	)

	useEffect(() => {
		if (shouldClean) clean()
	}, [shouldClean])

	useEffect(() => {
		if (shouldWrite && !isRunning && !isPaused) play(!isIndented || rand(500, 600))
	}, [shouldWrite, isRunning, isPaused])

	return (
		<div className={`${styles.hwe} ${styles['open-tag']}`}>
			<span className={`${styles.hwe} ${styles['open-tag__hook']}`}>{pencil.oHook}</span>
			<span className={`${styles.hwe} ${styles['open-tag__name']}`}>{pencil.name}</span>
			<AttrList attr={attr} shouldWrite={shouldWriteAttr} shouldClean={shouldClean} onEnd={play} />
			<span className={`${styles.hwe} ${styles['open-tag__hook']}`}>{pencil.cHook}</span>
			<Cursor display={(shouldWrite || shouldDisplayCursor) && !shouldWriteAttr} blinkDeps={[pencil]} />
		</div>
	)
}
