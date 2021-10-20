import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import vueMoment from 'vue-moment'
import VueMq from 'vue-mq'
import VuejsDialog from 'vuejs-dialog'

Vue.use(Buefy)
Vue.use(vueMoment)
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250
  }
})
Vue.use(VuejsDialog, {
  message: 'Please confirm action'
})
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
