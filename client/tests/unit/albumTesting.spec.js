
import { createLocalVue, shallowMount,shallow,mount  } from '@vue/test-utils'

import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false

import TheNavbar from '@/components/TheNavbar.vue'
import TheSearchbar from '@/components/TheSearchbar.vue'

import Buefy from 'buefy';
import store from '@/store.js';
import Vuex from 'vuex';
import vueMoment from 'vue-moment'
import VueMq from 'vue-mq'
import VuejsDialog from 'vuejs-dialog'

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(vueMoment);

/*
localVue.use(Vuex)

*/

describe('rendering', () => {
    
    const wrapper = shallowMount(TheNavbar, {
        propsData: {
            showRecentSearchBox: false,
            recentSearch: [],
            pageType: 'search',
            bookmarkAlbums: [],
            //isMobile: false,
            settings: { initialSearchQuery: 'eminem', searchQuery: '', panelType: 'card', bookmarkIcon: 'fa-star', perPage: '20', youtubeLink: 'false' }
        }
    })
    test('renders correctly', ()=> {
        expect(wrapper.props().isMobile).toBe(false)
    })
    
});

describe('searchbar', () => {
    
    const wrapper = shallowMount(TheSearchbar, {
        localVue,
        propsData: {
            recentSearch: [],
            newSearchQuery: '',
            settings: { initialSearchQuery: 'eminem', searchQuery: '', panelType: 'card', bookmarkIcon: 'fa-star', perPage: '20', youtubeLink: 'false' }
        }
    });
    console.log(wrapper.html())
    //wrapper.findAll('input').at(0).setValue('test32');


    test('renders correctly', ()=> {
        expect(wrapper.html()).toContain('eminem')
    }) 
})