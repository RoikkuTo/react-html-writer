import React, { useState, useEffect, useContext } from 'react'

import Tgen from '../../library/Tgen/main.js'

import { QueueContext } from './queue.jsx'

const String = ({ index, name, content }) => {
	const [queue, dispatch] = useContext(QueueContext)
	const [string, setString] = useState({
		index: 0,
		value: ''
	})

	useEffect(() => {
		if (string.index < content.length && queue.queue === index) {
			setTimeout(() => setString({
				index: string.index + 1,
				value: string.value + content[string.index]
			}), Tgen.calc.rand(95, 175))
		} else if (queue.queue === index) {
			dispatch({ type: 'NEXT' })
		}
	})

	return <span className={name}>{string.value}</span>
}

export default String