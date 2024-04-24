import { http } from '@/utils/http'

/** get 请求 */
export const updateRecord = (data: any) => {
  return http<any>({
    url: `/api/wechat/record`,
    method: 'POST',
    data,
  })
}

export const getTodayTask = (userId: string) => {
  return http<any>({
    url: `/api/wechat/record/task${userId}`,
    method: 'GET',
  })
}

export const getProcess = (userId: string) => {
  return http<any>({
    url: `/api/wechat/record/process/${userId}`,
    method: 'GET',
  })
}
