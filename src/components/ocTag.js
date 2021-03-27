import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AttrList from './attrlist'
import Cursor from './cursor'
import Timeline from '../lib/bundle.es'

import styles from '../style/style.css'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

export default ({ tagName, dispatch, attr = null, queue, opening, fakeThink, shouldOpen }) => {
	const timeline = useRef(null)
	const isOTag = useRef(!!opening)
	const globalRefs = useRef({
		delay: 0,
		cursor: 0,
		group: 0,
		prevent: false
	})
	const [idea, setIdea] = useState([])
	const [attrGroups, setAttrGroups] = useState([])
	const [pencil, setPencil] = useState({
		oHook: '',
		tagName: '',
		cHook: ''
	})

	const taskCallback = useCallback(({ currentTime }) => {
		const { delay, cursor, group, prevent } = globalRefs.current

		if (currentTime >= delay && group < idea.length) {
			setPencil(prev => ({
				oHook: prev.oHook + (idea[group].type === 'oHook' ? idea[group].value[cursor] : ''),
				tagName: prev.tagName + (idea[group].type === 'tagName' ? idea[group].value[cursor] : ''),
				cHook: prev.cHook + (idea[group].type === 'cHook' ? idea[group].value[cursor] : ''),
				group: group,
				cursor: cursor
			}))

			if (cursor === idea[group].value.length - 1) {
				globalRefs.current.group++
				globalRefs.current.cursor = 0
			} else globalRefs.current.cursor++

			globalRefs.current.delay = currentTime + rand(95, 175)
		}

		if (group === idea.length && !prevent) {
			globalRefs.current.prevent = true
			timeline.current.stop().delete()
			if (!isOTag.current) {
				setTimeout(() => {
					dispatch({ type: 'INCREMENT' })
					setTimeout(() => shouldOpen(), rand(150, 200))
				}, rand(150, 200))
			} else {
				setTimeout(() => { dispatch({ type: 'INCREMENT' }) }, rand(95, 175))
			}
		}
	}, [idea, dispatch, setPencil, shouldOpen])

	useEffect(() => {
		const data = [
			{ type: 'oHook', value: isOTag.current ? '<' : '</' },
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

		setIdea(res)
		setAttrGroups(res.slice(2, res.length - 1))
	}, [setIdea, setAttrGroups])

	useEffect(() => { timeline.current = new Timeline({ id: Math.random() }) }, [])

	useEffect(() => { timeline.current.setTask(taskCallback) }, [taskCallback])

	useEffect(() => {
		const idx = isOTag.current ? 0 : 1
		if (queue === idx) {
			timeline.current.start()
		}
	}, [queue])

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