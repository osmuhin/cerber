import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../repositories/adapters/user-adapter'
import { fetchUser } from '../repositories/user'

export const useUserStore = defineStore('user', () => {
	const user = ref<User>()
	const lgbtCock = ref(false)

	const fetch = async () => {
		user.value = await fetchUser()
	}

	return {
		lgbtCock,
		user: computed(() => user.value),
		fetch
	}
})
