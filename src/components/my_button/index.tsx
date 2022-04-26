import * as React from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'

export interface IMyButtonProps {
  label: string
}

const MyButton: FC<IMyButtonProps> = ({ label }) => {
  return (
    <button className={styles.myButtonWrapper}>
      this is my custom Button: {label}
    </button>
  )
}

export default MyButton
