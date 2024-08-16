import React from 'react'
import styles from './CategoryItem.module.css'
export default function CategorySectionItem({name,icon}) {
  return (
    <div className='col-md-3'>
        <div className={`${styles.categoryBox} text-center py-4 px-5`}>
          {icon } 
            <i style={{fontSize:"35px"}} className={` pi ${icon}`}></i>
            <h5 className='mt-3'>{name}</h5>
        </div>
    </div>
  )
}
