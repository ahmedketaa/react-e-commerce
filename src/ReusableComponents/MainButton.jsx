import React from 'react'
import styles from './MainButton.module.css'
export default function MainButton({title}) {
  return (
   <div className="d-flex justify-content-center align-items-center">
     <button className={styles.MainButton}>
        {title}
    </button>
   </div>
  )
}
