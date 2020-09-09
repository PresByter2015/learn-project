import request from '../utils/request/index'
// 订单-列表
interface PageF {
    pageNumber: number
    pageSize: number
}
export const userCenter = (pageF: PageF = { pageNumber: 1, pageSize: 10 }) => {
    return request.post(
        {
            url: 'v4/item/craftsman/card',
            data: {
                'page_number': pageF['pageNumber'],
                'page_size': pageF['pageSize'],
            }
        }
    );
}

export const doubanList = (pageF: PageF = { pageNumber: 1, pageSize: 10 }) => {
    return request.get(
        {
            url: 'https://api.douban.com/v2/movie/top250',
            data: {
                apikey: '0df993c66c0c636e29ecbb5344252a4a',
                start: pageF['pageNumber'],
                count: pageF['pageSize']
            }
        }
    );
}
