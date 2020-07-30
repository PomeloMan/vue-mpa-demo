<template>
  <a-layout-content>
    <Breadcrumb :data="breadcrumbs"></Breadcrumb>
    <SearchForm class="search-form" :form="form" :formItems="formItems" :col="3" @submit="getData"></SearchForm>
    <Table
      class="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      title="成品列表"
      @refresh="getData"
    >
      <span slot="action" slot-scope="record">
        <a-button type="link" size="small">编辑{{record.username}}</a-button>
        <a-button type="link" size="small">删除{{record.username}}</a-button>
      </span>
      <!-- <span slot="header"></span> -->
    </Table>
  </a-layout-content>
</template>

<script lang="ts">
import Vue from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/Table.vue'
export default Vue.extend({
  components: {
    Breadcrumb,
    SearchForm,
    Table,
  },
  data() {
    return {
      breadcrumbs: [
        {
          name: '成品管理',
        },
      ],
      form: {
        name: '',
        code: '',
        store: '',
      },
      formItems: [
        {
          type: 'input',
          label: '用户名',
          key: 'username',
        },
        {
          type: 'input',
          label: '昵称',
          key: 'displayName',
        },
        {
          type: 'select',
          label: '状态',
          key: 'status',
          options: [
            { label: '初始化', value: 'Init' },
            { label: '已生效', value: 'Valid' },
          ],
        },
      ],
      data: [],
      pagination: { current: 1, total: 0, pageSize: 10 },
    }
  },
  computed: {
    columns: {
      get() {
        return [
          {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            width: 100,
          },
          {
            title: '昵称',
            dataIndex: 'displayName',
            key: 'displayName',
            align: 'center',
            width: 120,
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            width: 150,
          },
          {
            title: '状态',
            key: 'statusDesc',
            dataIndex: 'statusDesc',
            align: 'center',
            width: 100,
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 180,
            scopedSlots: { customRender: 'action' },
          },
        ]
      },
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log(this.form, this.pagination)
      this.$http
        .get('/mock/user/list.json', {
          params: {
            ...this.form,
            ...this.pagination,
          },
        })
        .then(({ data }) => {
          this.data = data.content
          this.pagination = {
            current: data.number + 1,
            pageSize: data.size,
            total: data.totalElements,
          }
        })
    },
  },
})
</script>

<style lang="less" scoped>
#app .ant-layout-content {
  height: inherit;
  > * {
    margin-bottom: 10px;
  }
  > .search-form,
  > .table {
    margin-left: 10px;
    margin-right: 10px;
  }
  > .table {
    height: calc(100% - 170px);
  }
}
</style>