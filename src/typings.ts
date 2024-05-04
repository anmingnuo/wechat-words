/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  data: T
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  nickname?: string
  userId?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
  role?: string
  phone?: string
  name?: string
  isHaveBook?: string
  dailyGoal?: number
  continue?: number
  sum?: number
}

enum TestEnum {
  A = 'a',
  B = 'b',
}
