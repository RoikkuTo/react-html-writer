import React, { useEffect, useState } from 'react'

const Cursor = ({ blinkDep = undefined, display = false }) => {
    const [bool, setBool] = useState(false)

    useEffect(() => {
        const blink = setTimeout(() => setBool(true), 350)
        return () => {
            clearTimeout(blink)
            setBool(false)
        }
    }, [blinkDep])

    return display && <span className={`cursor${ bool ? ' blink' : '' }`}>&#8205;</span>
}

export default Cursor