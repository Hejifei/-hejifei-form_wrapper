import {Modal, Upload, message as antdMessage} from 'antd'
import type {
  UploadChangeParam,
  UploadFile,
  UploadFileStatus,
  UploadListType,
  RcFile,
} from 'antd/lib/upload/interface'
import lodash from 'lodash'
import type {ReactNode} from 'react'
import React, {useState, useEffect, useCallback} from 'react'
import {connect} from 'react-redux'
import type {Dispatch} from 'umi'
import {useIntl} from 'umi'
// import {ossUpload} from 'src/action/base'
import {VIEW_BASE_FILE_SIZE, VIEW_BASE_FILE_TYPE} from '@/common/locale_name'
import {generateUuid} from '@/util'
import {checkValueIsGenericType} from '@/util/types'

export interface IFileDataItem {
  uid?: string
  name: string
  status?: UploadFileStatus
  url: string
  file?: File
}

interface Props {
  fileList: string[] | IFileDataItem[] // 文件列表/文件object
  listType?: UploadListType // 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card, 默认 'picture-card'
  allowImageTypes?: string[] // 可上传文件类型 默认 ['jpeg', 'jpg', 'png', 'bmp']
  showPreviewIcon?: boolean // 是否支持预览，默认 true
  showRemoveIcon?: boolean // 是否支持删除，默认 true
  maxUpload?: number // 最大图片上传数量，默认3
  fileSize?: number // 最大上传文件大小(MB) 默认 2MB
  disabled?: boolean // 是否禁用
  useUrlList?: boolean // 保持fileList和onHandleChange的数据一致都是url列表
  children?: ReactNode // 上传展示按钮
  isGetLocalFile?: boolean // 不调用上传接口只是获取本地文件

  onHandleChange?: Function // 不调用上传接口只是获取本地文件
  onChange?: Function // 同onHandleChange
  isFtpPost?: boolean
  isShortLink?: boolean // 上传文件后显示的路径只有文件名
  isRename?: boolean // 上传图片需要重命名
  dispatch: Dispatch
}

