import { useRef, useState } from 'react'
import Style from './CategorySlider.module.css'
import { useEffect } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import Loading from '../Loading/Loading';

function CategorySlider() {




  const [categories, setCategories] = useState([]);

  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  async function getCategories() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log(data); //!

    setCategories(data?.data)

  }

  useEffect(() => {
    console.log('Mounting CategorySlider');
    getCategories();
  }, [])

  if (categories.length === 0) {
    return <Loading />
  }
  return (
    <>
      <Slider ref={sliderRef} {...settings} >
        {
          categories.map((c) => <div key={c._id} className=''>
            <img className='h-72 w-full object-cover' src={c.image} alt="" />
            <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>

          </div>)
        }
      </Slider>
      <div className='text-center '>
        <button className="button w-4 h-2 rounded-lg bg-gray-400 hover:bg-gray-600 duration-300 dark:bg-gray-100 dark:hover:bg-gray-400 mr-2" onClick={previous}>
        </button>
        <button className="button w-4 h-2 rounded-lg bg-gray-400 hover:bg-gray-600 duration-300 dark:bg-gray-100 dark:hover:bg-gray-400" onClick={next}>
        </button>
      </div>
    </>
  )
}

export default CategorySlider
