import React, { useEffect, useState } from 'react'
import useParseData from './useParseData'
import AttrList from './attrlist'
import Cursor from './cursor'

const rand = (start, end) => Math.round(Math.random() * (end - start) + start)

const OpenTag = ({ tagName, queue, dispatch, attr = {} }) => {
    const [{ cursor, ...str }, setCursor] = useState({
        cursor: 0,
        tag: '',
        tagName: '',
        attr: ''
    })
    const { parsedData, iterationCount } = useParseData({ tagName, attr })

    const write = () => {
        if (queue === 0 && cursor < iterationCount) {
            setTimeout(() => {
                setCursor(({ cursor, ...prev }) => ({
                    cursor: cursor + 1,
                    tag: prev.tag + (parsedData[cursor][1] === 'tag' ? parsedData[cursor][0] : ''),
                    tagName: prev.tagName + (parsedData[cursor][1] === 'tagName' ? parsedData[cursor][0] : ''),
                    attr: parsedData[cursor][1] === 'attr' && parsedData[cursor]
                }))
            }, cursor > 0 ? rand(95, 175) : 485)

        } else if (queue === 0 && cursor === iterationCount) {
            dispatch({ type: 'INCREMENT' })
        }
    }

    useEffect(write, [cursor, queue])

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