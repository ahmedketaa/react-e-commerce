import React  from 'react'
import MainTitle from '../ReusableComponents/MainTitle'
import ProductSlider from '../ReusableComponents/ProductSlider'
import MainButton from '../ReusableComponents/MainButton'
import SecondTitle from '../ReusableComponents/SecondTitle'
import { useNavigate } from 'react-router'

function FlashSales() {
  const navigate =useNavigate()
  return (
    <div>
        <MainTitle title={"Today’s"}/>
          <SecondTitle title='Flash Sales' />
        <div className="mb-5">
        <ProductSlider />
        </div>
    <div className="my-5">
        <MainButton action={()=>navigate('/products')} title={"View All Products"} />
    </div>
    </div>
  )
}

export default FlashSales