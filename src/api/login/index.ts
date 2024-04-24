import { http } from '@/utils/http'

/** get 请求 */
export const login = (data: { password: string; username: string }) => {
  return http<any>({
    url: `/api/wechat/index/login`,
    method: 'POST',
    data,
  })
}

export const logout = () => {
  return http<any>({
    url: `/api/wechat/index/logout`,
    method: 'POST',
  })
}

export const getInfo = () => {
  return http<any>({
    url: `/api/wechat/index/info`,
    method: 'GET',
  })
}
