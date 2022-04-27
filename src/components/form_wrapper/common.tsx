export const MOMENT_DATE_FORMATE = 'YYYY-MM-DD HH:mm:ss'
export const MOMENT_DATETIME_FORMATE = 'YYYY-MM-DD HH:mm'
export const MOMENT_DAY_FORMATE = 'YYYY-MM-DD'
export const MOMENT_DAY_NORMAL_FORMATE = 'YYYYMMDD'
export const MOMENT_TUM_JSON_VERSION_FORMAT = 'YYYY.MM.DD.HHmmss'
export const MOMENT_TIME_FORMATE = 'HH:mm'
export const MOMENT_TIME_HMS_FORMATE = 'HH:mm:ss'

export const FIELD_TYPE_INPUT: number = 1 //  单行文本框
export const FIELD_TYPE_TEXTAREA: number = 2 //  多行文本框
export const FIELD_TYPE_INPUT_NUMBER: number = 3 //  数字
export const FIELD_TYPE_SELECT: number = 4 //  单选下拉框
export const FIELD_TYPE_SELECT_MULTIPLE: number = 5 //  多选下拉框
export const FIELD_TYPE_RADIO: number = 6 //  单选框
export const FIELD_TYPE_CHECKBOX: number = 7 //  复选框
export const FIELD_TYPE_SWITCH: number = 8 //  开关
export const FIELD_TYPE_DATE_PICKER: number = 9 //  日期
export const FIELD_TYPE_RANGE_PICKER: number = 10 //  日期(区间)
export const FIELD_TYPE_FILE_UPLOAD: number = 11 //  附件
export const FIELD_TYPE_COLOR_PICKER: number = 12 //  颜色选择器
export const FIELD_TYPE_SLIDER: number = 13 //  进度条 Slider
export const FIELD_TYPE_EMPTY: number = 14 //  自定义
export const FIELE_TYPE_INPUT_NUMBER_RANGE = 15 //  数字区间输入框

// 字段的值是数组，需要JSON.stringify
export const FIELD_TYPE_VALUE_ARRAY = [
  FIELD_TYPE_SELECT_MULTIPLE,
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_FILE_UPLOAD,
]

//  字段类型
export const FIELD_TYPE_LIST = [
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
  FIELD_TYPE_FILE_UPLOAD,
  FIELD_TYPE_COLOR_PICKER,
]

export const FIELD_TYPE_INPUT_LIST = [
  FIELD_TYPE_INPUT,
  FIELD_TYPE_TEXTAREA,
  FIELD_TYPE_INPUT_NUMBER,
]

export const FIELD_TYPE_SELECT_LIST = [
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SELECT_MULTIPLE,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_DATE_PICKER,
  FIELD_TYPE_RANGE_PICKER,
  FIELD_TYPE_FILE_UPLOAD,
]

//  选项需要请求的类型数组
export const FIELD_TYPE_SELECT_OPTION_FETCHABLE_LIST = [
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SELECT_MULTIPLE,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_CHECKBOX,
]

interface IOptionItem {
  name: string
  value: string
}
interface IFieldConfig {
  name: string
  isOptionConfigAble?: boolean //  选项是否可编辑
  isValueSelectedFromDataSourceKey?: boolean //  数值是否可从数据源的key中选择赋值
  optionCountMaxLimit?: number //  最多选项个数
  formatOption?: IOptionItem[]
  fileTypeOption?: IOptionItem[]
}

const DATE_FORMATE_OPTION: IOptionItem[] = [
  {
    name: `年-月-日 时:分:秒(${MOMENT_DATE_FORMATE})`,
    value: MOMENT_DATE_FORMATE,
  },
  {
    name: `年-月-日 时:分(${MOMENT_DATETIME_FORMATE})`,
    value: MOMENT_DATETIME_FORMATE,
  },
  {
    name: `年-月-日(${MOMENT_DAY_FORMATE})`,
    value: MOMENT_DAY_FORMATE,
  },
  {
    name: `年月日(${MOMENT_DAY_NORMAL_FORMATE})`,
    value: MOMENT_DAY_NORMAL_FORMATE,
  },
  {
    name: `年.月.日.时分秒(${MOMENT_TUM_JSON_VERSION_FORMAT})`,
    value: MOMENT_TUM_JSON_VERSION_FORMAT,
  },
  {
    name: `时:分:秒(${MOMENT_TIME_HMS_FORMATE})`,
    value: MOMENT_TIME_HMS_FORMATE,
  },
  {
    name: `时:分(${MOMENT_TIME_FORMATE})`,
    value: MOMENT_TIME_FORMATE,
  },
]

