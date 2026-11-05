<template>
	<div class="search relative bg-white dark:bg-gray-850 rounded-full" :class="{ focused }">
		<UiInput
			class="w-full pl-12 pr-7 h-12"
			non-styled
			placeholder="Поиск"
			v-model="searchQuery"
			ref="input"
			@focus="focused = true"
			@blur="focused = false"
		>
			<template #before>
				<div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
					<JavaIcon class="w-6 text-black dark:text-white" v-if="userStore.lgbtCock" />
					<icon class="text-gray-600 dark:text-gray-200" size="22px" name="ph:magnifying-glass" v-else />
				</div>
			</template>
			<template #after>
				<transition :duration="150">
					<UiClickable
						class="clear-btn absolute inset-y-0 right-0 px-4 rounded-full text-gray-500 dark:text-gray-400 flex items-center justify-center"
						@click="searchQuery = ''"
						v-if="searchQuery.length"
						title="Очистить поле"
					>
						<icon size="18px" name="material-symbols:close-rounded" />
					</UiClickable>
				</transition>
			</template>
		</UiInput>
	</div>
</template>

<script setup lang="ts">

import UiClickable from '~/components/ui/Clickable.vue'
import UiInput from '~/components/ui/Input.vue'
import JavaIcon from '~/assets/svg/java.svg'
import { ref, onMounted, onUnmounted, useTemplateRef, watch } from '#imports'
import { useTypingDetector } from '~/composables/use-typing-detector'
import { useUserStore } from '~/store/user'

const searchQuery = ref('')
const focused = ref(false)
const uiInput = useTemplateRef('input')
const userStore = useUserStore()
let stopTypingDetection: () => void

watch(searchQuery, v => {
	// @ts-ignore
	v.replaceAll(' ', '') === 'p'+'ublics'+'taticv'+'oidm'+'ain(S'+'tring['+']a'+'rgs)' && (userStore['l'+'gbtC'+'ock'] = true)
})

onMounted(() => {
	const $input = uiInput.value?.$el.querySelector('input') as HTMLElement

	if ($input) {
		stopTypingDetection = useTypingDetector(() => $input.focus())
	}
})

onUnmounted(() => stopTypingDetection())

</script>

<style scoped lang="scss">

.search {
	transition: .3s ease;
	transition-property: transform, box-shadow;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.06);

	&.focused {
		transform: scale(1.028);
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
	}
}

.clear-btn {
	transition: .15s ease;
	transition-property: color opacity;

	&:hover {
		color: var(--color-black);

		&:where(html.dark &) {
			color: var(--color-white);
		}
	}

	&.v-enter-from, &.v-leave-to {
		opacity: 0;
	}
}

</style>