const FileUpload: React.FC<Props> = ({
  fileList,
  useUrlList = false,
  isGetLocalFile = false,
  onHandleChange,
  onChange,
  listType = 'picture-card',
  showPreviewIcon = true,
  showRemoveIcon = true,
  maxUpload = 3,
  children = null,
  allowImageTypes = ['jpeg', 'jpg', 'png', 'bmp', 'svg'],
  fileSize = 2,
  disabled = false,
  isFtpPost,
  isShortLink,
  isRename = false,
  dispatch,
}) => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>()
  const [fieldInfoList, setFieldInfoList] = useState<
    UploadFile<IFileDataItem>[]
  >([])

  const intl = useIntl()

  // 解析文件列表
  const getParseFileList = useCallback(() => {
    // let parseFileList: UploadFile[] = []
    let parseFileList: UploadFile<IFileDataItem>[] = []
    const status: UploadFileStatus = 'done'
    // UploadFile size、type required
    const size = 0
    const type = 'image/png'
    if (useUrlList && checkValueIsGenericType<string[]>(fileList)) {
      parseFileList = fileList.map(
        url =>
          ({
            uid: generateUuid(),
            name: isShortLink ? url.split('/').reverse()[0] : url,
            status,
            url,
            size,
            type,
          } as UploadFile<IFileDataItem>)
      )
    } else if (
      !useUrlList &&
      checkValueIsGenericType<IFileDataItem[]>(fileList)
    ) {
      parseFileList = fileList.map(
        f =>
          ({
            uid: f.uid || generateUuid(),
            name: f.name || f.url,
            status: f.status || status,
            url: f.url,
            size,
            type,
          } as UploadFile<IFileDataItem>)
      )
    }
    return parseFileList
  }, [fileList, isShortLink, useUrlList])

  useEffect(() => {
    const parseFileList = getParseFileList()
    setFieldInfoList(parseFileList)
  }, [fileList])

  // 获取更新事件
  const getChangeFunc = useCallback(() => {
    if (lodash.isFunction(onHandleChange)) {
      return onHandleChange
    }
    if (lodash.isFunction(onChange)) {
      return onChange
    }
    return lodash.noop
  }, [onHandleChange, onChange])

  const handleChange = useCallback(
    ({file, fileList: file_list}: UploadChangeParam<UploadFile>) => {
      if (file.status !== 'removed') {
        return
      }
      const updateFunc = getChangeFunc()
      const urlList = file_list.map(f => f.url)
      updateFunc(urlList, file_list)
    },
    [getChangeFunc]
  )

  const handlePreview = useCallback((file: UploadFile) => {
    setPreviewImage(file.url || file.thumbUrl || '')
    setPreviewVisible(true)
  }, [])

  const doUpload = useCallback(
    async (allowImage_types: string[], file_size: number, file: RcFile) => {
      const ex = file.name.split('.').reverse()[0].toLowerCase()
      const isImage = allowImage_types.find(allowType => ex === allowType)
      if (!isImage) {
        // antdMessage.warning(`仅支持${allowImage_types.join(',')}文件格式！`)
        antdMessage.warning(
          intl.formatMessage(
            {id: VIEW_BASE_FILE_TYPE},
            {name: allowImage_types.join(',')}
          )
        )
        return
      }
      const isLtMB = file.size / 1024 / 1024 < file_size
      if (!isLtMB) {
        // antdMessage.warning(`文件大小不得超过${file_size}M！`)
        antdMessage.warning(
          intl.formatMessage({id: VIEW_BASE_FILE_SIZE}, {name: `${file_size}M`})
        )
        return
      }
      const updateFunc = getChangeFunc()

      const status: UploadFileStatus = 'done'

      if (isGetLocalFile) {
        const fieldInfoListNew = [
          ...fieldInfoList,
          {
            uid: generateUuid(),
            name: file.name,
            url: '',
            file,
            status,
            size: file.size,
            type: file.type,
          },
        ]
        updateFunc([], fieldInfoListNew)
        return
      }

      const query: ITemplateApi.IFetchOssUploadQuery = {
        AttFile: file,
      }
      try {
        await dispatch({
          type: 'base/setLoading',
          payload: true,
        })

        let apiType = isRename
          ? 'template/uploadOssFileR'
          : 'template/uploadOssFile'
        if (isFtpPost) {
          apiType = 'template/uploadFtpFile'
        }
        const url = await dispatch({
          type: apiType,
          payload: query,
        })

        // 上传接口不规范导致需要特殊处理的问题
        // 文件 url 有时不带http/https协议前缀
        // url = reshapeOssUrl(url, false)
        // if (!url.startsWith('//')) {
        //     url = `//${url}`
        // }

        const newFileInfo: UploadFile<IFileDataItem> = {
          uid: generateUuid(),
          name: file.name,
          url,
          originFileObj: file,
          status,
          size: file.size,
          type: file.type,
        }
        const fieldInfoListNew = [...fieldInfoList, newFileInfo]
        const urlList = fieldInfoListNew.map(fieldInfo => fieldInfo.url || '')
        updateFunc(urlList, fieldInfoListNew)
      } catch (err) {
        antdMessage.error(err.message)
      } finally {
        await dispatch({
          type: 'base/setLoading',
          payload: false,
        })
      }
    },
    []
  )

  const beforeUpload = useCallback(
    (allowedTypes: string[], file_size: number) =>
      (file: RcFile): boolean => {
        doUpload(allowedTypes, file_size, file)
        return false
      },
    [doUpload]
  )

  const handleCancel = useCallback(() => setPreviewVisible(false), [])

  const buildUploadProp = useCallback(() => {
    if (listType === 'picture-card') {
      return {
        onPreview: handlePreview,
        showUploadList: {showPreviewIcon, showRemoveIcon},
      }
    }
    if (listType === 'text') {
      return {
        showUploadList: {showPreviewIcon, showRemoveIcon},
      }
    }
    return {}
  }, [listType, handlePreview, showPreviewIcon, showRemoveIcon])
  // const {fileList, previewVisible, previewImage} = this.state

  return (
    <div>
      <Upload
        disabled={disabled}
        {...buildUploadProp()}
        listType={listType}
        fileList={fieldInfoList}
        beforeUpload={beforeUpload(allowImageTypes, fileSize)}
        onChange={handleChange}
      >
        {fieldInfoList.length >= maxUpload ? null : children}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{width: '100%'}} src={previewImage} />
      </Modal>
    </div>
  )
}

export default connect()(FileUpload)
