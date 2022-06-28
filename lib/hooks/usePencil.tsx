import { rand } from '@lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

type pencilTarget = {
	idx: number
	keys: string[]
	readonly key: string
}

export interface ContainerEvents {
	onStart?: () => void
	onChange?: (i: number) => void
	onPause?: () => void
	onEnd?: () => void
	deps?: any[]
}

export interface PencilEvents {
	onStart?: (pencilTarget: pencilTarget) => void
	onPause?: (pencilTarget: pencilTarget) => void
	onEnd?: (pencilTarget: pencilTarget) => void
	deps?: any[]
}

export default function usePencil<T extends Tobj<string>>(content: T, e?: PencilEvents) {
	const [pencil, setPencil] = useState(Object.fromEntries(Object.keys(content).map(key => [key, ''])))
	const [{ isRunning, isPaused }, setState] = useState({
		isRunning: false,
		isPaused: false
	})
	const mem = useRef(content)
	const timeout = useRef<any>()
	const cursorMem = useRef(0)
	const pencilTarget = useRef({
		idx: 0,
		keys: Object.keys(pencil),
		get key() {
			return this.keys[this.idx]
		}
	})

	const end = useCallback(() => {
		setState(prev => ({ ...prev, isRunning: false }))
		e?.onEnd?.(pencilTarget.current)
		return
	}, e?.deps || [])

	const write = useCallback((cursor: number) => {
		if (cursor === mem.current[pencilTarget.current.key]?.length) {
			pencilTarget.current.idx++
			cursor = 0
			cursorMem.current = 0

			if (mem.current[pencilTarget.current.key]?.length === 0) {
				setState(prev => ({ ...prev, isRunning: false, isPaused: true }))
				e?.onPause?.(pencilTarget.current)
				cursorMem.current = cursor
				clearTimeout(timeout.current)
				return
			}
		}

		if (pencilTarget.current.key) {
			setPencil(prev => ({
				...prev,
				[pencilTarget.current.key]: prev[pencilTarget.current.key] + mem.current[pencilTarget.current.key][cursor]
			}))
			timeout.current = setTimeout(write, rand(50, 270), cursor + 1)
		} else end()
	}, e?.deps || [])

	const play = useCallback((delay?: number | boolean) => {
		if (pencilTarget.current.key) {
			if (typeof delay === 'boolean' && delay) timeout.current = setTimeout(write, rand(150, 230), cursorMem.current)
			else if (typeof delay === 'number' && delay > -1) timeout.current = setTimeout(write, delay, cursorMem.current)
			else write(cursorMem.current)

			setState({ isRunning: true, isPaused: false })
			e?.onStart?.(pencilTarget.current)
		} else end()
	}, e?.deps || [])

	const pause = useCallback(() => {
		setState(prev => ({ ...prev, isRunning: false }))
		clearTimeout(timeout.current)
		e?.onPause?.(pencilTarget.current)
	}, e?.deps || [])

	const clean = useCallback(() => {
		clearTimeout(timeout.current)
		const nextPencil = Object.fromEntries(Object.keys(mem.current).map(key => [key, '']))
		cursorMem.current = 0
		pencilTarget.current.idx = 0
		pencilTarget.current.keys = Object.keys(nextPencil)
		setState({ isRunning: false, isPaused: false })
		setPencil(nextPencil)
	}, e?.deps || [])

	useEffect(
		() => () => {
			clearTimeout(timeout.current)
		},
		[]
	)

	return {
		pencil,
		play,
		pause,
		clean,
		pencilTarget: pencilTarget.current,
		isRunning,
		isPaused
	}
}
