import React, { useEffect, useState } from 'react'
import AttrList from './Attr/AttrList'
import usePencil, { ContainerEvents } from '../../hooks/usePencil'
import { Hook, Name } from '../../style/index.style'
import Cursor from '../Cursor'
import { rand } from '../../utils'

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
		<div>
			<Hook>{pencil.oHook}</Hook>
			<Name>{pencil.name}</Name>
			<AttrList attr={attr} shouldWrite={shouldWriteAttr} shouldClean={shouldClean} onEnd={play} />
			<Hook>{pencil.cHook}</Hook>
			<Cursor display={(shouldWrite || shouldDisplayCursor) && !shouldWriteAttr} blinkDeps={[pencil]} />
		</div>
	)
}
