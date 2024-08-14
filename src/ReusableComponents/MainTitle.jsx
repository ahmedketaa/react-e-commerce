import React from 'react'

function MainTitle({title}) {
  return (
    <>
    <div className="d-flex gap-3 align-items-center">
        <img  src="assets/titleImage.svg" alt="title" />
        <h3 className='h5' style={{color:"#DB4444", fontWeight:"700"}}>{title}</h3>
    </div>
    </>
  )
}

export default MainTitle