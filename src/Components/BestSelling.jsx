import React from 'react'
import MainTitle from '../ReusableComponents/MainTitle'
import MainButton from '../ReusableComponents/MainButton'
import SecondTitle from '../ReusableComponents/SecondTitle'
import ProductSlider from '../ReusableComponents/ProductSlider'

export default function BestSelling() {
  return (
    <div className='container pt-5'>
        <MainTitle title={'This Month'} />
            <div className="d-flex justify-content-between align-items-center">
                <SecondTitle title={'Best Selling Products'} />
                <MainButton title={'View All'} />
            </div>
        <ProductSlider />
    </div>
  )
}
