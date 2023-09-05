import { mount } from '@vue/test-utils'
import TheCard from '~/components/atom/TheCard.vue'

const IProps = {}

describe('Card Component testing', () => {
    it('component should mount correctly', async () => {
        const wrapper = mount(TheCard, {
            props: { ...IProps },
        })

        expect(wrapper.vm).toBeTruthy()
    })
})
