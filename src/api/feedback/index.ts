import { http } from '@/utils/http'

/** get 请求 */
export const saveFeedback = (data: { title: string;content: string; userId: string }) => {
  return http<any>({
    url: `/api/wechat/feedback/save`,
    method: 'POST',
    data,
  })
}

export const getListByUserId = ({
  userId,
  page,
  size,
}: {
  userId: string
  page: string
  size: string
}) => {
  return http<any>({
    url: `/api/wechat/feedback/get/${userId}/${page}/${size}`,
    method: 'GET',
  })
}

export const getDeatilByfeedBackId = (feedBackId: string) => {
  return http<any>({
    url: `/api/wechat/feedback/getInfo/${feedBackId}`,
    method: 'GET',
  })
}
