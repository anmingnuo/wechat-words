import { http } from '@/utils/http'

/** get 请求 */
export const getSignList = (userId: string) => {
  return http<any>({
    url: `/api/wechat/sys-user/getSignInfo/${userId}}`,
    method: 'GET',
  })
}

