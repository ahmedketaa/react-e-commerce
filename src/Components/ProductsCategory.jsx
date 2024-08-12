import React from 'react'
import { categories } from '../Utilities/Categories'
import { Link } from 'react-router-dom'

function ProductsCategory() {
  return (
    <div>
        <ul className=''>
        {categories.map(category=>(
            <li className='nav-item my-2'>
              <Link className='nav-link' to={''}>{category}</Link>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default ProductsCategory