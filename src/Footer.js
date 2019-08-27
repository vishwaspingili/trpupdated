import React from 'react'
import { yellow } from '@material-ui/core/colors';

function Footer() {
    const footerstyle = {
        position:'absolute',
        bottom:'100',
        width:'100%',
        height:'auto',   /* Height of the footer */
        textAlign:'center',
        backgroundColor: '#007914',
        padding: '20px'
    }
    return (
        <div>
            <h5 style={footerstyle}>@2019 Copyrights Technocomplnc. All Rights Reserver</h5>
        </div>
    )
}

export default Footer;