import React, { useEffect, useState, useReducer, Children, cloneElement, useRef } from 'react'
import OpenTag from './openTag'
import CloseTag from './closeTag'
import Cursor from './cursor'

import './style.css'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

export const String = ({ text = "", style = {}, nth, parentQueue, parentDispatch }) => {
    const loop = useRef(null)
    const [str, setStr] = useState('')
    const len = text.length

    useEffect(() => {
        const animate = (timestamp, delay, cursor = 0, initialTimestamp = undefined) => {
            initialTimestamp = initialTimestamp || timestamp

            if (timestamp - initialTimestamp >= delay) {
                setStr(prev => prev + text[cursor])
                cursor++
                delay += rand(95, 175)
            }

            if (parentQueue === nth && cursor < len) {
                loop.current = requestAnimationFrame(timestamp => animate(timestamp, delay, cursor, initialTimestamp))
            } else if (parentQueue === nth && cursor === len) {
                setTimeout(() => parentDispatch({ type: 'INCREMENT' }), 500)
                cancelAnimationFrame(loop.current)
            }
        }

        if (parentQueue === nth) loop.current = requestAnimationFrame(timestamp => animate(timestamp, 485))

        return () => cancelAnimationFrame(loop.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentQueue])

    return (
        <div className="hwe string" style={style}>
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
    const endNb = useRef(Children.count(children) + 2)
    const [queue, dispatch] = useReducer(reducer, -1)
    const [state, setState] = useState({
        isOpen: false,
        isSelect: false,
        isDisplay: true
    })

    useEffect(() => {
        if (parentQueue === nth)
            dispatch({ type: 'INCREMENT' })
    }, [parentQueue, nth])

    useEffect(() => {
        if (nth !== undefined && queue === endNb.current)
            parentDispatch({ type: 'INCREMENT' })

        if (queue === endNb.current && loop !== undefined) {
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
            {
                state.isDisplay ? (
                    <div className={`hwe tag ${ (state.isOpen ? 'tag--open' : 'tag--close') } ${ (state.isSelect ? 'tag--select' : '') }`}>
                        <OpenTag {...{ tagName, attr, queue, dispatch }} />
                        <div className="hwe content">
                            {
                                Children.map(children, (child, i) => cloneElement(child, {
                                    nth: i + 2,
                                    parentQueue: queue >= 2 ? queue : null,
                                    parentDispatch: dispatch
                                }))
                            }
                        </div>
                        <CloseTag {...{ tagName, queue, dispatch }} shouldOpen={[
                            open,
                            () => setState(prev => ({ ...prev, isOpen: true }))
                        ]} />
                    </div>
                ) : <Cursor display={true} />
            }
        </>
    )
}
