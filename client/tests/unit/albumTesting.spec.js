
import { createLocalVue, shallowMount,shallow,mount  } from '@vue/test-utils'

import Vuex from 'vuex'
import Buefy from 'buefy'
import vueMoment from 'vue-moment'
import VueMq from 'vue-mq'
import VuejsDialog from 'vuejs-dialog'


import App from '@\components\TheNavbar'


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
localVue.use(vueMoment)
localVue.use(VueMq, {
    breakpoints: {
        mobile: 450,
        tablet: 900,
        laptop: 1250
    }
})
localVue.use(VuejsDialog, {
    message: 'Please confirm action'
})
localVue.config.productionTip = false

describe('rendering', async () => {
    
    const wrapper = shallowMount(App, {
        localVue
    } )
    expect(wrapper.html().contains("Search iTunes APP")).toBeTruthy()

})