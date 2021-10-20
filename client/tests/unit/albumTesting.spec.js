import { mount } from '@vue/test-utils'
import App from '@/components/App.vue'

describe('rendering', () => {
    const wrapper = mount(App)
    expect(wrapper.html().contains("Search iTunes APP")).toBeTruthy()

})