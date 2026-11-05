import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Состояние главного экрана.
 * Плитка поиска, основная плитка списка групп и доступов, плитка просмотра, создания и редактирования доступов
 */
export const useMainScreen = defineStore('main-screen', () => {
	// Режим отображения главного экрана
	// group - стандартный список групп и доступов
	// search - работа в режиме поиска
	const mode = ref<'search' | 'groups'>('groups')


})
