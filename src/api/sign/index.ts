import { http } from '@/utils/http'

/** get 请求 */
export const getSignList = (userId: string,date:string) => {
  return http<any>({
    url: `/api/wechat/sys-user/getSignInfo/${userId}/${date}`,
    method: 'GET',
  })
}

export const sign = (userId: string) => {
  return http<any>({
    url: `/api/wechat/sys-user/sign/${userId}`,
    method: 'GET',
  })
}

