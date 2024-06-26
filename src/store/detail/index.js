import {reqGetGoodsInfo,reqAddOrUpdateShopCart} from  '@/api'
import {getUUID} from '@/utils/uuid_token'
const actions = {
    async getGoodInfo({ commit },skuId) {
        let result = await reqGetGoodsInfo(skuId)
        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    async addOrUpdateShopCart({ commit },{skuId,skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // console.log(result)
        if (result.code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('false'))
        }
    }
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    },
}
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}