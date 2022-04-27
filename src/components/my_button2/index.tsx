import React from 'react'
import type { FC } from 'react'

export interface IMyButton2Props {
  label: string
}

const MyButton2: FC<IMyButton2Props> = ({ label }) => {
  return (
    <button className={'myButtonWrapper2'}>
      this is my custom Button 2222: {label}
    </button>
  )
}

export default MyButton2
