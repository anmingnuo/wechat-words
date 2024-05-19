import {http} from "@/utils/http";

export const getPolicy = () => {
  return http<any>({
    url: `/api/wechat/oss/ossPolicy`,
    method: 'GET',
  })
}
