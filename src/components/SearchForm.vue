<template>
  <a-form-model layout="inline" :model="form" @submit="submit" @submit.native.prevent>
    <a-row>
      <a-col :span="24/(col?col:4)" :key="item.key" v-for="item in formItems">
        <a-form-model-item :label="item.label">
          <template v-if="item.type === 'input'">
            <a-input v-model="form[item.key]" :placeholder="item.label"></a-input>
          </template>
          <template v-if="item.type === 'select'">
            <a-select v-model="form[item.key]" :placeholder="item.label">
              <a-select-option
                :key="option.key || option.value"
                :value="option.value"
                v-for="option in item.options"
              >{{option.label}}</a-select-option>
            </a-select>
          </template>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row style="text-align: right;">
      <a-form-model-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-model-item>
    </a-row>
  </a-form-model>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

export class FormItemOption {
  key?: string
  label!: string
  value!: string
}
export class FormItem {
  type!: 'input' | 'select'
  label!: string
  key!: string
  options?: Array<FormItemOption>
}

@Component
export default class SearchForm extends Vue {
  @Prop() private col?: number // 列数
  @Prop() private form!: object // 表单对象
  @Prop() private formItems!: Array<FormItem> // 表单项

  @Emit('submit')
  submit() {
    return this.form
  }
}
</script>

<style lang="less" scoped>
@import 'ant-design-vue/lib/style/themes/default.less';

#app .ant-form {
  margin: 10px;
  padding: 10px;
  background-color: @component-background;
  .ant-form-item {
    display: flex;
  }
  /deep/ .ant-form-item-control-wrapper {
    flex: 1;
  }
}
</style>