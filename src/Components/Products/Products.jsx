import { useContext, useState } from 'react'
import { useEffect } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts';

function Products() {

    useEffect(() => {
        console.log('Mounting Products');
    }, [])
    return (
        <div className='pt-28'>
            <RecentProducts />
        </div>
    )
}

export default Products