export const FILE_UPLOAD_TYPE_IMAGE = 'image'
export const FILE_UPLOAD_TYPE_VIDEO = 'video'
export const FILE_UPLOAD_TYPE_RADIO = 'radio'
export const FILE_UPLOAD_TYPE_FILE = 'file'

export const FILE_UPLOAD_TYPE_OPTION: IOptionItem[] = [
  {
    name: '图片',
    value: FILE_UPLOAD_TYPE_IMAGE,
  },
  {
    name: '视频',
    value: FILE_UPLOAD_TYPE_VIDEO,
  },
  {
    name: '语音',
    value: FILE_UPLOAD_TYPE_RADIO,
  },
  {
    name: '文件',
    value: FILE_UPLOAD_TYPE_FILE,
  },
]

export const FILE_UPLOAD_TYPE_FILE_TYPE_LIST_MAP: Record<string, string[]> = {
  [FILE_UPLOAD_TYPE_IMAGE]: ['jpeg', 'jpg', 'png', 'bmp'],
  [FILE_UPLOAD_TYPE_VIDEO]: ['mp4', 'avi', 'mpeg', 'mov', 'wmv', 'rmvb', ''],
  [FILE_UPLOAD_TYPE_RADIO]: ['mp3', 'wma', 'aac', 'realaudio'],
  [FILE_UPLOAD_TYPE_FILE]: ['xls', 'xlsx', 'pdf', 'zip', 'doc'],
}

export const INPUT_NUMBER_FORMATE_INTEGER = 'integer' //  整数
export const INPUT_NUMBER_FORMATE_POSITIVE = 'positive_integer' //  正数
export const INPUT_NUMBER_FORMATE_UNLIMITED = 'unlimited' //  正数

const INPUT_NUMBER_FORMATE_OPTION: IOptionItem[] = [
  {name: '整数', value: INPUT_NUMBER_FORMATE_INTEGER},
  {name: '正数', value: INPUT_NUMBER_FORMATE_POSITIVE},
  {name: '不限', value: INPUT_NUMBER_FORMATE_UNLIMITED},
]

export const FIELD_TYPE_OPTION_CONFIGABLE_TYPE_LIST = [
  FIELD_TYPE_SELECT,
  FIELD_TYPE_SELECT_MULTIPLE,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_SWITCH,
]

export const FIELD_TYPE_CONFIG_MAP: Record<number, IFieldConfig> = {
  [FIELD_TYPE_INPUT]: {
    name: '单行文本框',
    isValueSelectedFromDataSourceKey: true,
  },
  [FIELD_TYPE_TEXTAREA]: {
    name: '多行文本框',
    isValueSelectedFromDataSourceKey: true,
  },
  [FIELD_TYPE_INPUT_NUMBER]: {
    name: '数字',
    formatOption: INPUT_NUMBER_FORMATE_OPTION,
    isValueSelectedFromDataSourceKey: true,
  },
  [FIELD_TYPE_SELECT]: {
    name: '单选下拉框',
    isOptionConfigAble: true,
  },
  [FIELD_TYPE_SELECT_MULTIPLE]: {
    name: '多选下拉框',
    isOptionConfigAble: true,
  },
  [FIELD_TYPE_RADIO]: {
    name: '单选框',
    isOptionConfigAble: true,
  },
  [FIELD_TYPE_CHECKBOX]: {
    name: '复选框',
    isOptionConfigAble: true,
  },
  [FIELD_TYPE_SWITCH]: {
    name: '开关',
    isOptionConfigAble: true,
    optionCountMaxLimit: 2,
  },
  [FIELD_TYPE_DATE_PICKER]: {
    name: '日期',
    formatOption: DATE_FORMATE_OPTION,
  },
  [FIELD_TYPE_RANGE_PICKER]: {
    name: '日期(区间)',
    formatOption: DATE_FORMATE_OPTION,
  },
  [FIELD_TYPE_FILE_UPLOAD]: {
    name: '附件',
    fileTypeOption: FILE_UPLOAD_TYPE_OPTION,
  },
}

export const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
}

export const FORM_ITEM_LAYOUT_DATE_RANGE_PICKER = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 3},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 21},
  },
}

export const DATA_SOURCE_QUERY_KEY_DE_ID = 'de_id'
export const DATA_SOURCE_QUERY_KEY_FA_ID = 'fa_id'

// 数据源 query_key 数组
export const DATA_SOURCE_QUERY_KEY_LIST = [
  {name: '设备ID', key: DATA_SOURCE_QUERY_KEY_DE_ID},
  {name: '告警ID', key: DATA_SOURCE_QUERY_KEY_FA_ID},
]

// 工作流字段
export const WORK_ORDER_FLOW_FIELD_REQUIRED = 1 //  必填
export const WORK_ORDER_FLOW_FIELD_UNREQUIRED = 2 //  非必填
