import { useMemo } from "react"

const useParseData = ({ tagName, attr }) => useMemo(() => {
    const tagCharArray = tagName.split('').map(item => [item, 'tagName'])

    const attrArray = Object.entries(attr)
    const attrCharArray = () => {
        const temp = attrArray.map((item, i) => [
            [' ', 'attr', 'attrName', i],
            ...item[0].split('').map(char => [char, 'attr', 'attrName', i]),
            ['=', 'attr', 'attrSymbol', i],
            ['"', 'attr', 'attrValue', i],
            ...item[1].split('').map(char => [char, 'attr', 'attrValue', i]),
            ['"', 'attr', 'attrValue', i]
        ])
        var res = []

        for (const item of temp) {
            res = res.concat(item)
        }

        return res
    }

    return {
        parsedData: [['<', 'tag'], ...tagCharArray, ...attrCharArray(), ['>', 'tag']],
        get iterationCount() {
            return this.parsedData.length
        }
    }
}, [tagName, attr])

export default useParseData