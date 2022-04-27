import {ColorPicker} from '@antv/x6-react-components'
import {
  Select,
  Radio,
  Checkbox,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  AutoComplete,
  Slider,
} from 'antd'
import type {FormLabelAlign} from 'antd/lib/form/interface'
import type {RadioGroupButtonStyle} from 'antd/lib/radio'
import type {UploadListType} from 'antd/lib/upload/interface'
import {isFunction, isArray} from 'lodash'
import type {Rule} from 'rc-field-form/lib/interface'
import React from 'react'
import {MOMENT_DATETIME_FORMATE} from './common'
import {
  FIELD_TYPE_INPUT,
  FIELD_TYPE_TEXTAREA,
  FIELD_TYPE_INPUT_NUMBER,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SELECT_MULTIPLE,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_DATE_PICKER,
  FIELD_TYPE_RANGE_PICKER,
  FIELD_TYPE_COLOR_PICKER,
  FIELD_TYPE_SLIDER,
  FIELD_TYPE_EMPTY,
} from './common'
import '@antv/x6-react-components/es/color-picker/style/index.css'

const {Option: AutoCompleteOption} = AutoComplete

const {Option} = Select
const {TextArea} = Input
const {Group: RadioGroup} = Radio
const {Group: CheckboxGroup} = Checkbox
const {RangePicker: DateRange} = DatePicker

export interface IFormFieldItem {
  // id: number | string
  name: string | string[]
  placeholder?: string
  locale_key?: string
  type: number
  key?: number
  regex?: string
  custom_rules?: Rule[]
  alias?: string
  props?: DataSourceFieldItem[]
  list_mode?: boolean
  list_order?: number
  required: boolean
  inputMaxLength?: number
  inputNumberMin?: number
  inputNumberMax?: number
  display_name?: string
  datasource_field?: string
  getOptionQury?: any
  getOptionApi?: (query: any | undefined) => Promise<DataSourceFieldItem[]>
  value?: any
  switchCheckedChildren?: string
  switchUnCheckedChildren?: string
  uploadMaxUpload?: number
  uploadFileSize?: number
  uploadAllowedFileTypeList?: string[]
  onItemValueChange?: (value: any) => void
  extra?: React.ReactNode
  radioButtonStyle?: RadioGroupButtonStyle
  slider_min?: number
  slider_max?: number
  slider_step?: number
  disabled?: boolean
  itemColSpan?: number
  datePickerFormat?: string
  inputAddonAfter?: React.ReactNode
  node?: React.ReactNode
  selfLabelAlign?: FormLabelAlign
  uploadListType?: UploadListType
  // 上传文件时使用，isOss or ftp
  isFtpPost?: boolean
  // 上传文件后显示的路径只有文件名
  isShortLink?: boolean
}

export interface DataSourceFieldItem {
  key: string | number | boolean
  name: string | React.ReactNode
}

const parsePropsToPtion = (
  fieldInfo: IFormFieldItem,
  options: DataSourceFieldItem[]
) => {
  const {props} = fieldInfo
  if (props && isArray(props) && props.length) {
    // eslint-disable-next-line no-param-reassign
    options = props
  }
  return options
}

type TFieldTypeFormMap = Record<
  number,
  (
    fieldInfo: IFormFieldItem,
    readOnly?: boolean,
    options?: DataSourceFieldItem[]
  ) => JSX.Element | React.ReactNode
>

