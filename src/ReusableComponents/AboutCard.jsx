import React from 'react'

export default function AboutCard() {
  return (
    <div style={{width:"30%"}} className='border p-4 text-center  d-flex flex-column justify-content-center align-items-center'>
        <div className="frame">
            <div className='gray-circle' style={{borderRadius:"50%",padding:"15px" ,background:"#F5F5F5"}}>
                <div className='black-circle bg-black' style={{borderRadius:"50%",padding:"10px" }}>
                <img src="assets/Group.svg" alt="" />
                </div>
            </div>
        </div>
        <div className="text">
            <h3>10.5k</h3>
            <p>Sallers active our site</p>
        </div>
    </div>
  )
}
