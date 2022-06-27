import React, { useEffect } from 'react'
import usePencil, { PencilEvents } from '@lib/hooks/usePencil'
import styles from '@lib/style/style.module.css'
import Cursor from '@lib/components/Cursor'

interface AttrProps extends PencilEvents {
	content: Tobj<string>
	shouldWrite: boolean
	shouldClean: boolean | number
}

export default function Attr({ content, shouldWrite, shouldClean, onStart, onEnd }: AttrProps) {
	const { pencil, play, clean } = usePencil(content, { onStart, onEnd })

	useEffect(() => {
		if (shouldClean) clean()
	}, [shouldClean])

	useEffect(() => {
		if (shouldWrite) play()
	}, [shouldWrite])

	return (
		<span>
			<span className={`${styles.hwe} ${styles['tag-attr__name']}`}>{pencil.key}</span>
			<span className={`${styles.hwe} ${styles['tag-attr__symbol']}`}>{pencil.equal}</span>
			<span className={`${styles.hwe} ${styles['tag-attr__symbol']}`}>{pencil.quote1}</span>
			<span className={`${styles.hwe} ${styles['tag-attr__value']}`}>{pencil.value}</span>
			<span className={`${styles.hwe} ${styles['tag-attr__symbol']}`}>{pencil.quote2}</span>
			<Cursor display={shouldWrite} blinkDeps={[pencil]} />
		</span>
	)
}
