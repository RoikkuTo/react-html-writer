import React, { useEffect, useState } from 'react'
import styles from '../style/style.module.css'

interface CursorProps {
	blinkDeps?: any[]
	display: boolean
}

export default function Cursor({ blinkDeps, display }: CursorProps) {
	const [bool, setBool] = useState(false)

	useEffect(() => {
		const blink = setTimeout(() => setBool(true), 350)
		return () => {
			clearTimeout(blink)
			setBool(false)
		}
	}, [...(blinkDeps || [])])

	return display ? <span className={`${styles.hwe} ${styles.cursor} ${bool ? styles['cursor--blink'] : ''}`}>&#8205;</span> : null
}
