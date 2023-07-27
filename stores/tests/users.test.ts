import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { $resetPiniaStores } from '../reset'

import { useUserStore } from '../users'
import type { IUser } from '~/utils/types/User'

const DEFAULT_USER: IUser = {
    id: '',
    username: '',
    full_name: '',
    email: '',
    avatar_url: '',
    updated_at: '',
    created_at: '',
}

const DEFAULT_USER_DATA: IUser = {
    id: '123456-abcdef',
    username: 'johndoe',
    full_name: 'John Doe',
    email: 'johndoe@gmail.com',
    avatar_url: 'http://example.com/avatar/john.jpg',
    updated_at: '2023-07-26:00:00:00',
    created_at: '2023-07-26:00:00:00',
}

describe('describe useMenuStore', () => {
    let store: ReturnType<typeof useUserStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useUserStore()
    })

    it('initializes an empty user object', () => {
        expect(store.user).toEqual(DEFAULT_USER)
    })

    it('should contain user information', () => {
        store.user = DEFAULT_USER_DATA
        expect(store.user).toEqual(DEFAULT_USER_DATA)
    })

    afterEach(() => {
        $resetPiniaStores()
    })
})
