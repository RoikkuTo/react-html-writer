import React, { useEffect, useState } from 'react'
import Closing from './Closing'
import Opening from './Opening'
import useHand from '@lib/hooks/useHand'
import { ContainerEvents } from '@lib/hooks/usePencil'
import styles from '@lib/style/style.module.css'
import { rand } from '@lib/utils'

interface TagProps extends ContainerEvents {
	name: string
	attr?: Tobj<string>
	open?: boolean
	loop?: boolean | number
	shouldWrite?: boolean
	shouldClean?: boolean | number
	isChild?: boolean
	isIndented?: boolean
	children?: React.ReactNode
}

interface ContainerProps {
	isOpen: boolean
	isSelected: boolean
	children?: React.ReactNode
}

const Container = ({ isOpen, isSelected, children }: ContainerProps) => {
	return (
		<div
			className={`${styles.hwe} ${styles.tag} 
				${isOpen ? styles['tag--open'] : styles['tag--close']}
				${isSelected ? styles['tag--select'] : ''}`}
		>
			{children}
		</div>
	)
}

export default function Tag({ name, open, attr = {}, loop, shouldWrite, shouldClean, isChild, isIndented, children, onEnd }: TagProps) {
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
		<>
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
				<div className={`${styles.hwe} ${styles.content}`}>
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
		</>
	)
}
