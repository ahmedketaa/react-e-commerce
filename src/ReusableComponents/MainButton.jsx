import React from 'react'
import styles from './MainButton.module.css'
export default function MainButton({title,action}) {
  return (
   <div className="d-flex justify-content-center align-items-center">
     <button onClick={action} className={styles.MainButton}>
        {title}
    </button>
   </div>
  )
}
