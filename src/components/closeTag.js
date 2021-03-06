import React, { useEffect, useState, useRef } from "react"
import Cursor from "./cursor"

import styles from '../style/style.css'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

const CloseTag = ({ tagName, queue, dispatch, shouldOpen }) => {
    const loop = useRef(null)
    const [str, setStr] = useState('')
    const patternTag = '</' + tagName + '>'
    const len = patternTag.length

    useEffect(() => {
        const animate = (timestamp, delay, cursor = 0, initialTimestamp = undefined) => {
            initialTimestamp = initialTimestamp || timestamp

            if (timestamp - initialTimestamp >= delay) {
                setStr(prev => prev + patternTag[cursor])
                cursor++
                delay += rand(95, 175)
            }

            if (queue === 1 && cursor < len) {
                loop.current = requestAnimationFrame(timestamp => animate(timestamp, delay, cursor, initialTimestamp))
            } else if (queue === 1 && cursor === len) {
                const [open, setIsOpen] = shouldOpen
                if (open) {
                    setTimeout(() => {
                        dispatch({ type: 'INCREMENT' })
                        setTimeout(() => setIsOpen(), 175)
                    }, 200)
                } else {
                    dispatch({ type: 'INCREMENT' })
                }
                cancelAnimationFrame(loop.current)
            }
        }

        if (queue === 1) loop.current = requestAnimationFrame(timestamp => animate(timestamp, rand(95, 175)))

        return () => cancelAnimationFrame(loop.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queue])

    return (
        <div className={`${ styles.hwe } ${ styles['close-tag'] }`}>
            <span className={`${ styles.hwe } ${styles['close-tag__hook'] }`}>{str.slice(0, 2)}</span>
            <span className={`${ styles.hwe } ${styles['close-tag__name'] }`}>{str.slice(2, patternTag.length - 1)}</span>
            <span className={`${ styles.hwe } ${styles['close-tag__hook'] }`}>{str[patternTag.length - 1]}</span>
            <Cursor blinkDep={str} display={queue === 1} />
        </div>
    )
}

export default CloseTag
