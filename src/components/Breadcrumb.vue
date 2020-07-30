<template>
  <div class="breadcrumb-wrap">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, i) in data" :key="i">
        <router-link v-if="item.url" :to="item.url"></router-link>
        <span>{{item.name}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export class BreadcrumbModel {
  name: string
  url?: string
  constructor(name: string) {
    this.name = name
  }
}
@Component
export default class Breadcrumb extends Vue {
  @Prop() private data!: Array<BreadcrumbModel>
}
</script>

<style lang="less" scoped>
@import 'ant-design-vue/lib/style/themes/default.less';

#app .breadcrumb-wrap {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: @component-background;
}
</style>