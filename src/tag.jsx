import React, { useState, useEffect, useContext } from 'react'

import { QueueProvider, QueueContext } from './queue.jsx'
import String from './string.jsx'

const Attr = ({ data, ...props }) => (
	<span className="tag-attribute">
		<String name="attr" content={' ' + data[0]} index={props.add} />
		<String name="equal" content="=" index={props.add + 1} />
		<String name="value" content={'"' + data[1] + '"'} index={props.add + 2} />
	</span>
)

const AttrList = ({ attr, index }) => {
	const list = Object.entries(attr)
	const [queue, dispatch] = useContext(QueueContext)
	const [target, observe] = useState(0)

	useEffect(() => {
		if (target === list.length * 3 && queue.queue === index) {
			dispatch({ type: 'NEXT' })
		}
	})

	return (
		<QueueProvider observe={observe}>
			{queue.queue >= index && list.map((attr, i) => <Attr key={i} data={attr} add={i * 3} />)}
		</QueueProvider>
	)
}

const Tag = ({ name, attr, ...props }) => {
	const cssClass = props.openTag ? 'openTag' : 'closeTag'
	const [target, observe] = useState(0)

	console.log(target)

	return (
		<QueueProvider observe={observe}>
			<div className={cssClass}>
				<String name="tag-hook" content="<" index={0} />
				<String name="tag-name" content={name} index={1} />
				<AttrList attr={attr || {}} index={2} />
				<String name="tag-hook" content=">" index={3} />
			</div>
		</QueueProvider>
	)
}

//Tgen.calc.rand(95, 175)
//Tgen.calc.rand(500, 600)

export default Tag