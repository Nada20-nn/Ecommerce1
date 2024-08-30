import { useState } from 'react'
import Style from './TemplateName.module.css'
import { useEffect } from 'react'

function TemplateName() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting TemplateName');
    } , [])
    return (
        <div>
            <h2>TemplateName</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}

export default TemplateName
