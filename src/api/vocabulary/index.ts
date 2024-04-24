import { http } from '@/utils/http'

/** get 请求 */
export const getword = (userId: string) => {
  return http<any>({
    url: `/api/wechat/word/${userId}`,
    method: 'GET',
  })
}
