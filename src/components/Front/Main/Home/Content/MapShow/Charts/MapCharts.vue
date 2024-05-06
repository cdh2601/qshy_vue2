<template>
  <div>
    <div
      id="map"
      :style="{ height: height + 'px', width: width + 'px' }"
      class="m-auto"
    ></div>
  </div>
</template>
  <script>
import * as echarts from "echarts";
import MapFull from "@/assets/json/full.json";
import jiadingMap from "@/assets/json/jiading.json";
import huangpuMap from "@/assets/json/huangpu.json";
import pudongMap from "@/assets/json/pudong.json";
import qingpuMap from "@/assets/json/qingpu.json";
import songjiangMap from "@/assets/json/songjiang.json";
import hongkouMap from "@/assets/json/hongkou.json";
import putuoMap from "@/assets/json/putuo.json";
import changningMap from "@/assets/json/changning.json";
import fengxianMap from "@/assets/json/fengxian.json";
import chongmingMap from "@/assets/json/chongming.json";
import baoshanMap from "@/assets/json/baoshan.json";
import jinganMap from "@/assets/json/jingan.json";
import xuhuiMap from "@/assets/json/xuhui.json";
import minhangMap from "@/assets/json/minhang.json";
import yangpuMap from "@/assets/json/yangpu.json";
import jinshanMap from "@/assets/json/jinshan.json";
import { cloneDeep } from "lodash/lang";
export default {
  name: "MapChart",
  props: {
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 800,
    },
    plantIndex: {
      type: Number,
    },
    plantList: {
      type: Array,
    },
    options: {
      type: Object,
    },
    mapData: {
      type: Array,
    },
    childMapData: {
      type: Array,
    },
    mapDataDefault: {
      type: Array,
    },
    // geoCoordMap: {
    //   type: Array,
    // },
    // lineEndCoords: {
    //   type: Array,
    // },
  },
  data() {
    return {
      mapChart: Object,
      // 地图的geo数据
      maps: [
        {
          name: "MapFull",
          geo: cloneDeep(MapFull),
        },
        {
          name: "嘉定区",
          geo: cloneDeep(jiadingMap),
        },
        {
          name: "黄浦区",
          geo: cloneDeep(huangpuMap),
        },
        {
          name: "浦东新区",
          geo: cloneDeep(pudongMap),
        },
        {
          name: "青浦区",
          geo: cloneDeep(qingpuMap),
        },
        {
          name: "松江区",
          geo: cloneDeep(songjiangMap),
        },
        {
          name: "虹口区",
          geo: cloneDeep(hongkouMap),
        },
        {
          name: "普陀区",
          geo: cloneDeep(putuoMap),
        },
        {
          name: "长宁区",
          geo: cloneDeep(changningMap),
        },
        {
          name: "奉贤区",
          geo: cloneDeep(fengxianMap),
        },
        {
          name: "崇明区",
          geo: cloneDeep(chongmingMap),
        },
        {
          name: "宝山区",
          geo: cloneDeep(baoshanMap),
        },
        {
          name: "静安区",
          geo: cloneDeep(jinganMap),
        },
        {
          name: "徐汇区",
          geo: cloneDeep(xuhuiMap),
        },
        {
          name: "闵行区",
          geo: cloneDeep(minhangMap),
        },
        {
          name: "杨浦区",
          geo: cloneDeep(yangpuMap),
        },
        {
          name: "金山区",
          geo: cloneDeep(jinshanMap),
        },
      ],
      details: {},
      // 定义当前地图的父级；用与change事件的参数拼接
      baseCity: "上海市",
      // 下钻后地图的数据，从maps里取
      cur: {},
      // 下钻深度，用于控制地图点击和返回判断
      depth: 1,
      // echarts 配置；这里主要配置geo和scatter；详见https://echarts.apache.org/zh/option.html#geo和https://echarts.apache.org/zh/opt.html#series-scatter
      // 这里建议使用公用的基础的配置，详细配置应在renderChart中完成
      option: {
        geo: {
          map: "shanghai",
          z: 2,
          center: [],
          show: true,
          left: 20,
          right: 180,
          top: 0,
          bottom: 0,
          roam: false,
          selectedMode : 'single',
          bottle: [],
          label: {
            color: "#fff",
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          itemStyle: {
            // color: "#44C76F",
            borderColor: "#fff",
            borderWidth: 0.5,
            label: { show: false, color: "#fff" },
          },
          emphasis: {
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 20,
            },
            label: {
              show: true,
              color: "#fff",
            },
          },
          select: {
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1.5,
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 20,
            },
            label: { show: true, color: "#fff" },
          },
          regions: [
            {
              name: "嘉定区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "黄浦区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "浦东新区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "青浦区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "松江区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "虹口区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "普陀区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "长宁区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "奉贤区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "崇明区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "宝山区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "静安区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "徐汇区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "闵行区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "杨浦区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
            {
              name: "金山区",
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'rgb(184, 28, 34)',
                  // borderColor: '#0071e7',
                },
                emphasis: {
                  areaColor: 'rgb(184, 28, 34)'
                }
              }
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.mapChart = echarts.init(document.getElementById("map"));
    // 注册地图
    echarts.registerMap("shanghai", MapFull);
    // 自定义的地图渲染方法；主要是echarts的setOption方法起作用
    this.renderChart();
    //如果传入了散点数据，就进行渲染
    this.setData(this.mapData);
    this.mapChart.setOption(this.option);

    // 监听地图点击事件,
    this.mapChart.on("dblclick", (params) => {
      // console.log(this.mapData);
      this.$bus.$emit('dblclick',params.name,this.depth)
      // 下钻
      if (this.depth === 1 && this.childMapData) {
        this.cur = this.maps.find((el) => el.name === params.name);
        this.depth = 2;
        for (let i = 0; i < this.mapData.length; i++) {
          this.option.series[i].data = this.childMapData[i].filter(
            (el) => el.name === this.cur.name
          );
        }
        this.$emit(
          "change",
          this.baseCity + ">" + this.cur.name + ">总览",
          this.depth
        );
        this.initMap();
      }
      //返回
      else {
        this.cur = this.maps[0];
        this.depth = 1;
        for (let i = 0; i < this.mapData.length; i++) {
          this.option.series[i].data = this.childMapData[i];
        }
        this.setData(this.mapData);
        this.$emit("change", this.baseCity + ">总览", this.depth);
        this.initMap();
      }
    });

    //点击散点图标事件
    this.mapChart.on("click", (params) => {
      if (params.componentSubType === "scatter") {
        // console.log(params.data);
        this.$emit("getId", params.data.id);
        this.viewsDetails(params.data.type);
      }
    });
    // console.log(this.mapData);
    window.addEventListener("resize", function () {
      echarts.init(document.getElementById("map")).resize();
    });
  },
  methods: {
    // 切换geo数据
    initMap() {
      echarts.registerMap("shanghai", this.cur.geo);
      this.renderChart();
    },
    //地图渲染
    renderChart() {
      this.option = { ...this.options, ...this.option };
      this.mapChart.setOption(this.option);
      // console.log(this.option.geo.regions);
    },
    //变更散点数据,若为子区域的数据，则需根据县区进行数据过滤
    setData(data) {
      for (let i = 0; i <= this.mapData.length - 1; i++) {
        this.option.series[i].data = data[i];
      }
    },
    //打开详情
    viewsDetails(name) {
      this.$emit("viewsDetails", name);
    },
  },
  watch: {
    //监听散点数据的变更
    plantIndex() {
      //六大景点类型进行变更
      //点击总览时进行所有数据的渲染
      if (this.plantIndex === 0) {
        for (let i = 0; i <= 7; i++) {
          if (this.depth === 2) {
            this.option.series[i].data = this.childMapData[i].filter(
              (el) => el.name === this.cur.name
            );
            this.$emit("change", this.baseCity + ">" + this.cur.name + ">总览");
          } else {
            this.option.series[i].data = this.mapData[i];
            this.$emit("change", this.baseCity + ">总览");
          }
        }
        // console.log(this.mapData);
      }
      //点击单个类型时进行选择性渲染
      else {
        for (let i = 0; i <= 7; i++) {
          this.option.series[i].data = [];
        }
        if (this.depth === 2) {
          this.option.series[this.plantIndex - 1].data = this.childMapData[
            this.plantIndex - 1
          ].filter((el) => el.name === this.cur.name);
          this.$emit(
            "change",
            this.baseCity +
              ">" +
              this.cur.name +
              ">" +
              this.plantList[this.plantIndex].name
          );
        } else {
          this.option.series[this.plantIndex - 1].data =
            this.mapData[this.plantIndex - 1];
          this.$emit(
            "change",
            this.baseCity + ">" + this.plantList[this.plantIndex].name
          );
        }
      }
      this.renderChart();
    },
  },
};
</script>

<style scoped>
</style>