import React, { useEffect } from 'react'
import usePencil, { ContainerEvents } from '@lib/hooks/usePencil'
import Cursor from '../Cursor'
import { Hook, Name } from '@lib/style/index.style'

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
		<div>
			<Hook>{pencil.oHook}</Hook>
			<Name>{pencil.name}</Name>
			<Hook>{pencil.cHook}</Hook>
			<Cursor display={shouldWrite || shouldDisplayCursor} blinkDeps={[pencil]} />
		</div>
	)
}
