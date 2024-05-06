<template>
  <!--中部地图-->
  <div
    class="self-center w-2/3 animate-fadeIn m-auto"
    style="width: 1100px; margin: 0 auto"
  >
    <div>
      <h1
        class="mb-1 font-30 font-bold"
        style="
          color: rgb(143, 147, 153);
          font-size: 20px;
          width: 1026px;
          line-height: 30px;
          margin-bottom: 20px;
          margin-top: -20px;
          border-bottom: 2px solid rgb(230, 230, 230);
          padding-bottom: 20px;
          margin-left: 50px;
        "
      >
        当前位置：{{ this.currentTitle }}
      </h1>
    </div>
    <div>
      <map-chart
        ref="map"
        @change="handleChange"
        @getId="getId"
        :height="600"
        :width="850"
        :plantIndex="timeIndex"
        :plantList="plantList"
        :options="option"
        :mapData="childMapData"
        :childMapData="childMapData"
        v-on:viewsDetails="viewsDetails"
      />
      <nameDetail
        :didian="didian"
        :attrtion="attrtion"
        v-on:closeDetail="closeDetails"
        v-if="this.showDetails === true"
      ></nameDetail>
      <detail
        ref="detail"
        :DetailMessage="tourismDetail"
        v-on:closeDetail="closeDetails"
        :details="details"
        :pictures="pictures"
      ></detail>
      <time-line-plant
        v-on:changeAreaFromSon="changeArea"
        :index="timeIndex"
      ></time-line-plant>
    </div>
  </div>
</template>

<script>
import MapChart from "./Charts/MapCharts";
import TimeLinePlant from "./TimeLinePlant/TimeLinePlant";
import Detail from "./Detail/Detail";
import NameDetail from "./NameDetail/NameDetail";
import * as echarts from "echarts";
import Axios from "@/utils/request";

