
import { createLocalVue, shallowMount,shallow,mount  } from '@vue/test-utils'

import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false

import TheNavbar from '@/components/TheNavbar.vue'
import TheSearchbar from '@/components/TheSearchbar.vue'
import AlbumList from '@/components/AlbumList.vue'
import App from '@/App.vue'


import Buefy from 'buefy';
import store from '@/store.js';
import Vuex from 'vuex';
import vueMoment from 'vue-moment'

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(vueMoment);


localVue.use(Vuex)



describe('rendering', () => {
    
    const wrapperNavBar = mount(TheNavbar, {
        propsData: {
            showRecentSearchBox: false,
            recentSearch: [],
            pageType: 'search',
            bookmarkAlbums: [],
            //isMobile: false,
            settings: { initialSearchQuery: 'eminem', searchQuery: '', panelType: 'card', bookmarkIcon: 'fa-star', perPage: '20', youtubeLink: 'false' }
        }
    });

    const wrapperSearch = shallowMount(TheSearchbar, {
        localVue,
        propsData: {
            recentSearch: [],
            newSearchQuery: '',
            settings: { initialSearchQuery: 'eminem', searchQuery: '', panelType: 'card', bookmarkIcon: 'fa-star', perPage: '20', youtubeLink: 'false' }
        }
    });
    test('renders NavBar correctly1', ()=> {
        expect(wrapperNavBar.props().isMobile).toBe(false)
        expect(wrapperNavBar.html()).toContain('Search iTunes APP')
    });
    test('renders search correctly1', ()=> {
        expect(wrapperSearch.html()).toContain('eminem')
    });



    
});

describe('app', () => {
    
    const wrapper = shallowMount(App, {
        localVue,
        store,
    });

    test('store loads', ()=> {
        expect(wrapper.isVueInstance()).toStrictEqual(true);
    });


    test('store loads correct values', ()=> {
        expect(wrapper.vm.isAlbumLoading).toBeFalsy()
        expect(wrapper.vm.isAlbumTracksLoading).toBeFalsy()
        
    });

})