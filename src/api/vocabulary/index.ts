import { http } from '@/utils/http'

/** get 请求 */
export const getword = (userId: string) => {
  return http<any>({
    url: `/api/wechat/word/${userId}`,
    method: 'GET',
  })
}

export const saveWord = (data: {userId:number;wordId:number}) => {
  return http<any>({
    url: `/api/wechat/vocabularyList/save`,
    method: 'POST',
    data
  })
}

export const removeWord = (data: {userId:number;wordId:number}) => {
  return http<any>({
    url: `/api/wechat/vocabularyList/remove/`,
    method: 'POST',
    data
  })
}

export const record = (data: { wordId: number; userId: number;level:number }) => {
  return http<any>({
    url: `/api/wechat/record`,
    method: 'POST',
    data,
  })
}

export const getVocabularyList = ({userId,page,size}: { userId: number; page: number;size:number }) => {
  return http<any>({
    url: `/api/wechat/vocabularyList/get/${userId}/${page}/${size}`,
    method: 'GET'
  })
}
export const searchWord = (userId: string,value:string) => {
  return http<any>({
    url: `/api/wechat/word/searchWord/${userId}/${value}`,
    method: 'GET',
  })
}
