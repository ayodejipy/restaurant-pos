import { mount } from '@vue/test-utils'
import TheLink, { IProps } from '~/components/atom/TheLink.vue'

const Props: Partial<IProps> = {
    url: '/home',
    size: 'lg',
    rounded: 'md',
    activeClass: 'active',
}

describe('describe the link component', () => {
    it('element should be mounted', () => {
        const wrapper = mount(TheLink)

        expect(wrapper.vm).toBeTruthy()
    })

    it('component should display props correctly', () => {
        const wrapper = mount(TheLink, {
            props: { ...Props },
        })
        console.log(wrapper.props)
        // expect(wrapper.attributes('href')).toBe(Props.url)
        // expect(wrapper.classes('rounded-lg')).toBe(true)
    })
})
