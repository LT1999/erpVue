<template>
  <div class="Echarts" style="width: 100%;height:100%;">
    <div style="margin: 10px 10px;">
      <el-select v-model="value" placeholder="请选择年份" size="small" style="width: 150px;" @change="myEcharts">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="main" style="width: 500px;height:400px;display: inline-block;"></div>
    <div id="kcbj" style="width: 500px;height:400px;display: inline-block;margin-left: 30px;"></div>
    <div style="margin: 10px 10px;">
      <el-select v-model="zhuvalue" placeholder="请选择年份" size="small" style="width: 150px;" @change="myEchartszhu">
        <el-option v-for="item in zhuoptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="zhu" style="width: 500px;height:400px;display: inline-block;"></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        options: [],
        value: 0,
        zhuvalue: 0,
        zhuoptions: []

      }

    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main'));
        this.$http.post("http://localhost:8080/Erp-web/report/storageOutbound.do", "year=" + this.value)
          .then(res => {
            //console.log(this.formInline.productName);
            if (res.status == 200) {
              console.log(res.data)
              var option = {
                title: {
                  text: '出入库数量',
                  textStyle: {
                    fontWeight: '400',
                    size: '20'
                  }
                },
                tooltip: {},
                legend: {
                  show: true,
                  data: [{
                    name: '入库数量'
                  }, {
                    name: '出库数量'
                  }]
                },
                dataset: {
                  // 提供一份数据。
                  source: res.data
                },
                xAxis: {
                  type: 'category',
                  name: '月份'
                },
                yAxis: {
                  name: '数量'
                },
                series: [{
                    name: '入库数量',
                    type: 'line',
                    areaStyle: {}

                  },
                  {
                    name: '出库数量',
                    type: 'line',
                    areaStyle: {}
                  }
                ]
              };

              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      myEchartskc() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('kcbj'));
        myChart.showLoading(); // 开启 loading 效果
        this.$http.post("http://localhost:8080/Erp-web/report/cellState.do")
          .then(res => {
            if (res.status == 200) {

              myChart.hideLoading(); // 隐藏 loading 效果
              myChart.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                  orient: 'vertical',
                  left: 10,
                  data: ['低于库存下限产品', '库存正常产品', '超出库存上限产品']
                },
                series: [{
                  name: '库存状态',
                  type: 'pie', // 设置图表类型为饼图
                  radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                  data: res.data
                }]
              })

            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      myEchartszhu() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('zhu'));
        this.$http.post("http://localhost:8080/Erp-web/report/productionNumber.do", "year=" + this.zhuvalue)
          .then(res => {
            //console.log(this.formInline.productName);
            if (res.status == 200) {
              /* console.log(res.data) */
              res.data.forEach(item => {
                this.$delete(item, 'outboundNumber');
                this.$delete(item, 'storageNumber');
                this.$delete(item, 'value');
              })
              var option = {
                title: {
                  text: '产品生产合格与投产数量',
                  textStyle: {
                    fontWeight: '400',
                    size: '20'
                  }
                },
                tooltip: {},
                legend: {
                  show: true,
                   right: 30,
                  data: [{
                    name: '生产合格数量'
                  }, {
                    name: '投产数量'
                  }]
                },
                dataset: {
                  // 提供一份数据。
                  source: res.data
                },
                xAxis: {
                  type: 'category',
                  name: '月份'
                },
                yAxis: {
                  name: '数量'
                },
                series: [{
                  name: '生产合格数量',
                  type: 'bar'
                }, {
                  name: '投产数量',
                  type: 'bar'
                }]
              };

              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    },
    mounted() {
      var now = new Date();
      this.value = now.getFullYear(); //得到年份
      this.options.push({
        label: this.value,
        value: this.value
      });
      this.options.push({
        label: this.value - 1,
        value: this.value - 1
      });
      this.options.push({
        label: this.value - 2,
        value: this.value - 2
      });
      this.zhuvalue = this.value;
      this.zhuoptions = this.options;

      this.myEcharts();
      this.myEchartskc();
      this.myEchartszhu();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
