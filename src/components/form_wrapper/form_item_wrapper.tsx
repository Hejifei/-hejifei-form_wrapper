import {Col, Form} from 'antd'
import type {FormInstance} from 'antd/es/form/Form'
import type {FormLabelAlign} from 'antd/es/form/interface'
import {isArray, isFunction} from 'lodash'
import React, {useEffect, useState, useMemo} from 'react'
import {useIntl, connect} from 'umi'
import type {Dispatch} from 'umi'
import {VIEW_PLEASE_INPUT, VIEW_PLEASE_SELECT} from '@/common/locale_name'
import {
  FIELD_TYPE_FILE_UPLOAD,
  FIELD_TYPE_COLOR_PICKER,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_EMPTY,
} from './common'
import {
  FIELD_TYPE_INPUT_LIST,
  FIELD_TYPE_SELECT_OPTION_FETCHABLE_LIST,
} from './common'
import {FIELD_TYPE_FORM_MAP} from './config'
import type {IFormFieldItem, DataSourceFieldItem} from './config'
import FormItemUploadWrapper from './form_item_upload_wrapper'

export const DEFAULT_FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
}

interface IProps {
  fieldInfo: IFormFieldItem
  ColSpan?: number
  isReadOnly?: boolean
  form: FormInstance<any>
  labelAlign?: FormLabelAlign
  dispatch: Dispatch
  formItemLayout?: Object
}

const {Item} = Form

const FormItemWrapper: React.FC<IProps> = ({
  dispatch,
  fieldInfo,
  ColSpan = 24,
  isReadOnly = false,
  form,
  labelAlign,
  formItemLayout,
}) => {
  const intl = useIntl()
  const [optionList, setOptionList] = useState<DataSourceFieldItem[]>([])

  const {
    type,
    name,
    required,
    locale_key,
    display_name,
    getOptionQury = {},
    getOptionApi,
    extra,
    itemColSpan,
    custom_rules = [],
    selfLabelAlign,
    placeholder: placeHolderDefault,
  } = fieldInfo

  const defaultformItemLayout = formItemLayout || DEFAULT_FORM_ITEM_LAYOUT

  useEffect(() => {
    if (
      FIELD_TYPE_SELECT_OPTION_FETCHABLE_LIST.includes(type) &&
      getOptionApi
    ) {
      const getOption = async () => {
        try {
          await dispatch({
            type: 'base/setLoading',
            payload: true,
          })
          let data = await getOptionApi(getOptionQury)
          if (!isArray(data)) {
            data = []
          }
          setOptionList(data)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e.message)
        } finally {
          dispatch({
            type: 'base/setLoading',
            payload: false,
          })
        }
      }
      getOption()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const label = useMemo(
    () =>
      locale_key
        ? intl.formatMessage({id: locale_key})
        : display_name || '未知的参数名称',
    [locale_key, display_name, intl]
  )
  const placeholder = useMemo(() => {
    if (placeHolderDefault) {
      return placeHolderDefault
    }
    return intl.formatMessage(
      {
        id: FIELD_TYPE_INPUT_LIST.includes(type)
          ? VIEW_PLEASE_INPUT
          : VIEW_PLEASE_SELECT,
      },
      {name: label}
    )
  }, [intl, type, label, placeHolderDefault])

  if (type === FIELD_TYPE_FILE_UPLOAD) {
    return (
      <FormItemUploadWrapper
        fieldInfo={fieldInfo}
        ColSpan={ColSpan}
        isReadOnly={isReadOnly}
        form={form}
        labelAlign={selfLabelAlign || labelAlign}
        formItemLayout={formItemLayout}
      />
    )
  }

  return (
    <Col span={itemColSpan || ColSpan} key={`${fieldInfo.name}`}>
      <Item
        {...defaultformItemLayout}
        {...(type === FIELD_TYPE_EMPTY && !required
          ? {}
          : {
              name,
            })}
        // name={name}
        label={label}
        labelAlign={selfLabelAlign || labelAlign}
        rules={[{required, message: placeholder}, ...custom_rules]}
        extra={extra}
        {...(type === FIELD_TYPE_COLOR_PICKER
          ? {
              getValueFromEvent: e => {
                if (type === FIELD_TYPE_COLOR_PICKER) {
                  const {onItemValueChange} = fieldInfo
                  if (isFunction(onItemValueChange)) {
                    onItemValueChange(e.hex)
                  }
                  return e.hex
                }
                return e
              },
            }
          : {})}
        {...(type === FIELD_TYPE_SWITCH ? {valuePropName: 'checked'} : {})}
      >
        {FIELD_TYPE_FORM_MAP[type](
          {
            ...fieldInfo,
            placeholder,
          },
          isReadOnly,
          optionList
        )}
      </Item>
    </Col>
  )
}

export default connect()(FormItemWrapper)
