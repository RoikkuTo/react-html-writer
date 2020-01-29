import React, { useEffect, useState } from 'react'

const Attr = ({ char }) => {
    const [str, setStr] = useState({
        name: '',
        value: '',
        symbol: ''
    })

    const write = () => {
        setStr(prev => ({
            name: prev.name + (char[2] === 'attrName' ? char[0] : ''),
            value: prev.value + (char[2] === 'attrValue' ? char[0] : ''),
            symbol: prev.symbol + (char[2] === 'attrSymbol' ? char[0] : '')
        }))
    }

    useEffect(write, [char])

    return (
        <span className="attr">
            <span className="name">{str.name}</span>
            <span className="symbol">{str.symbol}</span>
            <span className="value">{str.value}</span>
        </span>
    )
}

const AttrList = ({ char }) => {
    const [list, setList] = useState([])

    useEffect(() => {
        setList(prev => {
            const indexChar = char[3]
            if (char) prev[indexChar] = <Attr key={indexChar} char={char} />
            return prev
        })
    }, [char])

    return <span className="tag-attr-list">{list}</span>
}

export default AttrList