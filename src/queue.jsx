import React, { createContext, useReducer } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'NEXT':
            if (state.observe) state.observe(state.queue + 1)
            return {
                ...state,
                queue: state.queue + 1
            }

        case 'PREVIOUS':
            if (state.observe) state.observe(state.queue - 1)
            return {
                ...state,
                queue: state.queue - 1
            }

        default:
            console.error('Error in queue')
            state.observe(state.queue)
            return state
    }
}

export const QueueContext = createContext(null)

export const QueueProvider = ({ children, observe = null }) => {
    const [state, dispatch] = useReducer(reducer, { queue: 0, observe })

    return (
        <QueueContext.Provider value={[state, dispatch]}>
            {children}
        </QueueContext.Provider>
    )
}