import { http } from '@/utils/http'

/** get 请求 */
export const getProcess = (userId: string) => {
  return http<any>({
    url: `/api/wechat/record/process/${userId}`,
    method: 'GET'
  })
}
