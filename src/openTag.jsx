import React, { useEffect, useState, useRef } from 'react'
import useParseData from './useParseData'
import AttrList from './attrlist'
import Cursor from './cursor'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

const OpenTag = ({ tagName, queue, dispatch, attr = {} }) => {
    const loop = useRef(null)
    const [str, setStr] = useState({
        tag: '',
        tagName: '',
        attr: ''
    })
    const { parsedData, iterationCount } = useParseData({ tagName, attr })

    useEffect(() => {
        const animate = (timestamp, delay, cursor = 0, initialTimestamp = undefined) => {
            initialTimestamp = initialTimestamp || timestamp

            if (timestamp - initialTimestamp >= delay) {
                setStr(prev => ({
                    tag: prev.tag + (parsedData[cursor][1] === 'tag' ? parsedData[cursor][0] : ''),
                    tagName: prev.tagName + (parsedData[cursor][1] === 'tagName' ? parsedData[cursor][0] : ''),
                    attr: parsedData[cursor][1] === 'attr' && parsedData[cursor]
                }))
                cursor++
                delay += rand(95, 175)
            }

            if (queue === 0 && cursor < iterationCount) {
                requestAnimationFrame(timestamp => animate(timestamp, delay, cursor, initialTimestamp))
            } else if (queue === 0 && cursor === iterationCount) {
                dispatch({ type: 'INCREMENT' })
                cancelAnimationFrame(loop.current)
            }
        }

        if (queue === 0) loop.current = requestAnimationFrame(timestamp => animate(timestamp, 485))

        return () => cancelAnimationFrame(loop.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queue, dispatch])

    return (
        <div className="html-writer-element open-tag">
            <span className="tag-hook">{str.tag[0]}</span>
            <span className="tag-name">{str.tagName}</span>
            <AttrList char={str.attr} />
            <span className="tag-hook">{str.tag[1]}</span>
            <Cursor blinkDep={str} display={queue === 0} />
        </div>
    )
}

export default OpenTag