import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import ui from './modules/ui'
import currentUser from './modules/current_user'
import info from './modules/info'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    ui,
    currentUser,
    info
  },
  strict: debug
})
