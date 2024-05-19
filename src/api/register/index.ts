import { http } from '@/utils/http'

export const saveUser = (data: { password: string; username: string }) => {
  return http<any>({
    url: `/api/wechat/index/saveUser`,
    method: 'POST',
    data,
  })
}
