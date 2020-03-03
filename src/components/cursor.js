import React, { useEffect, useState } from 'react'

import styles from '../style/style.css'

const Cursor = ({ blinkDep = undefined, display = false }) => {
    const [bool, setBool] = useState(false)

    useEffect(() => {
        const blink = setTimeout(() => setBool(true), 350)
        return () => {
            clearTimeout(blink)
            setBool(false)
        }
    }, [blinkDep])

    return display && <span className={`${ styles.hwe } ${ styles.cursor } ${ bool ? styles['cursor--blink'] : '' }`}>&#8205;</span>
}

export default Cursor
