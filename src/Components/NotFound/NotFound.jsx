import { useState } from 'react'
import Style from './NotFound.module.css'
import { useEffect } from 'react'

function NotFound() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting NotFound');
    } , [])
    return (
        <div>
            <h2>NotFound</h2>
            <p>Error Loading this page</p>
        </div>
    )
}

export default NotFound
