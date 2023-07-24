import { setActivePinia, createPinia } from 'pinia'
import { useMenuStore } from './menus'

beforeAll(() => {
	setActivePinia(createPinia())
})

describe('describe useMenuStore', () => {
	beforeEach(() => {
		// creates a fresh pinia and make it active so it's automatically picked
		// up by any useStore() call without having to pass it to it:
		// `useStore(pinia)`
		setActivePinia(createPinia())
	})
	
	it('creates a store', () => {
		const store = useMenuStore()
		expect(store).toBeDefined();
	})
})