import {Row} from 'antd'
import type {FormInstance} from 'antd/es/form/Form'
import type {FormLabelAlign} from 'antd/es/form/interface'
import React from 'react'
import type {IFormFieldItem} from './config'
import FormItemWrapper from './form_item_wrapper'

export interface IFormWrapperProps {
  fieldList: IFormFieldItem[]
  ColSpan?: number
  isReadOnly?: boolean
  form: FormInstance<any>
  formItemLayout?: Object
  labelAlign?: FormLabelAlign
}

const FormWrapper: React.FC<IFormWrapperProps> = ({
  fieldList,
  ColSpan = 24,
  isReadOnly = false,
  form,
  labelAlign = 'right',
  formItemLayout,
}) => {
  return (
    <>
      <Row>
        {fieldList.map(fieldInfo => {
          return (
            <FormItemWrapper
              key={`${fieldInfo.name}`}
              fieldInfo={fieldInfo}
              ColSpan={ColSpan}
              form={form}
              isReadOnly={isReadOnly}
              labelAlign={labelAlign}
              formItemLayout={formItemLayout}
            />
          )
        })}
      </Row>
    </>
  )
}

export default FormWrapper
