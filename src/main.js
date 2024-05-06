import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
//引入jvue组件库
import jvuewheel from '@jyeontu/jvuewheel'
//引入样式
import '@jyeontu/jvuewheel/lib/jvuewhell.css'
Vue.use(jvuewheel);
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

import BaiduMap from 'vue-baidu-map'

import Pagination from '@/components/Front/OtherModules/Pagination'
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/images/logo.png'
Vue.use(ElementUI);
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
Vue.use(BaiduMap,{
  ak:'De6AlAEjNg8yuRjUiiOOmA3vQjNiZagP'
});
Vue.component(Pagination.name,Pagination)

Vue.use(VueLazyload,{
  loading:atm
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;
  }
}).$mount('#app')
