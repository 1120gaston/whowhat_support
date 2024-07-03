import React, { useState, useRef } from 'react'
import { Input } from 'antd'

const VerifyModal = ({ values, setValues }) => {
    const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const handleChange = (index, e) => {
        const value = e.target.value
        if (/^[0-9]?$/.test(value)) {
            const newValues = [...values]
            newValues[index] = value
            setValues(newValues)

            if (value && index < 3) {
                inputsRef[index + 1].current.focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputsRef[index - 1].current.focus()
        }
    }

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            {values.map((value, index) => (
                <Input
                    key={index}
                    ref={inputsRef[index]}
                    value={value}
                    maxLength={1}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{ height: '70px', width: '70px', textAlign: 'center', fontSize: '30px' }}
                />
            ))}
        </div>
    )
}

export default VerifyModal
