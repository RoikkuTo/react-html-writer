import React, { useEffect, useState, useReducer, Children, cloneElement, useRef, useCallback } from 'react'
import OCTag from './ocTag'
import Cursor from './cursor'
import Timeline from '../lib/bundle.es'

import styles from '../style/style.css'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

export const String = ({ text = "", style = {}, nth, parentQueue, parentDispatch }) => {
	const timeline = useRef(null)
	const globalRefs = useRef({
		len: text.length,
		delay: 485,
		cursor: 0,
		prevent: false
	})
	const [str, setStr] = useState('')

	const taskCallback = useCallback(({ currentTime }) => {
		if (currentTime >= globalRefs.current.delay) {
			setStr(prev => prev + text[globalRefs.current.cursor])
			globalRefs.current.cursor++
			globalRefs.current.delay = currentTime + rand(95, 175)
		}

		if (globalRefs.current.cursor >= globalRefs.current.len && !globalRefs.current.prevent) {
			globalRefs.current.prevent = true
			timeline.current.stop().delete()
			parentDispatch({ type: 'INCREMENT' })
		}
	}, [setStr, parentDispatch])

	useEffect(() => { timeline.current = new Timeline({ id: Math.random() }) }, [])

	useEffect(() => { timeline.current.setTask(taskCallback) }, [taskCallback])

	useEffect(() => {
		if (parentQueue === nth) {
			setTimeout(() => timeline.current.start(), rand(150, 200))
		}
	}, [parentQueue, nth])

	return (
		<div className={`${styles.hwe} ${styles.string}`} style={style}>
			<span>{str}</span>
			<Cursor blinkDep={str} display={parentQueue === nth} />
		</div>
	)
}

const reducer = (queue, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return queue + 1

		case 'RESET':
			return 0

		default:
			return queue
	}
}

export const Tag = ({
	tagName,
	children = [],
	open,
	nth,
	attr = {},
	loop,
	parentQueue,
	parentDispatch
}) => {
	const endOfQueue = useRef(Children.count(children) + 2)
	const [queue, dispatch] = useReducer(reducer, -1)
	const [state, setState] = useState({
		isOpen: false,
		isSelect: false,
		isDisplay: true
	})

	useEffect(() => {
		parentQueue === nth && dispatch({ type: 'INCREMENT' })
	}, [parentQueue, nth])

	useEffect(() => {
		if (parentDispatch && nth !== undefined && queue === endOfQueue.current) {
			parentDispatch({ type: 'INCREMENT' })
		}

		if (queue === endOfQueue.current && loop !== undefined) {
			setTimeout(() => {
				setState(prev => ({ ...prev, isSelect: true }))

				setTimeout(() => {
					setState(prev => ({ ...prev, isDisplay: false }))

					setTimeout(() => {
						setState(prev => ({
							...prev,
							isSelect: false,
							isDisplay: true
						}))
						dispatch({ type: 'RESET' })
					}, loop === true ? 0 : loop)
				}, 1000)
			}, 1000)
		}
	}, [queue, nth, loop, parentDispatch])

	return (
		<>
			{state.isDisplay &&
				<div
					className={`${styles.hwe} ${styles.tag} 
				${(state.isOpen ? styles['tag--open'] : styles['tag--close'])}
				${(state.isSelect ? styles['tag--select'] : '')}`}
				>
					<OCTag {...{ tagName, attr, queue, dispatch }} opening />
					<div className={`${styles.hwe} ${styles.content}`}>
						{
							Children.map(children, (child, i) => cloneElement(child, {
								nth: i + 2,
								parentQueue: queue,
								parentDispatch: dispatch
							}))
						}
					</div>
					<OCTag
						{...{ tagName, queue, dispatch }}
						shouldOpen={[open, () => setState(prev => ({ ...prev, isOpen: true }))]}
					/>
				</div>
			}
			{/* <Cursor display={parentQueue === nth && (queue === -1 || queue === endOfQueue.current)} /> */}
		</>
	)
}
