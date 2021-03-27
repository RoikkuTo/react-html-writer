import React, { useEffect, useMemo, useRef, useState } from 'react'

import styles from '../style/style.css'

const Attr = ({ currGroup, cursor, idx, type, value }) => {
	const str = useRef({
		name: '',
		value: '',
		symbol: ''
	})
	const t = useRef('')

	useEffect(() => {
		if (currGroup === idx) {
			const prev = str.current
			str.current = {
				attr: prev.attr + (type === 'attr' ? value[cursor] : ''),
				equal: prev.symbol + (type === 'equal' ? value[cursor] : ''),
				value: prev.value + (type === 'value' ? value[cursor] : '')
			}
		}
	}, [currGroup, cursor, idx])

	return (
		<span className={`${styles.hwe} ${styles['tag-attr']}`}>
			<span className={`${styles.hwe} ${styles['tag-attr__name']}`}>{str.current.name}</span>
			<span className={`${styles.hwe} ${styles['tag-attr__symbol']}`}>{str.current.symbol}</span>
			<span className={`${styles.hwe} ${styles['tag-attr__value']}`}>{str.current.value}</span>
		</span>
	)
}

const AttrList = ({ pencil, data }) => {
	// const [list, setList] = useState([])

	// useEffect(() => {
	// 	setList(prev => {
	// 		const indexChar = char[3]
	// 		if (char) prev[indexChar] = <Attr key={indexChar} char={char} />
	// 		return prev
	// 	})
	// }, [char])

	// const res = []
	// data.forEach((group, i) => group.type === 'attr' && res.push(data.slice(i, i + 3)))
	// <Attr key={Math.random()} currGroup={currGroup} cursor={cursor} idx={i + 2} {...group} />

	const tab = useMemo(() => data.map((elm, i) => {
		switch (elm.type) {
			case 'attr': return {
				...elm,
				idx: i + 2,
				str: '',
				component(group, cursor) {
					if (group === this.idx) this.str += this.value[cursor] || ''
					return <span key={this.value + i} className={`${styles.hwe} ${styles['tag-attr__name']}`}>{this.str}</span>
				}
			}
			case 'equal': return {
				...elm,
				idx: i + 2,
				str: '',
				component(group, cursor) {
					if (group === this.idx) this.str += this.value[cursor] || ''
					return <span key={this.value + i} className={`${styles.hwe} ${styles['tag-attr__symbol']}`}>{this.str}</span>
				}
			}
			case 'value': return {
				...elm,
				idx: i + 2,
				str: '',
				component(group, cursor) {
					if (group === this.idx) this.str += this.value[cursor] || ''
					return <span key={this.value + i} className={`${styles.hwe} ${styles['tag-attr__value']}`}>{this.str}</span>
				}
			}
		}
	}), [])

	const { group, cursor } = pencil

	return (
		<span>
			{tab.map(elm => elm.component(group, cursor))}
		</span>
	)
}

export default AttrList
