import { useState } from 'react'
import { useEffect } from 'react'

function Allorders() {
    
    useEffect(()=> {
        console.log('Mounting Allorders');
    } , [])
    return (
        <div className='pt-28'>
            <h2>Allorders</h2>
        </div>
    )
}

export default Allorders
