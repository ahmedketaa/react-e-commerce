import React from 'react'
import styles from './MainButton.module.css'
export default function MainButton({title,action,ourStyle}) {
  return (
   <div className="d-flex justify-content-center align-items-center">
     <button c style={{transition:".3s"}} onClick={action} className={`${styles.MainButton} ${ourStyle}`}>
        {title}
    </button>
   </div>
  )
}
