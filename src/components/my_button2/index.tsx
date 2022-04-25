import React from 'react'
import type { FC } from 'react'
import styles from './index.scss'

export interface IMyButton2Props {
  label: string
}

const MyButton2: FC<IMyButton2Props> = ({ label }) => {
  return (
    <button className={styles.myButtonWrapper}>
      this is my custom Button 2222: {label}
    </button>
  )
}

export default MyButton2
