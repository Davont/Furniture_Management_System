<template>
  <div class="dashboard-container">
    <github-corner class="github-corner"/>
    <panel-group/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div id="users" style="height:500px"></div>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div id="business" style="height:500px"></div>
    </el-row>
    <div class="dashboard-text">name:</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { usersList } from "@/api/user";
import { businessList } from "@/api/business";
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import echarts from "echarts";
require("@/utils/macarons"); // echarts theme
export default {
  name: "Dashboard",
  components: {
    GithubCorner,
    PanelGroup
  },
  mounted() {
    var usersChart = echarts.init(document.getElementById("users"), "macarons");
    var businessChart = echarts.init(
      document.getElementById("business"),
      "macarons"
    );
    console.log(document.getElementById("users"));
    usersList().then(res => {
      let array = res.data;
      let nameArr = [];
      let paidArr = [];
      array.forEach(element => {
        nameArr.push(element.users_email);
        paidArr.push(element.users_consumption);
        // 绘制图表
        usersChart.setOption({
          title: {
            text: "用户消费情况",
            subtext: "数据来自数据库"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["用户"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: "category",
            data: nameArr
          },
          series: [
            {
              type: "bar",
              data: paidArr,
              itemStyle: {
                normal: {
                  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      "#C1232B",
                      "#B5C334",
                      "#FCCE10",
                      "#E87C25",
                      "#27727B",
                      "#FE8463",
                      "#9BCA63",
                      "#FAD860",
                      "#F3A43B",
                      "#60C0DD",
                      "#D7504B",
                      "#C6E579",
                      "#F4E001",
                      "#F0805A",
                      "#26C0C0"
                    ];
                    return colorList[params.dataIndex];
                  }, //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: "top",
                    //                             formatter: '{c}'
                    formatter: "{b}\n{c}"
                  }
                }
              }, //设置柱的宽度，要是数据太少，柱子太宽不美观~
              barWidth: 70
            }
          ]
        });
      });
    });
    businessList().then(res => {
      let array = res.data;
      let nameArr = [];
      let paidArr = [];
      array.forEach(element => {
        nameArr.push(element.business_name);
        paidArr.push(element.business_revenues);
        // 绘制图表
        businessChart.setOption({
          title: {
            text: "商户盈利情况",
            subtext: "数据来自数据库"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["商户"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: "category",
            data: nameArr
          },
          series: [
            {
              type: "bar",
              data: paidArr,
              itemStyle: {
                normal: {
                  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      "#C1232B",
                      "#B5C334",
                      "#FCCE10",
                      "#E87C25",
                      "#27727B",
                      "#FE8463",
                      "#9BCA63",
                      "#FAD860",
                      "#F3A43B",
                      "#60C0DD",
                      "#D7504B",
                      "#C6E579",
                      "#F4E001",
                      "#F0805A",
                      "#26C0C0"
                    ];
                    return colorList[params.dataIndex];
                  }, //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: "top",
                    //                             formatter: '{c}'
                    formatter: "{b}\n{c}"
                  }
                }
              }, //设置柱的宽度，要是数据太少，柱子太宽不美观~
              barWidth: 70
            }
          ]
        });
      });
    });
  },
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
