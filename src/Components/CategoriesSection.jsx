import React from 'react'
import CategorySectionItem from '../ReusableComponents/CategorySectionItem'
import MainTitle from '../ReusableComponents/MainTitle'
import SecondTitle from '../ReusableComponents/SecondTitle'

export default function CategoriesSection() {
  return (
    <div className='container mb-3'>
        <MainTitle title={'Categories'} />
        <SecondTitle title={'Browse By Category'} />
        <div className="row">
            <CategorySectionItem name={'Camera'} icon={'pi-camera'} />
            <CategorySectionItem name={'Computers'} icon={'pi-desktop'} />
            <CategorySectionItem name={'Microphone'} icon={'pi-microphone'} />
            <CategorySectionItem name={'Phones'} icon={'pi-mobile'} />
            <CategorySectionItem name={'Headphones'} icon={'pi-headphones'} />
            <CategorySectionItem name={'Phones'} icon={'pi-camera'} />
        </div>
    </div>
  )
}
