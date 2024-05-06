import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
import search from './search'
import detail from './detail'
export default new Vuex.Store({
    modules:{search,detail}
})