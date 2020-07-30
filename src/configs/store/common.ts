import { Commit } from 'vuex';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';

export default {
  namespaced: true,
  state: {
    locale: zhCN,
    localeMap: {
      zh: zhCN,
      en: enUS
    }
  },
  mutations: {
    updateLocale(state: any, locale: string) {
      state.locale = state.localeMap[locale]
    },
  },
  actions: {
    updateLocale(context: { commit: Commit }, locale: string) {
      context.commit('updateLocale', locale)
    },
  }
}