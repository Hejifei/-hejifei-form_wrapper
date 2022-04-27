import * as React from 'react'
import type {FC} from 'react'
import {Input} from 'antd'

export interface IMyButtonProps {
  label: string
}

const MyButton: FC<IMyButtonProps> = ({label}) => {
  return (
    <>
      <Input />
      <button className={'myButtonWrapper'}>
        this is my custom Button: {label}
      </button>
    </>
  )
}

export default MyButton
