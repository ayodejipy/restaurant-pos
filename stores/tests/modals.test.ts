import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useModalStore } from '../modals'
import { $resetPiniaStores } from '../reset'

describe('describe useMenuStore', () => {
    let store: ReturnType<typeof useModalStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useModalStore()
    })

    it('initializes a null modal type', () => {
        expect(store.modalType).toEqual(null)
    })

    it('initializes a null modal type', () => {
        store.modalType = 'add-menu'
        expect(store.modalType).toEqual('add-menu')
    })

    afterEach(() => {
        $resetPiniaStores()
    })
})