export default {
  name: "MapShow",
  components: { MapChart, TimeLinePlant, Detail, NameDetail },
  data() {
    return {
      didian: "",
      attrtion: {},
      histogram: "",
      pieChart: "",
      depth: 1,
      season: {},
      newData: [],
      chartsTitle: "2019年文山州中药材重点品种",
      currentDate: 6,
      attractions: [],
      marketList: [
        {
          name: "春",
          value: ["七丹药业股份有限公司", "百汇药材林果种植有限公司"],
        },
        {
          name: "夏",
          value: ["顾五三七种植销售有限公司", "百汇药材林果种植有限公司"],
        },
        {
          name: "秋",
          value: [
            "星海重楼种植农民专业合作社",
            "林沃草果种植农民专业合作社",
            "满堂野生药用植物保育专业合作社",
          ],
        },
        {
          name: "冬",
          value: ["星海重楼种植农民专业合作社"],
        },
      ],
      tourismDetail: [
        {
          name: "上海市",
          number: "56",
          address: "外滩",
          text: "到上海，你永远不会觉得无事可做，你可以到外滩尽情感受夜的风情，去徐汇区的天平路和湖南路找最漂亮的老洋房，在老上海的里弄感受历史的沉淀，或者索性也彻底小资一把，去田子坊、新天地静坐冥想，任时光流逝；衡山路酒吧街对饮狂欢；1933老厂房这些艺术仓库看看中西混搭的艺术魅力。最后千万别忘了登上东方明珠，放眼看看这个国际化的大都市。",
        },
        {
          name: "宝山区",
          number: "1",
          address: "上海玻璃博物馆",
          text: "位于上海市北部，东北濒长江，东临黄浦江，南与杨浦、虹口、静安、普陀4区毗连，西与嘉定区交界，西北隅与江苏省苏州市太仓市为邻，横贯中部的蕰藻浜将全区分成南北两部，吴淞大桥、江杨路大桥、蕰川路大桥、康宁路大桥、沪太路大桥横跨其上。全境东西长17.5千米，南北宽约23.08千米，区域总面积365.3平方千米，其中陆域总面积302.3平方千米。",
        },
        {
          name: "崇明区",
          number: "1",
          address: "东滩湿地公园",
          text: "隶属上海市。地处长江入海口。三面环江，一面临海，西接长江，东濒东海，南与浦东新区、宝山区及江苏省太仓市隔水相望，北与南通市海门区、启东市一衣带水，总面积1413平方千米。崇明是上海最纯正的乡下农田，获得中国长寿之乡、国家级生态示范区、第一批国家农业可持续发展试验示范区、第二批中国特色农产品优势区等荣誉称号。",
        },
        {
          name: "长宁区",
          number: "3",
          address: "上海儿童博物馆",
          text: "地处上海市中心城区西部，东与静安区、徐汇区毗邻，西、南与闵行区相接，北与普陀区、嘉定区相连。区域面积37.18平方公里，户籍人口57.41万。2020年全年实现长宁区生产总值1561.17亿元。拥有上海最集中的涉外高标准住宅商务办公综合区古北新区、老上海传统的高级住宅区新华路、虹桥花园别墅区、苏州河沿线中高档住宅区和普通新村住宅区。",
        },
        {
          name: "奉贤区",
          number: "1",
          address: "海湾国家森林公园",
          text: "隶属于上海市，位于长江三角洲东南端，位于上海南部，东与浦东新区接壤，西与金山区和松江区毗邻，南临杭州湾，北与闵行区相隔黄浦江。 距上海市中心人民广场42千米，距浦东国际机场30千米，有13.7千米长的江岸线和31.6千米的海岸线，总面积733.38平方千米。",
        },
        {
          name: "虹口区",
          number: "4",
          address: "1933老场坊",
          text: "上海市辖区，位于上海市中心城区东北部。东与杨浦区接壤；西与静安区毗连；南与浦东新区隔江相望，与黄浦区毗邻；北与宝山区相接。虹口区境内原为东海之滨的滩地，多河道港汊，区境总面积23.48平方千米。拥有世界级的虹口足球场，是北上海最好的区。人口居住密度最大的区之一，也可以说是北上海最有文化底蕴的地区。",
        },
        {
          name: "黄浦区",
          number: "18",
          address: "上海新天地",
          text: "隶属于上海市，地处黄浦江和苏州河合流处的西南端。北起苏州河，东、南濒黄浦江，西至成都北路、延安中路、陕西南路、肇嘉浜路、瑞金南路。全区面积为20.52平方千米，其中陆地面积18.71平方千米，水域面积1.81平方千米。上海城市坐标原点位于本区内的国际饭店",
        },
        {
          name: "嘉定区",
          number: "0",
          address: "无",
          text: "隶属于上海市，位于上海西北部。东与宝山、普陀两区接壤；西与江苏省昆山市毗连；南襟吴淞江，与闵行、长宁、青浦三区相望；北依浏河，与江苏省太仓市为邻。嘉定区全境地势平坦，水网密集，东北略高，西南稍低。市、区级河道蕰藻浜、练祁河、娄塘河横卧东西，向东流经宝山区直通长江和黄浦江；盐铁塘、横沥、新槎浦（罗蕰河）纵贯南北，与吴淞江、浏河相连。",
        },
        {
          name: "静安区",
          number: "2",
          address: "静安寺",
          text: "隶属上海市，位于上海市中心城区中部，与六个区相邻，东与黄浦区、虹口区、宝山区为邻；西长宁区、普陀区、宝山区交界；南临长乐路，与徐汇区衔接；北与宝山区接壤。“静安”因境内古刹静安寺而得名，地处上海市中心，周边与6个区相邻，历史文脉悠久、城市环境优美、商业商务发达、创新活力迸发、信息交通便捷，是上海对外交流的重要窗口。",
        },
        {
          name: "金山区",
          number: "1",
          address: "枫泾古镇",
          text: "隶属于上海市，是上海西南部远郊，位于中国长江以南、黄浦江上游南岸，东与奉贤区接壤、北与松江区、青浦区为邻，西与浙江平湖、嘉善交界。全境地势低平，地面高程自北西至东南略有升高。河流属黄浦江水系，源出浙江天目山区。全区总面积613平方千米。也是石油工业区。",
        },
        {
          name: "闵行区",
          number: "2",
          address: "闵行体育公园",
          text: "隶属于上海市，位于上海市中部，形似一把“钥匙”，东与徐汇区、浦东新区相接；南靠黄浦江与奉贤区相望；西与松江区、青浦区接壤；北与长宁区、嘉定区毗邻，中心位置地理坐标：北纬31°5′，东经121°25′；总面积372.56平方千米。闵行区地势平坦，地面标高3.3～4.8米；黄浦江贯穿闵行区，吴淞江、淀浦河、大治河等骨干水系与区内200多条河道组成河网。",
        },
        {
          name: "浦东新区",
          number: "9",
          address: "上海迪士尼度假区",
          text: "为上海市的一个市辖区，因地处黄浦江东而得名。浦东南与奉贤区、闵行区两区接壤，西与徐汇区、黄浦区、虹口区、杨浦区、宝山区五区隔黄浦江相望，北与崇明区隔长江相望；地势东南高，西北低，气温偏高、降水偏多、日照时数偏少；浦东新区区域面积1210平方公里，现辖12个街道、24个镇。大浦东拥有陆家嘴金融中心，是目前上海的核心金融中心。",
        },
        {
          name: "普陀区",
          number: "1",
          address: "M50创意园",
          text: "隶属于上海市，位于上海中心城区西北部，是沪宁发展轴线的起点，也是上海连接长三角及内地的重要陆上门户和交通枢纽。西、北和嘉定区、宝山区相接，东、南和静安区、长宁区、闵行区毗连。普陀区是上海市西部的水陆交通要道，以境内普陀路而得名。吴淞江横贯全境，是西连太湖流域，东通黄浦江、长江的内河航道。",
        },
        {
          name: "青浦区",
          number: "2",
          address: "朱家角古镇",
          text: "上海市市辖区，地处上海市西南部，太湖下游，黄浦江上游。东与闵行区毗邻，西连江苏省苏州市吴江区、昆山市，南与松江区、金山区及浙江省嘉善县接壤，北与嘉定区相接，总面积668.54平方公里。地形东西两翼宽阔，中心区域狭长。地势平坦，平均海拔高度在2.8米-3.5米之间。农业发达，淀山湖美。",
        },
        {
          name: "松江区",
          number: "5",
          address: "泰晤士小镇",
          text: "位于上海市西南部，历史文化悠久，有着“上海之根” 的称呼。位于黄浦江上游，东与闵行区、奉贤区为邻，南、西南与金山区交界，西、北与青浦区接壤；区境南北长约24千米，东西宽约25千米。总面积604.64平方千米。国家商品粮基地和上海市副食品基地之一。特产有“四鳃鲈鱼”等。拥有一个大学城，科技区，郊区最好的地区之一。",
        },
        {
          name: "徐汇区",
          number: "5",
          address: "上海植物园",
          text: "上海市辖区，位于上海中心城区的西南部，东北侧与黄浦区毗邻，东临黄浦江，与浦东新区隔江相望，西与闵行区分界，北与静安区、长宁区接壤。全境面积54.93平方千米。徐汇是上海较早基本完成旧区改造的中心城区之一。徐汇重点发展信息技术、现代生物医药、纳米新材料等高新技术产业，形成区工业电子信息业和生物医药业发展的产业规模。",
        },
        {
          name: "杨浦区",
          number: "1",
          address: "上海共青森林公园",
          text: "隶属上海市，位于上海中心城区东北部，地处黄浦江下游西北岸，与浦东新区隔江相望，西临虹口区，北与宝山区接壤。总面积60.61平方公里。坐拥超越徐汇滨江的杨浦滨江、堪比徐家汇的五角场、堪比硅谷的大连路、堪比古北的新江湾城那个大学城。另外还有复旦同济财大等一流高校，通过借鉴美国硅谷的模式，以大学为依托发展产学研企业平台。",
        },
      ],
      showDetails: false,
      companyDetailsList: {
        logo: "../assets/images/nav-icon1.png",
        brand: "云南七丹药业股份有限公司",
        productIntro:
          "三七健康产品制造专家——云南七丹药业股份有限公司成立于2008年3月，注册资本金9978万元，是专业从事三七药材规范化种植、产品研发、生产、加工、销售的全产业链科技创新型新三板上市企业，是三七之乡——文山州第一家专业生产三七饮片的国家高新技术企业。公司成立以来，采用新技术、新设备和自主创新方法，先后建成了中药饮片、保健食品、中药材提取及牙膏生产线，并获得了药品生产许可证、药品经营许可证（批发、零售）、化妆品生产许可证、食品生产许可证，通过了中药饮片、化妆品ISO9001及保健食品、食品ISO22000认证。形成了以文山道地药材三七为主，涵盖中药饮片、保健食品、日化用品及中药材提取物生产及流通的业务格局。",
        companyIntro: "位置：文山市秉烈乡卡作村委会下卡作村",
      },
      details: {},
      pictures: {},
      title: "药园详情",
      obj: { name: "", value: "", aid: "" },
      seasonData: [],
      little: true,
      value1: 1,
      timeIndex: 0,
      timeIndex1: 1,
      timeIndex2: "",
      currentTitle: "上海市",
      // geoCoordMap: [{ name: "闵行区", value: [121.375972, 31.111658] }],
      // lineEndCoords: [
      //   {
      //     name: "闵行区",
      //     value: [
      //       this.geoCoordMap["闵行区"][0],
      //       this.geoCoordMap["闵行区"][1] + 8,
      //     ],
      //   },
      // ],
      option: {
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#2b73c5",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#7dcd7b",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#ffc656",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#ff5c5c",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#52bfdd",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#00a685",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#ff7d47",
            itemStyle: { opacity: 0.8 },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            symbol: "pin",
            color: "#a45db2",
            itemStyle: { opacity: 0.8 },
          },
          // {
          //   type: "lines",
          //   label: {
          //     show: true,
          //     formatter: "{b}",
          //     padding: [10, 10],
          //   },
          //   symbolSize: [10, 10],
          //   data: [
          //     {
          //       name: "宝山区",
          //       coords: [
          //         [121.489934, 31.398896],
          //         [121.489934, 31.398896],
          //       ],
          //     },
          //     {
          //       name: "长宁区",
          //       coords: [
          //         [121.4222, 31.218123],
          //         [122.2, 31.1],
          //       ],
          //     },
          //     {
          //       name: "崇明区",
          //       coords: [
          //         [121.397516, 31.626946],
          //         [121.397516, 31.626946],
          //       ],
          //     },
          //     {
          //       name: "奉贤区",
          //       coords: [
          //         [121.458472, 30.912345],
          //         [121.458472, 30.912345],
          //       ],
          //     },
          //     {
          //       name: "虹口区",
          //       coords: [
          //         [121.491832, 31.26097],
          //         [122.281832, 31.3],
          //       ],
          //     },
          //     {
          //       name: "黄浦区",
          //       coords: [
          //         [121.490317, 31.222771],
          //         [122.1, 31.15],
          //       ],
          //     },
          //     {
          //       name: "嘉定区",
          //       coords: [
          //         [121.250333, 31.383524],
          //         [121.250333, 31.383524],
          //       ],
          //     },
          //     {
          //       name: "静安区",
          //       coords: [
          //         [121.448224, 31.229003],
          //         [122.279224, 31.2],
          //       ],
          //     },
          //     {
          //       name: "金山区",
          //       coords: [
          //         [121.330736, 30.724697],
          //         [121.330736, 30.724697],
          //       ],
          //     },
          //     {
          //       name: "闵行区",
          //       coords: [
          //         [121.375972, 31.111658],
          //         [121.375972, 31.111658],
          //       ],
          //     },
          //     {
          //       name: "浦东新区",
          //       coords: [
          //         [121.567706, 31.245944],
          //         [121.567706, 31.245944],
          //       ],
          //     },
          //     {
          //       name: "普陀区",
          //       coords: [
          //         [121.392499, 31.241701],
          //         [122.242499, 31.241701],
          //       ],
          //     },
          //     {
          //       name: "青浦区",
          //       coords: [
          //         [121.113021, 31.151209],
          //         [121.113021, 31.151209],
          //       ],
          //     },
          //     {
          //       name: "松江区",
          //       coords: [
          //         [121.223543, 31.03047],
          //         [121.223543, 31.03047],
          //       ],
          //     },
          //     {
          //       name: "徐汇区",
          //       coords: [
          //         [121.43752, 31.179973],
          //         [122.0, 31.079973],
          //       ],
          //     },
          //     {
          //       name: "杨浦区",
          //       coords: [
          //         [121.522797, 31.270755],
          //         [122.1, 31.4],
          //       ],
          //     },
          //   ],
          //   symbol: "circle",
          //   lineStyle: {
          //     type: "soild",
          //     opacity: 1,
          //   },
          // },
        ],
      },
      plantList: [
        { name: "总览" },
        { name: "地标建筑" },
        { name: "亲子游" },
        { name: "上海夜景" },
        { name: "小清新摄影地" },
        { name: "人气免票公园" },
        { name: "历史烙印" },
        { name: "周边古镇" },
        { name: "绿色户外" },
      ],
      mapData: [[], [], [], [], [], [], [], []],
      childMapData: [
        [
          // {
          //   id: 1,
          //   type: "东方明珠广播电视塔",
          //   value: [121.506379, 31.245414],
          //   name: "浦东新区",
          // },
          // {id: 10, type: "上海博物馆", value: [121.482126, 31.23419], name: "黄浦区"},
          {
            id: 11,
            type: "上海环球金融中心",
            value: [121.514263, 31.240165],
            name: "浦东新区",
          },
          // {
          //   id: 12,
          //   type: "万国建筑博览群",
          //   value: [121.495864, 31.244866],
          //   name: "黄浦区",
          // },
          // {
          //   id: 13,
          //   type: "徐家汇天主堂",
          //   value: [121.442629, 31.1975],
          //   name: "徐汇区",
          // },
          // {
          //   id: 14,
          //   type: "金茂大厦88层观光厅",
          //   value: [121.512241, 31.240849],
          //   name: "浦东新区",
          // },
          // {
          //   id: 15,
          //   type: "上海大剧院",
          //   value: [121.478399, 31.235344],
          //   name: "黄浦区",
          // },
          // {
          //   id: 16,
          //   type: "上海音乐厅",
          //   value: [121.484277, 31.232783],
          //   name: "黄浦区",
          // },
        ],
        [
          // {id: 10, type: "上海博物馆", value: [121.482126, 31.23419], name: "黄浦区"},
          {
            id: 17,
            type: "上海野生动物园",
            value: [121.728426, 31.059867],
            name: "浦东新区",
          },
          {
            id: 18,
            type: "上海科技馆",
            value: [121.547823, 31.224356],
            name: "浦东新区",
          },
          {
            id: 19,
            type: "上海迪士尼度假区",
            value: [121.671964, 31.148267],
            name: "浦东新区",
          },
          // {
          //   id: 2,
          //   type: "上海杜莎夫人蜡像馆",
          //   value: [121.47988, 31.240463],
          //   name: "黄浦区",
          // },
          {
            id: 20,
            type: "上海辰山植物园",
            value: [121.189029, 31.081656],
            name: "松江区",
          },
          {
            id: 21,
            type: "上海共青森林公园",
            value: [121.55837, 31.325265],
            name: "杨浦区",
          },
          // {
          //   id: 22,
          //   type: "上海世博会博物馆",
          //   value: [121.488517, 31.200168],
          //   name: "黄浦区",
          // },
          {
            id: 23,
            type: "上海玻璃博物馆",
            value: [121.478617, 31.349808],
            name: "宝山区",
          },
          // {
          //   id: 24,
          //   type: "上海琉璃艺术博物馆",
          //   value: [121.476865, 31.213833],
          //   name: "黄浦区",
          // },
          {
            id: 25,
            type: "东滩湿地公园",
            value: [121.958815, 31.522824],
            name: "崇明区",
          },
          // {
          //   id: 26,
          //   type: "上海图书馆徐家汇藏书楼",
          //   value: [121.444154, 31.198527],
          //   name: "徐汇区",
          // },
          {
            id: 27,
            type: "上海儿童博物馆",
            value: [121.419405, 31.199852],
            name: "长宁区",
          },
        ],
        [
          // {id: 28, type: "外滩", value: [121.497204, 31.243453], name: "黄浦区"},
          {
            id: 1,
            type: "东方明珠广播电视塔",
            value: [121.506379, 31.245414],
            name: "浦东新区",
          },
          // {id: 29, type: "陆家嘴", value: [121.509106, 31.242201], name: "浦东新区"},
          // {
          //   id: 3,
          //   type: "上海新天地",
          //   value: [121.480625, 31.228445],
          //   name: "黄浦区",
          // },
          {
            id: 30,
            type: "静安寺",
            value: [121.451746, 31.229861],
            name: "静安区",
          },
          // {
          //   id: 31,
          //   type: "上海人民广场",
          //   value: [121.481099, 31.238688],
          //   name: "黄浦区",
          // },
          // {
          //   id: 14,
          //   type: "金茂大厦88层观光厅",
          //   value: [121.512241, 31.240849],
          //   name: "浦东新区",
          // },
          // {id: 32, type: "滨江大道", value: [121.535208, 31.39169], name: "浦东新区"},
          // {
          //   id: 33,
          //   type: "淮海路商业街",
          //   value: [121.482248, 31.229475],
          //   name: "黄浦区",
          // },
        ],
        [
          {
            id: 34,
            type: "田子坊",
            value: [121.474957, 31.214237],
            name: "黄浦区",
          },
          {
            id: 9,
            type: "1933老场坊",
            value: [121.49833, 31.260148],
            name: "虹口区",
          },
          {
            id: 35,
            type: "泰晤士小镇",
            value: [121.204015, 31.039962],
            name: "松江区",
          },
          // {id: 36, type: "甜爱路", value: [121.4915, 31.277272], name: "虹口区"},
          // {
          //   id: 37,
          //   type: "多伦路文化名人街",
          //   value: [121.48812, 31.269881],
          //   name: "虹口区",
          // },
          // {id: 38, type: "M50创意园", value: [121.455795, 31.254456], name: "普陀区"},
          // {
          //   id: 39,
          //   type: "老码头创意园区",
          //   value: [121.512289, 31.225078],
          //   name: "黄浦区",
          // },
          // {
          //   id: 4,
          //   type: "红坊国际艺术文化社区",
          //   value: [121.384231, 31.223673],
          //   name: "长宁区",
          // },
        ],
        [
          // {id: 40, type: "人民公园", value: [121.479656, 31.238252], name: "黄浦区"},
          // {id: 41, type: "鲁迅公园", value: [121.490155, 31.277476], name: "虹口区"},
          {
            id: 42,
            type: "中山公园",
            value: [121.425343, 31.228269],
            name: "长宁区",
          },
          {
            id: 43,
            type: "静安雕塑公园",
            value: [121.47046, 31.240967],
            name: "静安区",
          },
          {
            id: 44,
            type: "闵行体育公园",
            value: [121.377542, 31.149117],
            name: "闵行区",
          },
          {
            id: 45,
            type: "徐家汇公园",
            value: [121.497587, 31.247448],
            name: "徐汇区",
          },
          // {id: 46, type: "黄浦公园", value: [121.497587, 31.247448], name: "黄浦区"},
          {
            id: 47,
            type: "上海海湾国家森林公园",
            value: [121.693701, 30.868266],
            name: "奉贤区",
          },
        ],
        [
          // {id: 48, type: "豫园", value: [121.498732, 31.232741], name: "黄浦区"},
          // {
          //   id: 49,
          //   type: "中共一大会址",
          //   value: [121.481827, 31.226053],
          //   name: "黄浦区",
          // },
          // {
          //   id: "5",
          //   type: "中共代表团驻沪办事处旧址",
          //   value: [121.474863, 31.22027],
          //   name: "黄浦区",
          // },
          {
            id: "50",
            type: "龙华古寺",
            value: [121.458265, 31.181637],
            name: "徐汇区",
          },
          {
            id: "30",
            type: "静安寺",
            value: [121.451746, 31.229861],
            name: "静安区",
          },
        ],
        [
          {
            id: "51",
            type: "朱家角古镇",
            value: [121.060838, 31.11664],
            name: "青浦区",
          },
          {
            id: "52",
            type: "七宝古镇",
            value: [121.361199, 31.158938],
            name: "闵行区",
          },
          {
            id: "53",
            type: "枫泾古镇",
            value: [121.022069, 30.893215],
            name: "金山区",
          },
          {
            id: "54",
            type: "新场古镇",
            value: [121.65242, 31.031051],
            name: "浦东新区",
          },
          {
            id: "55",
            type: "练塘古镇",
            value: [121.051376, 31.013792],
            name: "青浦区",
          },
        ],
        [
          // {
          //   id: "56",
          //   type: "上海植物园",
          //   value: [121.450949, 31.153874],
          //   name: "徐汇区",
          // },
          {
            id: "6",
            type: "佘山国家森林公园",
            value: [121.201875, 31.101349],
            name: "松江区",
          },
          {
            id: "7",
            type: "东佘山园",
            value: [121.206547, 31.100642],
            name: "松江区",
          },
          {
            id: "8",
            type: "国家森林公园西佘山园",
            value: [121.198551, 31.10063],
            name: "松江区",
          },
        ],
      ],
    };
  },
  methods: {
    getId(id) {
      let params = { scenicId: id };
      Axios.get("/scenic/oneInfo", {
        params,
      }).then((res) => {
        // console.log(res);
        this.attrtion = res.data.scenic;
      });
    },
    //选择季节
    changeMarket(index) {
      this.timeIndex1 = index;
      this.timeIndex2 = null;
      if (index == 0) {
        this.currentDate = 3;
      } else if (index == 1) {
        this.currentDate = 6;
      } else if (index == 2) {
        this.currentDate = 9;
      } else {
        this.currentDate = 12;
      }
    },
    //选择药园
    changeChildMarket(index) {
      this.timeIndex2 = index;
      this.getId(index);
      this.showDetails = true;
    },
    handleChange(name, depth) {
      this.currentTitle = name;
      if (depth) {
        this.depth = depth;
        // console.log(depth);
        this.timeIndex = 0;
      }
    },
    changeArea(index) {
      this.timeIndex = index;
    },
    //关闭详情窗口
    closeDetails() {
      this.showDetails = false;
    },
    //打开详情
    viewsDetails(name) {
      this.showDetails = true;
      this.tourismDetail.name = name;
      this.didian = name;
    },
    dataLines(line) {
      var res = [];
      line.array.forEach((name) => {
        res.push({
          name: name,
          coords: [this.geoCoordMap[name], this.lineEndCoords[name]],
        });
      });
      return res;
    },
  },
  mounted() {
    this.changeArea(1);
    this.changeArea(0);
    this.currentDate = new Date().getMonth() + 1;
    // this.$refs.map.renderChart(this.option);
    // this.histogram = echarts.init(document.getElementById("rectangle"));
    // this.histogram.setOption(optionData1);
    // this.pieChart = echarts.init(document.getElementById("circle"));
    // this.pieChart.setOption(optionData2);
  },
  created() {
    //获取所有景点
    // getAttractions()
    //   .then((res) => {
    //     console.log(res);
    //     this.attractions = res;
    //     for (let i = 0; i < 30; i++) {
    //       // let botle = {};
    //       // botle.name = res[i].abelong;
    //       // botle.value = res[i].adegree.split(",");
    //       // botle.aid = res[i].aid;
    //       let botle = {};
    //       botle.name = res[i].abelong;
    //       botle.value = res[i].adegree.split(",");
    //       botle.aid = res[i].aid;
    //       if (res[i].atype == "城市公园类") {
    //         this.mapData[0].push(botle);
    //       }
    //       if (res[i].atype == "生物景观类") {
    //         this.mapData[1].push(botle);
    //       }
    //       if (res[i].atype == "古村古镇类") {
    //         this.mapData[2].push(botle);
    //       }
    //       if (res[i].atype == "地文景观类") {
    //         this.mapData[3].push(botle);
    //       }
    //       if (res[i].atype == "人文景观类") {
    //         this.mapData[4].push(botle);
    //       }
    //       if (res[i].atype == "水域风光类") {
    //         this.mapData[5].push(botle);
    //       }
    //       this.childMapData = this.mapData;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //获取季节
    //   getSeasons()
    //     .then((res) => {
    //       console.log(res);
    //       this.season = res;
    //       let bottle = this.season[1];
    //       this.season[1] = this.season[3];
    //       this.season[3] = bottle;
    //       for (let i = 0; i < res.length; i++) {
    //         this.season[i].sid = res[i].sid.split(",");
    //       }
    //       this.marketList = this.season;
    //       console.log(this.season);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  },
};
</script>

<style scoped>
</style>