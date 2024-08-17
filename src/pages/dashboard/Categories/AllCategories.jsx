import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Outlet, useNavigate } from 'react-router';
export default function AllCategories() {
    const navigate = useNavigate();

  return (
    <div className='container'>
        <div className="text-center ">
       <ul className='d-flex gap-3'>
        <li>
            <button  onClick={() => navigate('./')} className='special-nav-link'>All Categories</button>
        </li>
        <li>
            <button onClick={() => navigate('add-category')}  className='special-nav-link'>
            <CiSquarePlus style={{fontSize:"30px"}}/>
            Add Category</button>
        </li>
       </ul>
        </div>
       <Outlet />
    </div>
  )
}
