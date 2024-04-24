import { http } from '@/utils/http'

/** get 请求 */
export const getBook = ({ page, size }: { page: number; size: number; keyword?: string }) => {
  return http<any>({
    url: `/api/wechat/book/get/${page}/${size}`,
    method: 'GET',
  })
}

export const getBookDatilByName = (bookName: string) => {
  return http<any>({
    url: `/api/wechat/book/get${bookName}`,
    method: 'GET',
  })
}

export const getBookDatilByID = (id: string) => {
  return http<any>({
    url: `/api/wechat/book/${id}`,
    method: 'GET',
  })
}

export const saveBook = (data: { bookId: number; userId: number }) => {
  return http<any>({
    url: `/api/wechat/bookSelection/save`,
    method: 'POST',
    data,
  })
}
