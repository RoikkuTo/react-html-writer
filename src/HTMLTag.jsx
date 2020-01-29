import React, { useEffect, useState, useReducer, Children, cloneElement, useRef } from 'react'
import './style.scss'
import OpenTag from './openTag'
import CloseTag from './closeTag'
import Cursor from './cursor'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

const String = ({ text = "", style = {}, nth, parentQueue, parentDispatch }) => {
    const [[cursor, val], setCursor] = useState([0, ''])
    const len = text.length

    const write = () => {
        if (parentQueue === nth && cursor < len)
            setTimeout(() => {
                setCursor(([cursor, val]) => [cursor + 1, val + text[cursor]])
            }, cursor > 0 ? rand(95, 175) : 485)

        else if (parentQueue === nth && cursor === len)
            setTimeout(() => parentDispatch({ type: 'INCREMENT' }), 500)
    }

    useEffect(write, [cursor, parentQueue])

    return (
        <div className="html-writer-element string" style={style}>
            <span>{val}</span>
            <Cursor blinkDep={val} display={parentQueue === nth} />
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

const HTMLTag = ({
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
                    <div className={`html-writer-element HTML-tag${ (state.isOpen ? ' open' : '') + (state.isSelect ? ' select' : '') }`}>
                        <OpenTag {...{ tagName, attr, queue, dispatch }} />
                        <div className="content">
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

export { HTMLTag, String }