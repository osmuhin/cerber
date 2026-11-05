<template>
	<div class="relative" v-if="user">
		<UiClickable
			class="pr-2 h-12 flex items-center"
			:class="{ 'menu-is-shown': showMenu }"
			@click="showMenu = !showMenu"
		>
			<div>
				<LgbtCock class="w-12" v-if="isLgbtCock" />
				<img class="h-10 rounded-full" src="/images/avatar.jpg" alt="Avatar" v-else-if="false">
				<div v-else>
					<div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-850">
						<span class="uppercase font-medium text-xl text-gray-800 dark:text-gray-200">{{ firstLetter }}</span>
					</div>
				</div>
			</div>
			<div class="ml-3">
				<div class="text-black/85 dark:text-white/85">
					<span>{{ user.firstName }}&nbsp;</span>
					<span>{{ user.lastName }}</span>
				</div>
			</div>
		</UiClickable>

		<transition>
			<div class="menu-wrapper absolute left-0 bottom-full pb-4 z-10" v-click-outside="() => showMenu = false" v-show="showMenu">
				<div class="menu bg-white dark:bg-dark-tile rounded-xl w-64 relative p-2.5 z-50" ref="$menu">
					<div>
						<UiClickable class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 dark:text-gray-300 text-gray-800 flex w-full h-9 rounded-md items-center px-4" @click="themeSubmenu = !themeSubmenu">
							<MoonIcon class="mr-3 h-4 w-4" v-if="theme.scheme" />
							<SunIcon class="mr-3 h-4 w-4" v-else />
							<span>Оформление</span>
							<icon
								class="ml-auto -mr-2 chevron-right"
								:style="{ transform: themeSubmenu ? 'rotate(90deg)': '' }"
								name="material-symbols:chevron-right-rounded"
								size="18px"
							/>
						</UiClickable>
						<HeightAnimation>
							<transition>
								<div class="submenu mt-3" v-if="themeSubmenu">
									<UiClickable class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 dark:text-gray-300 text-gray-800 flex w-full h-9 rounded-md items-center px-4" @click="theme.setMode('light')">
										<div class="absolute left-1.5 rounded-full w-1 h-1 dark:bg-gray-300 bg-gray-600" v-if="theme.mode.value === 'light'"></div>
										<SunIcon class="mr-3 h-4 w-4" />
										<span>Светлое</span>
									</UiClickable>
									<UiClickable class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 dark:text-gray-300 text-gray-800 flex w-full h-9 rounded-md items-center px-4 relative" @click="theme.setMode('dark')">
										<div class="absolute left-1.5 rounded-full w-1 h-1 dark:bg-gray-300 bg-gray-600" v-if="theme.mode.value === 'dark'"></div>
										<MoonIcon class="mr-3 h-4 w-4" />
										<span>Темное</span>
									</UiClickable>
									<UiClickable class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 dark:text-gray-300 text-gray-800 flex w-full h-9 rounded-md items-center px-4" @click="theme.setMode('system')">
										<div class="absolute left-1.5 rounded-full w-1 h-1 dark:bg-gray-300 bg-gray-600" v-if="theme.mode.value === 'system'"></div>
										<ComputerIcon class="mr-3 h-4 w-4" />
										<span>Как в системе</span>
									</UiClickable>
								</div>
							</transition>
						</HeightAnimation>
					</div>

					<div class="mt-3">
						<UiClickable
							class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 dark:text-gray-300 text-gray-800 flex w-full h-9 rounded-md items-center px-4"
							:nuxt-link="{ to: { name: 'settings' } }"
						>
							<GearIcon class="gear-icon mr-3 h-4 w-4" />
							<span>Настройки</span>
						</UiClickable>
					</div>
					<div>
						<UiClickable class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 dark:text-gray-300 text-gray-800 flex w-full h-9 rounded-md items-center px-4">
							<icon class="mr-2.5 -ml-0.5" size="20px" name="material-symbols:shield-rounded" />
							<span>Безопасность</span>
						</UiClickable>
					</div>

					<div class="mt-3">
						<UiClickable class="menu-item hover:bg-gray-50 dark:hover:bg-gray-850 text-[#bf4c44] flex w-full h-9 rounded-md items-center px-4" @click="logout">
							<DoorIcon class="mr-3 h-4 w-4" />
							<span>Выйти</span>
						</UiClickable>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">

import UiClickable from '~/components/ui/Clickable.vue'
import GearIcon from '~/assets/svg/Monochrome=gearshape.fill.svg'
import DoorIcon from '~/assets/svg/Monochrome=door.left.hand.open.svg'
import SunIcon from '~/assets/svg/Monochrome=sun.max.fill.svg'
import MoonIcon from '~/assets/svg/Monochrome=moon.stars.fill.svg'
import LgbtCock from '~/assets/svg/lgbt-cock.svg'
import ComputerIcon from '~/assets/svg/Monochrome=desktopcomputer.svg'
import HeightAnimation from '~/components/ui/HeightAnimation.vue'
import { ref, watch, useNuxtApp, useRouter, computed } from '#imports'
import { useAuth } from '~/composables/use-auth'
import { useUserStore } from '~/store/user'
import { useAccountLayoutLoaderStore } from '~/store/loaders'

const userStore = useUserStore()
const { addPromise: addPromiseToLoader } = useAccountLayoutLoaderStore()

const isLgbtCock = computed(() => userStore.lgbtCock)

const showMenu = ref(false)
const themeSubmenu = ref(false)
const $menu = ref<HTMLElement>()
const user = computed(() => userStore.user)

const theme = useNuxtApp().$theme

const logout = () => useAuth('default').logout()

addPromiseToLoader(userStore.fetch())

watch(showMenu, () => themeSubmenu.value = false)

useRouter().beforeEach(() => {
	showMenu.value = false
})

const firstLetter = computed(() => user.value?.firstName.slice(0, 1).toUpperCase())

</script>

<style scoped>

.menu-wrapper {
	&.v-enter-active, &.v-leave-active {
		transition: opacity .15s ease, transform .15s ease;
	}

	&.v-enter-from, &.v-leave-to {
		opacity: 0;
		transform: scale(.95) translateY(7px);
	}
}

.menu {
	box-shadow: 0 0 20px 0 color-mix(in oklab, #000 8%, transparent);
}

.menu-item {
	.gear-icon {
		animation: topBarMenuGearSpinning 7s linear infinite;
	}

	.chevron-right {
		transition: transform .15s ease;
	}
}

.submenu {
	&.v-leave-active {
		transition: opacity .15s ease;
	}

	&.v-enter-active {
		transition: opacity .25s ease .15s;
	}

	&.v-enter-from, &.v-leave-to {
		opacity: 0;
	}
}

@keyframes topBarMenuGearSpinning {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(-360deg);
	}
}

</style>
