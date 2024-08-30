import { useRef, useState } from 'react'
import Style from './MainSlider.module.css'
import { useEffect } from 'react'


import img_1 from '../../assets/imgs/main-slider-1.jpeg'
import img_2 from '../../assets/imgs/main-slider-2.jpeg'
import img_3 from '../../assets/imgs/main-slider-3.jpeg'
import img_4 from '../../assets/imgs/slide-1.jpeg'
import img_5 from '../../assets/imgs/slide-2.jpeg'
import Slider from 'react-slick'
function MainSlider() {


    var settings = {
        dots: false,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
    };
    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    }
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        console.log('Mounting MainSlider');
    }, [])
    return (
        <div className='grid grid-cols-12 mb-4'>
            {/* <div className="md:col-span-8 "> */}
            <Slider ref={sliderRef} {...settings} className=' col-span-12 md:col-span-8 '>
                <img className='h-[400px] w-full object-cover object-right' src={img_1} alt="" />
                <img className='h-[400px] w-full object-cover object-right' src={img_1} alt="" />
                <img className='h-[400px] w-full object-cover object-right' src={img_1} alt="" />
            </Slider>
            {/* </div> */}
            <div className=" col-span-12 md:col-span-4   bg-sky-400">
                <img className='md:h-[200px] w-full ' src={img_2} alt="" />
                <img className='md:h-[200px] w-full ' src={img_3} alt="" />
            </div>
            <div className='text-center '>
                <button className="button w-4 h-2 rounded-lg bg-gray-400 hover:bg-gray-600 duration-300 dark:bg-gray-100 dark:hover:bg-gray-400 mr-2" onClick={previous}>
                </button>
                <button className="button w-4 h-2 rounded-lg bg-gray-400 hover:bg-gray-600 duration-300 dark:bg-gray-100 dark:hover:bg-gray-400" onClick={next}>
                </button>
            </div>
        </div>
    )
}

export default MainSlider
