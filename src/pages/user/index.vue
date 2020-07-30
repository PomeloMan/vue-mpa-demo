<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <a-layout>
        <router-view></router-view>
      </a-layout>
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapState({
      // eslint-disable-next-line
      locale: (state: any) => state.common.locale,
    }),
  },
})
</script>

<style lang="less" scoped>
#app,
.ant-layout {
  height: 100%;
}
</style>