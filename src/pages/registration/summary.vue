<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <a-layout>
        <a-layout-content>
          <section class="toolbar">
            <a-range-picker :getCalendarContainer="triggerNode => triggerNode.parentNode"></a-range-picker>
          </section>
          <section class="overview-wrap">
            <a-row :gutter="16">
              <a-col :span="6" :key="item.index" v-for="item in overviews">
                <a-card :bodyStyle="{height: '100%', padding: '16px'}">
                  <div class="card-body-content">
                    <p style="display: flex;">
                      <img :src="item.image" style="margin-right: 6px;" />
                      {{item.label}}
                    </p>
                    <div class="progress-wrapper">
                      <a-tooltip>
                        <span slot="title">{{item.tooltip}}：{{item.value | formatNumber}}</span>
                        <a-progress
                          type="circle"
                          :percent="item.percent"
                          :width="90"
                          :strokeWidth="10"
                          :strokeColor="item.color"
                          style="cursor: pointer"
                        >
                          <span class="ant-progress-description" slot="format" slot-scope="percent">
                            <p style="margin-bottom:6px;">
                              <span>{{percent}}</span>%
                            </p>
                            <p>{{item.sublabel}}</p>
                          </span>
                        </a-progress>
                      </a-tooltip>
                      <div>
                        <p>{{item.total | formatNumber}}</p>
                        <p>总车数</p>
                      </div>
                    </div>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </section>
        </a-layout-content>
      </a-layout>
    </a-config-provider>
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import G2 from '@antv/g2'
import accounting from 'accounting'
export default Vue.extend({
  filters: {
    formatNumber(value, precision = 0) {
      return accounting.formatNumber(value, precision)
    },
  },
  data() {
    return {
      zhCN,
      locale: zhCN,
      overviews: [],
    }
  },
  created() {
    console.log(G2)
    this.getOverviews()
  },
  methods: {
    getOverviews() {
      this.$http
        .get('/mock/registration/summary_overviews.json')
        .then(({ data }) => {
          this.overviews = data
        })
    },
  },
})
</script>

<style lang="less" scoped>
@import 'ant-design-vue/lib/style/themes/default.less';
#app {
  height: 100%;
  background-color: @layout-body-background;
  p {
    margin: 0;
  }
  .ant-layout {
    height: inherit;
    .ant-layout-content {
      padding: 10px;
      > section:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
  .overview-wrap {
    .ant-card {
      height: 160px;
      overflow: hidden;
      .card-body-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .progress-wrapper {
      display: flex;
      align-items: center;
      .ant-progress {
        margin-right: 16px;
      }
      .ant-progress-description {
        > p:first-child > span {
          font-size: 16px;
          font-weight: bold;
          color: @text-color;
        }
        > p:last-child {
          font-size: 12px;
          color: @text-color-secondary;
        }
      }
      > div:last-child {
        > p:first-child {
          font-size: 32px;
          font-weight: bold;
          color: @text-color;
        }
        > p:last-child {
          font-size: 12px;
          color: @text-color-secondary;
        }
      }
    }
  }
}
</style>