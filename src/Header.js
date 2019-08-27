import React from 'react'

export default function Header() {
    const pStyle = {
        // border: '5px solid pink',
        textAlign: 'center',
        backgroundColor: '#fd8636',
        padding: '10px',
        color: 'black'
    }
    return (
        <div>
            <h1 style={pStyle}>TechnoComp</h1>
        </div>
    )
}
