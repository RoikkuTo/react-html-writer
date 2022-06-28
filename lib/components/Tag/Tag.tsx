import React, { useEffect, useState } from 'react'
import Closing from './Closing'
import Opening from './Opening'
import { TagContainer } from '@lib/style/index.style'
import useHand from '@lib/hooks/useHand'
import { ContainerEvents } from '@lib/hooks/usePencil'
import { rand } from '@lib/utils'
import { PrimaryComponent } from '../types'
import Parent from '../Parent'
import { HTMLWriterTheme } from '@lib/types'

interface TagPropsCore {
	name: string
	attr?: Tobj<string>
	theme?: HTMLWriterTheme
	open?: boolean
	children?: React.ReactNode
}

type TagProps = TagPropsCore & PrimaryComponent & ContainerEvents

interface ContainerProps {
	isOpen: boolean
	isSelected: boolean
	children?: React.ReactNode
}

const Container = ({ isOpen, isSelected, children }: ContainerProps) => {
	return (
		<TagContainer isOpen={isOpen} isSelected={isSelected}>
			{children}
		</TagContainer>
	)
}

export default function Tag({ name, open, attr = {}, loop, theme, shouldWrite, shouldClean, isChild, isIndented, children, onEnd }: TagProps) {
	const [state, setState] = useState({
		isOpen: false,
		isSelected: false,
		loopCount: 0
	})

	const { hand, init, isFinished, incrementHand, reset } = useHand(-1, React.Children.count(children) + 2, {
		onChange(i) {
			if (i === 2) open && setTimeout(() => setState(prev => ({ ...prev, isOpen: true })), rand(230, 330))
		},
		onEnd() {
			onEnd?.()
			if (!isChild && (loop || (typeof loop === 'number' && state.loopCount < loop))) {
				setTimeout(() => {
					setState(prev => ({ ...prev, isSelected: true }))
					setTimeout(() => {
						setState(prev => ({ isOpen: false, isSelected: false, loopCount: prev.loopCount + 1 }))
						reset()
						setTimeout(incrementHand, 500)
					}, 1000)
				}, 2000)
			}
		},
		deps: [state.loopCount]
	})

	useEffect(() => {
		if (shouldClean) {
			setState(prev => ({ ...prev, isOpen: false, isSelected: false }))
			reset()
		}
	}, [shouldClean])

	useEffect(() => {
		if (!isChild || shouldWrite) incrementHand((prev, init) => prev === init)
	}, [shouldWrite])

	return (
		<Parent theme={theme} isChild={isChild}>
			<Container {...state}>
				<Opening
					name={name}
					attr={attr}
					shouldWrite={hand === 0}
					onEnd={incrementHand}
					shouldClean={shouldClean || state.loopCount}
					shouldDisplayCursor={!isFinished && shouldWrite === undefined && hand === init}
					isIndented={isIndented}
				/>
				<div>
					{React.Children.map(children, (elm, i) =>
						React.cloneElement(elm as any, {
							shouldWrite: hand === i + 2,
							shouldClean: shouldClean || state.loopCount,
							onEnd: incrementHand,
							isChild: true,
							isIndented: open && i === 0
						})
					)}
				</div>
				<Closing
					name={name}
					shouldWrite={hand === 1}
					shouldClean={shouldClean || state.loopCount}
					shouldDisplayCursor={isFinished && shouldWrite === undefined}
					onEnd={incrementHand}
				/>
			</Container>
		</Parent>
	)
}