export const FIELD_TYPE_FORM_MAP: TFieldTypeFormMap = {
  [FIELD_TYPE_INPUT]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {
      display_name,
      inputMaxLength = 256,
      placeholder,
      disabled,
      onItemValueChange,
      inputAddonAfter,
    } = fieldInfo
    return (
      <Input
        allowClear
        maxLength={inputMaxLength}
        addonAfter={inputAddonAfter}
        placeholder={placeholder || `请输入${display_name}`}
        disabled={disabled || readOnly}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  [FIELD_TYPE_TEXTAREA]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {display_name, placeholder, disabled, onItemValueChange} = fieldInfo
    return (
      <TextArea
        allowClear
        placeholder={placeholder || `请输入${display_name}`}
        disabled={disabled || readOnly}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  [FIELD_TYPE_INPUT_NUMBER]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {
      display_name,
      placeholder,
      disabled,
      inputNumberMin,
      inputNumberMax,
      onItemValueChange,
    } = fieldInfo
    return (
      <InputNumber
        placeholder={placeholder || `请输入${display_name}`}
        disabled={disabled || readOnly}
        style={{width: '100%'}}
        min={inputNumberMin}
        max={inputNumberMax}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  [FIELD_TYPE_SELECT]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false,
    options: DataSourceFieldItem[] = []
  ) => {
    const {display_name, placeholder, disabled, onItemValueChange} = fieldInfo
    const optionList = parsePropsToPtion(fieldInfo, options)
    return (
      <Select
        style={{width: '100%'}}
        dropdownMatchSelectWidth={false}
        placeholder={placeholder || `请选择${display_name}`}
        showSearch
        disabled={disabled || readOnly}
        filterOption={(input, option) =>
          option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      >
        {optionList.map(({name, key}) => {
          return (
            <Option value={`${key}`} key={`${key}`}>
              {name}
            </Option>
          )
        })}
      </Select>
    )
  },
  [FIELD_TYPE_SELECT_MULTIPLE]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false,
    options: DataSourceFieldItem[] = []
  ) => {
    const {display_name, placeholder, disabled, onItemValueChange} = fieldInfo
    const optionList = parsePropsToPtion(fieldInfo, options)
    return (
      <AutoComplete
        style={{width: '100%'}}
        placeholder={placeholder || `请选择${display_name}`}
        disabled={disabled || readOnly}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
            -1 ||
          option!.children.toUpperCase().indexOf(inputValue.toUpperCase()) !==
            -1
        }
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      >
        {optionList.map(({name, key}) => {
          return (
            <AutoCompleteOption value={`${key}`} key={`${key}`}>
              {name}
            </AutoCompleteOption>
          )
        })}
      </AutoComplete>
    )
  },
  [FIELD_TYPE_RADIO]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false,
    options: DataSourceFieldItem[] = []
  ) => {
    const {
      disabled,
      onItemValueChange,
      radioButtonStyle = 'outline',
    } = fieldInfo
    const optionList = parsePropsToPtion(fieldInfo, options)
    return (
      <RadioGroup
        buttonStyle={radioButtonStyle}
        disabled={disabled || readOnly}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      >
        {optionList.map(({name, key}) => (
          <Radio.Button key={`${key}`} value={key}>
            {name}
          </Radio.Button>
        ))}
      </RadioGroup>
    )
  },
  [FIELD_TYPE_CHECKBOX]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false,
    options: DataSourceFieldItem[] = []
  ) => {
    const {disabled, onItemValueChange} = fieldInfo
    const optionList = parsePropsToPtion(fieldInfo, options)
    return (
      <CheckboxGroup
        disabled={disabled || readOnly}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      >
        {optionList.map(({name, key}) => (
          <Checkbox key={`${key}`} value={key}>
            {name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    )
  },
  [FIELD_TYPE_SWITCH]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {
      disabled,
      switchCheckedChildren = '',
      switchUnCheckedChildren = '',
      onItemValueChange,
    } = fieldInfo
    return (
      <Switch
        checkedChildren={switchCheckedChildren}
        unCheckedChildren={switchUnCheckedChildren}
        disabled={disabled || readOnly}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  [FIELD_TYPE_DATE_PICKER]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {
      display_name,
      datePickerFormat,
      disabled,
      placeholder,
      onItemValueChange,
    } = fieldInfo

    return (
      <DatePicker
        disabled={disabled || readOnly}
        style={{width: '100%'}}
        format={datePickerFormat || MOMENT_DATETIME_FORMATE}
        placeholder={placeholder || `请选择${display_name}`}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  [FIELD_TYPE_RANGE_PICKER]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {disabled, onItemValueChange} = fieldInfo

    return (
      <DateRange
        // placeholder={placeholder || ''}
        disabled={disabled || readOnly}
        // onChange={noop}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  // [FIELD_TYPE_FILE_UPLOAD]: (
  //   fieldInfo: IFormFieldItem,
  //   readOnly: boolean = false,
  // ) => {
  //   const {
  //     display_name,
  //     // props,
  //   } = fieldInfo
  //   return <FileUpload
  //     disabled={readOnly}
  //     showRemoveIcon={!readOnly}
  //     // onHandleChange={this.onHandleChange('images')}
  //     fileList={[]}
  //   >
  //     <Icon type='plus' />
  //     <div className='ant-upload-text'>上传{display_name}</div>
  //   </FileUpload>
  // },
  [FIELD_TYPE_COLOR_PICKER]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    // const {
    //   onItemValueChange,
    // } = fieldInfo
    const {value} = fieldInfo
    return <ColorPicker color={value} disabled={readOnly} />
  },
  [FIELD_TYPE_SLIDER]: (
    fieldInfo: IFormFieldItem,
    readOnly: boolean = false
  ) => {
    const {
      onItemValueChange,
      slider_min = 0,
      slider_max = 0.99,
      slider_step = 0.01,
    } = fieldInfo
    return (
      <Slider
        min={slider_min}
        max={slider_max}
        step={slider_step}
        disabled={readOnly}
        onChange={isFunction(onItemValueChange) ? onItemValueChange : undefined}
      />
    )
  },
  [FIELD_TYPE_EMPTY]: (fieldInfo: IFormFieldItem) => {
    const {node} = fieldInfo
    return node || <div></div>
  },
}
