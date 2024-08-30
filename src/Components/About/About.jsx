import { useState } from 'react'
import Style from './About.module.css'
import { useEffect } from 'react'

function About() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting About');
    } , [])
    return (
        <div>
            <h2>Abouttt</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}

export default About
