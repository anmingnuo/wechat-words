import { http } from '@/utils/http'

/** get 请求 */
export const getPlan = (userId: string) => {
  return http<any>({
    url: `/api/wechat/plan/get/${userId}`,
    method: 'GET',
  })
}

export const updatePlan = (data: { dailyGoal: number; userId: number }) => {
  return http<any>({
    url: `/api/wechat/plan/update`,
    method: 'PUT',
    data,
  })
}
