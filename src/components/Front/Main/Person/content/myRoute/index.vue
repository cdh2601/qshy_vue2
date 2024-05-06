<template>
    <div class="rec-route">
      <!-- 路线推荐导航 -->
      <div class="route-nav">
        <div class="select-region">
          选择收藏路线所在区：
          <select name="region" v-model="areaSelect">
            <option v-for="(area,index) in areas" :key="index" :value="area.value">{{area.text}}</option>
          </select>
<!--          <spqn>{{areaSelect}}</spqn>-->
        </div>
        <div class="rec-words">
          快速筛选我的路线
        </div>
        <div class="search">
          <input type="text" v-model="keyWordRoute" placeholder="路线名称"/>
          <button type="button" class="searchbtn" @click="searchRoutes()">
            <div>
              搜索&nbsp;<i class="el-icon-search">
            </i>
            </div>
          </button>
        </div>
      </div>
      <!-- 路线推荐 -->
      <div class="route-list">
        <!-- 单个路线块 -->
        <recRouteItem :recRoutes="recRoutes" @getRecRoutes="getRecRoutes"></recRouteItem>
      </div>
    </div>
</template>

<script>
import recRouteItem from '@/components/Front/Main/Person/content/myRoute/myRouteItem'
import Axios from '@/utils/request.js'
export default {
  name: 'recRoute',
  components: {recRouteItem},
  created(){
    this.$bus.$on('goRecRoute',()=>{
      document.getElementById("recRoute").scrollIntoView({behavior:"smooth"})
    })
  },
  mounted(){
    this.getRecRoutes()
  },
  watch:{
    areaSelect:{
      // immediate:true,
      handler() {
        this.getRecRoutes()
      }
    }
  },
  methods:{
    searchRoutes(){
      // console.log(this.recRoutes)
      // for(let i=0;i<this.recRoutes.length;i++){
      //     if(this.recRoutes[i].routeName.includes(this.keyWordRoute)){
      //       console.log('sb')
      //     }
      // }
      if(this.keyWordRoute===''){
        this.getRecRoutes()
      }else {
        // console.log(this.recRoutes)
        this.recRoutes=this.recRoutes.filter(v=>{
          for(let i=0;i<v.scenics.length;i++){
            if(v.scenics[i].scenicName.includes(this.keyWordRoute)) {
              return true
            }
          }
          return false
        })
      }
      // console.log(this.recRoutes)
    },
    getRecRoutes(){
      let params={
        // area:this.areaSelect
        userId:JSON.parse(sessionStorage.getItem('userInfo')).userId
      }
      Axios.get('/route/userRoutes',{
        params
      }).then((res)=>{
        // console.log(res)
        this.recRoutes=[]
        if(this.areaSelect===null){
          for(let i=0;i<res.data.routes.length;i++){
            this.recRoutes.push(res.data.routes[i]);
          }
        }else{
          for(let i=0;i<res.data.routes.length;i++){
            for(let j=0;j<res.data.routes[i].locationList.length;j++){
              if(this.areaSelect===res.data.routes[i].locationList[j]){
                this.recRoutes.push(res.data.routes[i]);
              }
            }
          }
        }
        // console.log(this.recRoutes.length)
      })
    }
  },
  data() {
    return {
      recRoutes:[],
      keyWordRoute:'',
      areaSelect:null,
      areas:[
        {text:'选择地区',value:null},
        {text:'浦东新区',value:'浦东新区'},
          {text: '黄浦区',value:'黄浦区'},
          {text: '松江区',value:'松江区'},
          {text: '静安区',value:'静安区'},
          {text: '青浦区',value:'青浦区'},
          {text: '普陀区',value:'普陀区'},
          {text: '虹口区',value:'虹口区'},
          {text: '嘉定区',value:'嘉定区'},
          {text: '宝山区',value:'宝山区'},
          {text: '金山区',value:'金山区'},
          {text: '闵行区',value:'闵行区'},
          {text: '奉贤区',value:'奉贤区'},
          {text: '崇明区',value:'崇明区'},
          {text: '徐汇区',value:'徐汇区'},
          {text: '杨浦区',value:'杨浦区'},
          {text: '长宁区',value:'长宁区'},
      ]
    }
  },
}
</script>

<style scoped>
.route-nav {
  margin: 0 auto;
  margin-top: 30px;
  width: 1100px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 3px gray;
  align-items: center;
  border-radius: 5px;
}

.select-region {
  font-size: 18px;
}

.select-region select {
  font-size: 15px;
  padding: 5px;
  width: 100px;
  transition: 0.2s all linear;
  border-radius: 5px;
}

.select-region select:hover {
  box-shadow: 2px 2px 5px gray;
  cursor: pointer;
}

.route-nav .rec-words {
  font-size: 30px;
  color: rgb(184, 28, 34);
}

.route-nav .search {
  width: 250px;
  height: 30px;
  border: none;
  display: flex;
}

.route-nav .search .searchbtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60px;
  font-size: 10px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border: none;
  color: white;
  transition: 0.2s all linear;
  cursor: pointer;
  border-radius: 2px;
}

.route-nav .search input {
  transition: 0.2s all linear;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 5px;
}

.route-nav .search input:hover {
  box-shadow: 0 0 5px gray;
}

.route-nav .search .searchbtn:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}

/* 路线推荐 */
.route-list {
  margin: 0 auto;
  margin-top: 10px;
  width: 1100px;
  /* box-shadow: 0 0 3px gray; */
  overflow: hidden;
  margin-bottom: 100px;
}

</style>