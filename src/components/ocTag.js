import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AttrList from './attrlist'
import Cursor from './cursor'
import Timeline from '../lib/bundle.es'

import styles from '../style/style.css'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

export default ({ tagName, dispatch, attr = null, queue, opening, shouldOpen }) => {
	const timeline = useRef(null)
	const globalRefs = useRef({
		delay: 485,
		cursor: 0,
		group: 0,
		prevent: false
	})
	const [attrGroups, setAttrGroups] = useState(null)
	const [pencil, setPencil] = useState({
		oHook: '',
		tagName: '',
		cHook: ''
	})

	const data = useMemo(() => {
		const data = [
			{ type: 'oHook', value: opening ? '<' : '</' },
			{ type: 'tagName', value: tagName },
			{ type: 'cHook', value: '>' }
		]

		if (attr)
			data.splice(2, 0, Object.entries(attr).map(([key, val]) => [
				{ type: 'attr', value: ' ' + key },
				{ type: 'equal', value: '=' },
				{ type: 'value', value: '"' + val + '"' }
			]).flat())

		const res = data.flat()
		setAttrGroups(res.slice(2, res.length - 1))
		return res
	}, [tagName, attr, opening])

	const taskCallback = useCallback(({ currentTime }) => {
		const openingTag = !opening

		if (currentTime >= globalRefs.current.delay && globalRefs.current.group < data.length) {
			setPencil(prev => ({
				oHook: prev.oHook + (data[globalRefs.current.group].type === 'oHook' ? data[globalRefs.current.group].value[globalRefs.current.cursor] : ''),
				tagName: prev.tagName + (data[globalRefs.current.group].type === 'tagName' ? data[globalRefs.current.group].value[globalRefs.current.cursor] : ''),
				cHook: prev.cHook + (data[globalRefs.current.group].type === 'cHook' ? data[globalRefs.current.group].value[globalRefs.current.cursor] : ''),
				group: globalRefs.current.group,
				cursor: globalRefs.current.cursor
			}))

			if (globalRefs.current.cursor === data[globalRefs.current.group].value.length - 1) {
				globalRefs.current.group++
				globalRefs.current.cursor = 0
			} else globalRefs.current.cursor++

			globalRefs.current.delay = currentTime + rand(95, 175)
		}

		if (globalRefs.current.group === data.length && !globalRefs.current.prevent) {
			globalRefs.current.prevent = true
			timeline.current.stop()
			if (openingTag) {
				timeline.current.delete()
				setTimeout(() => {
					dispatch({ type: 'INCREMENT' })
					setTimeout(() => shouldOpen?.[0] && shouldOpen[1](), rand(90, 150))
				}, rand(150, 200))
			} else {
				setTimeout(() => dispatch({ type: 'INCREMENT' }), rand(150, 200))
			}
		}
	}, [opening, dispatch, setPencil])

	useEffect(() => { timeline.current = new Timeline({ id: Math.random() }) }, [])

	useEffect(() => { timeline.current.setTask(taskCallback) }, [taskCallback])

	useEffect(() => {
		opening = opening ? 0 : 1
		if (queue === opening) {
			timeline.current.start()
		}
	}, [queue, opening])

	return (
		<div className={`${styles.hwe} ${styles['open-tag']}`}>
			<span className={`${styles.hwe} ${styles['open-tag__hook']}`}>{pencil.oHook}</span>
			<span className={`${styles.hwe} ${styles['open-tag__name']}`}>{pencil.tagName}</span>
			<AttrList pencil={pencil} data={attrGroups} />
			<span className={`${styles.hwe} ${styles['open-tag__hook']}`}>{pencil.cHook}</span>
			<Cursor blinkDep={pencil} display={queue === 0 && opening || queue === 1 && !opening} />
		</div>
	)
}