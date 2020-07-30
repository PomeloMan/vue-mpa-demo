<template>
  <a-table
    size="middle"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :scroll="{ y: scrollY }"
  >
    <template
      v-for="column in columns"
      :slot="column.scopedSlots&&column.scopedSlots.customRender"
      slot-scope="val, record"
    >
      <slot :name="column.scopedSlots.customRender" v-bind="record"></slot>
    </template>
    <template slot="title">
      <slot name="header">
        <span class="title">{{title}}</span>
      </slot>
    </template>
    <template slot="footer">
      <a-pagination
        showQuickJumper
        showSizeChanger
        size="small"
        :showTotal="(total, range) => `显示第 ${range[0]} 至 ${range[1]} 项结果，共 ${total} 项`"
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        :current="pagination.current"
        @change="onPageChange"
        @showSizeChange="onPageSizeChange"
      ></a-pagination>
    </template>
  </a-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

export class PaginationModel {
  current!: number
  total!: number
  pageSize!: number
}

@Component
export default class Table extends Vue {
  @Prop() columns!: Array<object>
  @Prop() data!: Array<object>
  @Prop() title?: string
  @Prop() showFooter?: boolean
  @Prop() pagination: PaginationModel = { current: 1, total: 0, pageSize: 10 }

  private scrollY = 0

  mounted() {
    const wrapper: HTMLElement | null = document.querySelector(
      '.ant-table-wrapper'
    )
    if (wrapper) {
      const header: HTMLElement | null = wrapper.querySelector(
        '.ant-table-title'
      )
      const footer: HTMLElement | null = wrapper.querySelector(
        '.ant-table-footer'
      )
      const thead: HTMLElement | null = wrapper.querySelector(
        '.ant-table-thead'
      )
      this.scrollY =
        wrapper.clientHeight -
        (thead ? thead.clientHeight : 0) -
        (header ? header.clientHeight : 0) -
        (footer ? footer.clientHeight : 0)
    }
  }

  @Emit('onPageChange')
  onPageChange(current: number, pageSize: number) {
    this.pagination.current = current
    this.pagination.pageSize = pageSize
    this.refresh()
    return this.pagination
  }
  @Emit('onPageSizeChange')
  onPageSizeChange(current: number, pageSize: number) {
    this.pagination.current = current
    this.pagination.pageSize = pageSize
    this.refresh()
    return this.pagination
  }
  @Emit('refresh')
  refresh() {
    // eslint-disable-next-line
  }
}
</script>

<style lang="less" scoped>
@import 'ant-design-vue/lib/style/themes/default.less';

#app .ant-table-wrapper {
  background-color: @component-background;
  /deep/ .ant-table-content {
    padding: 0 10px;
    .ant-table-footer {
      padding: 10px 0;
      text-align: right;
      background-color: @component-background;
    }
  }
  /deep/ .ant-table-title {
    padding: 10px;
    > span.title {
      font-size: 15px;
      font-weight: 600;
    }
  }
}
</style>