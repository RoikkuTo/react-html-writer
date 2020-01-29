import React, { useEffect, useState } from "react"
import Cursor from "./cursor"

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

const CloseTag = ({ tagName, queue, dispatch, shouldOpen }) => {
    const [[cursor, val], setCursor] = useState([0, ''])
    const patternTag = '</' + tagName + '>'
    const len = patternTag.length

    const write = () => {
        if (queue === 1 && cursor < len) {
            setTimeout(() => {
                setCursor(([cursor, val]) => [cursor + 1, val + patternTag[cursor]])
            }, rand(95, 175))

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
        }
    }

    useEffect(write, [cursor, queue])

    return (
        <div className="html-writer-element close-tag">
            <span className="tag-hook">{val.slice(0, 2)}</span>
            <span className="tag-name">{val.slice(2, patternTag.length - 1)}</span>
            <span className="tag-hook">{val[patternTag.length - 1]}</span>
            <Cursor blinkDep={val} display={queue === 1} />
        </div>
    )
}

export default CloseTag