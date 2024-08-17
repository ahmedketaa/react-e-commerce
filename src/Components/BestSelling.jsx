import React from 'react'
import MainTitle from '../ReusableComponents/MainTitle'
import MainButton from '../ReusableComponents/MainButton'
import SecondTitle from '../ReusableComponents/SecondTitle'
import ProductSlider from '../ReusableComponents/ProductSlider'
import { useNavigate } from 'react-router'

export default function BestSelling() {
  const navigate =useNavigate()
  return (
    <div className='container pt-5'>
        <MainTitle title={'This Month'} />
            <div className="d-flex justify-content-between align-items-center">
                <SecondTitle title={'Best Selling Products'} />
                <MainButton action={()=>navigate('/products')} title={'View All'} />
            </div>
        <ProductSlider/>
    </div>
  )
}
