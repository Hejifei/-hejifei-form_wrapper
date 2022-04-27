import React from 'react'
import { DatePicker } from 'antd'
import type { FC } from 'react'

export interface IMyButton2Props {
  label: string
}

const MyButton2: FC<IMyButton2Props> = ({ label }) => {
  return (
    <>
      <DatePicker />
      <button className={'myButtonWrapper'}>
        this is my custom Button 2222: {label}
      </button>
    </>
  )
}

export default MyButton2
