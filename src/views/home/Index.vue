<template>
  <div class="home-container">
    <el-row :gutter="30">
      <el-col :xs=24 :lg="18">
        <el-tabs v-model="activeName" @tab-click="tagClick">
          <el-tab-pane label="今天" name="tody"/>
          <el-tab-pane label="昨天" name="yesterday"/>
          <el-tab-pane label="近7" name="lastWeek"/>
          <el-tab-pane label="本月" name="thisMonth"/>
          <el-tab-pane>
            <span slot="label">
              日期范围选择：
              <date-picker
                :value="beginDate"
                @change="date => beginDate = date"
                placeholder="开始时间"/>
              <span>-</span>
              <date-picker
                type="date"
                :value="endDate"
                @change="date => endDate = date"
                placeholder="结束时间"/>
              <el-button type="primary" style="position:relative; bottom: 1px" @click="submit">确定</el-button>
            </span>
          </el-tab-pane>
        </el-tabs>

        <div class="content-container">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card shadow="hover">
                <p class="title">销售额</p>
                <p class="value">￥914.51</p>
              </el-card>
            </el-col>

            <el-col :span="12">
              <el-card shadow="hover">
                <p class="title">销售笔数</p>
                <p class="value">11</p>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-card shadow="hover">
                <p class="title">销售毛利</p>
                <p class="value">￥-1,714.91</p>
              </el-card>
            </el-col>

            <el-col :span="12">
              <el-card shadow="hover">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <p class="title">退货笔数</p>
                    <p class="value">2</p>
                  </el-col>

                  <el-col :span="12">
                    <p class="title">退货金额</p>
                    <p class="value">￥78.00</p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-card shadow="hover" class="chart-container">
                <div ref="chart" style="width: 850px; height: 410px; margin: 0 auto"></div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :xs=24 :lg="6">
        <el-card class="cash-container" shadow="hover">
          <p class="title">本店库存金额：</p>
          <p class="value">￥14,148,053.00</p>
        </el-card>

        <el-card class="notify-container" shadow="hover">
          <div slot="header" class="notify-header">
            <span>系统信息</span>
            <el-button style="font-size: 14px; float:right" type="text">更多</el-button>
          </div>
          <div class="notify-content">
            <div class="notify-item" v-for="i in 6" :key="i">
              <el-button type="text">2018年06月25日升级通知</el-button>
              <p class="datetime">2018-06-26 10:30</p>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover" class="situation-container">
          <el-tabs v-model="situation">
            <el-tab-pane label="畅销商品" name="best">
              <div class="shop-item single-line-ellipsis" v-for="i in 9" :key="i">
                <i class="row-index">{{ i }}</i>
                <el-button type="text">得力3464记账凭证(小)(白色)(本)</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="滞销商品" name="bad">
              <div class="no-data">没有数据</div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import DatePicker from '@/components/DatePicker'

export default {
  name: 'Home',

  components: {
    DatePicker
  },

  data () {
    return {
      activeName: 'tody',
      beginDate: '',
      endDate: '',
      situation: 'best'
    }
  },

  created () {
  },

  mounted () {
    this.initChart()
  },

  methods: {
    tagClick () {
      console.log('ddd')
    },

    dateChange (begin, end) {
      this.beginDate = begin
      this.endDate = end
    },

    submit () {
      if (!this.beginDate || !this.endDate) {
        this.$message({ message: '请选择时间', type: 'warning' })
      }
    },

    initChart () {
      const chart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: '入帐总额258.51',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          data: [ '直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎' ],
          left: 'left',
          orient: 'vertical'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: [ '50%', '60%' ],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
  .home-container {
    .el-tabs__item {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-button--text {
      padding: 3px 0;
    }
    .el-card {
      margin-top: 15px;
    }
    .title {
      color: #7c8389;
      font-size: 16px;
    }
    .value {
      font-weight: 700;
      margin-top: 10px;
      font-size: 22px;
    }
    .cash-container {
      .el-card__body {
        padding: 10px 20px;
      }
      .title {
        font-size: 14px;
      }
      .value {
        margin-top: 5px;
      }
    }
    .notify-container {
      .notify-header {
        font-size: 14px;
      }
      .notify-content {
        height: 230px;
        width: 100%;
        overflow-y: auto;
        .notify-item {
          padding: 0 20px;
          .datetime {
            font-size: 12px;
          }
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
      .el-card__header {
        padding: 10px 20px;
      }
      .el-card__body {
        padding: 10px 0;
      }
    }
    .situation-container {
      font-size: 12px;
      .el-tabs__item {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .el-tabs__header {
        margin-bottom: 10px;
        padding: 5px 20px;
      }
      .el-card__body {
        padding: 0;
      }
      .el-tabs__content {
        margin-bottom: 15px;
        height: 239px;
        overflow-y: auto;
      }
      .shop-item {
        padding: 0 20px;
        .row-index {
          font-style: normal;
          background-color: #71CF3B;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          color: #FFF;
          display: inline-block;
          margin-right: 15px;
        }
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
    .chart-container {
      height: 429px;

      .el-card__body {
        padding: 20px 0;
      }
    }
    .no-data {
      color: #CCC;
      padding: 0 20px;
    }
  }
</style>
