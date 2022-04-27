import {PlusOutlined} from '@ant-design/icons'
import {Form, Col, Button} from 'antd'
import type {FormInstance} from 'antd/es/form/Form'
import type {FormLabelAlign} from 'antd/es/form/interface'
import {set, isArray, get, isFunction} from 'lodash'
import React, {useMemo, useState, useCallback, useEffect} from 'react'
import {useIntl} from 'umi'
import {VIEW_PLEASE_SELECT, VIEW_UPLOAD_TEXT} from '@/common/locale_name'
import FileUpload from '../file_upload'
import {FIELD_TYPE_FILE_UPLOAD} from './common'
import type {IFormFieldItem} from './config'
import {DEFAULT_FORM_ITEM_LAYOUT} from './form_item_wrapper'

const {Item} = Form

interface IProps {
  fieldInfo: IFormFieldItem
  ColSpan?: number
  isReadOnly?: boolean
  form: FormInstance<any>
  labelAlign?: FormLabelAlign
  formItemLayout?: Object
}

const FormItemUploadWrapper: React.FC<IProps> = ({
  form,
  fieldInfo,
  ColSpan = 24,
  isReadOnly = false,
  labelAlign,
  formItemLayout,
}) => {
  const intl = useIntl()
  const [fileList, setFieldList] = useState<string[]>([])

  const {
    type,
    name,
    locale_key,
    required,
    display_name,
    uploadAllowedFileTypeList: allowImageTypes,
    uploadMaxUpload = 1,
    uploadFileSize = 5,
    value,
    onItemValueChange,
    uploadListType,
    isFtpPost,
    isShortLink,
  } = fieldInfo

  useEffect(() => {
    if (value) {
      setFieldList(isArray(value) ? value : [value])
    }
  }, [value])

  const label = useMemo(
    () =>
      locale_key
        ? intl.formatMessage({id: locale_key})
        : display_name || '未知的参数名称',
    [locale_key, display_name, intl]
  )
  const placeholder = useMemo(
    () => intl.formatMessage({id: VIEW_PLEASE_SELECT}, {name: label}),
    [intl, label]
  )

  const handleFieldChange = useCallback(
    list => {
      setFieldList(list)
      const fieldObject = {}
      set(
        fieldObject,
        [...(isArray(name) ? name : [name])],
        uploadMaxUpload === 1 ? get(list, [0]) : list
      )
      form.setFieldsValue(fieldObject)
      if (isFunction(onItemValueChange)) {
        onItemValueChange(list)
      }
      // setFields({
      //   [name]: {
      //     value: list,
      //   }
      // })
    },
    [name, form, uploadMaxUpload, onItemValueChange]
  )

  // const allowFileTypeText = useMemo(() => {
  //   if (allowImageTypes && allowImageTypes.length > 0) {
  //     return allowImageTypes.join('、')
  //   }
  //   return ''
  // }, [allowImageTypes])

  if (type !== FIELD_TYPE_FILE_UPLOAD) {
    return null
  }

  const defaultformItemLayout = formItemLayout || DEFAULT_FORM_ITEM_LAYOUT
  let content = (
    <>
      <PlusOutlined />{' '}
      <span>
        {intl.formatMessage({id: VIEW_UPLOAD_TEXT})}
        {display_name}
      </span>
    </>
  )
  if (uploadListType === 'text') {
    content = (
      <Button>
        <PlusOutlined /> {intl.formatMessage({id: VIEW_UPLOAD_TEXT})}
      </Button>
    )
  }

  return (
    <Col span={ColSpan} key={`${fieldInfo.name}`}>
      <Item
        {...defaultformItemLayout}
        name={name}
        label={label}
        labelAlign={labelAlign}
        rules={[{required, message: placeholder}]}
        // extra={<p>
        //   文件类型限制: {allowFileTypeText.join('、')}
        // </p>}
      >
        <FileUpload
          disabled={isReadOnly}
          showPreviewIcon
          showRemoveIcon={!isReadOnly}
          maxUpload={uploadMaxUpload}
          useUrlList
          fileSize={uploadFileSize}
          allowImageTypes={allowImageTypes}
          onHandleChange={handleFieldChange}
          fileList={fileList}
          listType={uploadListType}
          isFtpPost={isFtpPost}
          isShortLink={isShortLink}
          // allowImageTypes={[]}
        >
          {content}
        </FileUpload>
      </Item>
    </Col>
  )
}

export default FormItemUploadWrapper
