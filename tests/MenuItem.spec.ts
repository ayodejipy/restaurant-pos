import { mount } from '@vue/test-utils'
import MenuItems from '~/components/restaurant/MenuItem.vue'
import AtomTheButton from '~/components/atom/TheButton.vue'

const IProps = {}

describe('Menu Item Component testing', () => {
    it('component should mount correctly', async () => {
        const wrapper = mount(MenuItems)

        expect(wrapper.vm).toBeTruthy()
    })
})
