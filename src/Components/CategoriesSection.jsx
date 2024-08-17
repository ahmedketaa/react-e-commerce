import React from 'react'
import CategorySectionItem from '../ReusableComponents/CategorySectionItem'
import MainTitle from '../ReusableComponents/MainTitle'
import SecondTitle from '../ReusableComponents/SecondTitle'
import { GiClothes } from "react-icons/gi";
import { FcElectronics } from "react-icons/fc";
import { GiJewelCrown } from "react-icons/gi";
import { GrRestroomWomen } from "react-icons/gr";


export default function CategoriesSection() {
  return (
    <div className='container mb-3'>
        <MainTitle title={'Categories'} />
        <SecondTitle title={'Browse By Category'} />
        <div className="row">
            <CategorySectionItem name={'Electronics'} icon={<FcElectronics style={{fontSize:"45px"}}/>} />
            <CategorySectionItem name={`Men's Clothes`} icon={<GiClothes style={{fontSize:"45px"}}/>} />
            <CategorySectionItem name={`Women's Clothes`} icon={<GrRestroomWomen style={{fontSize:"45px",color:"#"}}/>} />
            <CategorySectionItem name={'Jewelery'} icon={<GiJewelCrown style={{fontSize:"45px"}}/>} />
        </div>
    </div>
  )
}
