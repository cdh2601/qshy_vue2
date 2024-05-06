import request from "../utils/request";

// //十大名品 根据年份获取列表
// export function getListByYear() {
//     return request({
//         // url: `/api/datav/herb/top10/list?years=${year}`,
//         url: '/api/datav',
//         method: 'get'

//     });
// }

// //十大名品 根据id获取公司详细信息
// export function getCompanyById(data) {
//     return request({
//         url: `/api/datav/herb/top10/${data.id}`,
//         method: 'post',
//     });
// }

// //产新时间 获取产新地区
// export function getProductSchedulesArea() {
//     return request({
//         url: '/api/datav/herb/productSchedule/counties',
//         method: 'get'
//     });
// }

// //产新时间 根据年份及地区获取产新月份
// export function getProductSchedulesList(data) {
//     return request({
//         url: '/api/datav/herb/productSchedule/list',
//         method: 'post',
//         data
//     });
// }

// //产新时间 获取文山州重点药材产新时间汇总
// export function getProductSchedulesTotal(year) {
//     return request({
//         url: `/api/datav/herb/productSchedule/wszHerbProportion?year=${year}`,
//         method: 'get'
//     });
// }

// //科研机构 获取所有科研机构
// export function getTechnologyInstitutions() {
//     return request({
//         url: '/api/datav/herb/institution',
//         method: 'get'
//     });
// }

// //科研机构 根据id获取科研机构详细信息
// export function getTechnologyInstitutionsById(id) {
//     return request({
//         url: `/api/datav/herb/institution/${id}`,
//         method: 'get'
//     });
// }

// //园区市场 获取所有园区
// export function getMarketParks() {
//     return request({
//         url: 'api/datav/herb/parkAndMarket',
//         method: 'get'
//     });
// }

// //园区市场 根据id获取园区详细信息
// export function getMarketParksById(id, type) {
//     return request({
//         url: `api/datav/herb/parkAndMarket/herbOrMarket?id=${id}&type=${type}`,
//         method: 'get'
//     });
// }

// //获取景点列表
// export function getAttractions() {
//     return request({
//         url: 'api/selectActivityCount',
//         method: 'get',
//         asyn: true
//     });
// }

// //根据景点id获取景点详情
// export function getAttractionsById(id) {
//     return request({
//         url: `/api/selectAttractionsById/${id}`,
//         method: 'get'
//     });
// }

// //根据景点id获取景点图片
// export function getPicturesById(id) {
//     return request({
//         url: `/api/selectPictureById/${id}`,
//         method: 'get'
//     });
// }

// //获取季节列表
// export function getSeasons() {
//     return request({
//         url: '/api/selectSeasons',
//         method: 'get',
//     });
// }

// //获取推荐时间表
// export function getRecommendTime() {
//     return request({
//         url: '/api/selectRecommendTime',
//         method: 'get'
//     });
// }
