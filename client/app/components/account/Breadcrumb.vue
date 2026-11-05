<template>
	<div class="w-full flex items-center rounded-full text-gray-600 dark:text-gray-500 text-sm px-1.5">
		<UiClickable
			class="px-2 h-[26px] flex items-center hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-black dark:hover:text-gray-200 rounded-md"
			:nuxt-link="{ to: '/' }"
		>
			<HouseIcon class="w-4.5" />
		</UiClickable>

		<template v-for="(item, idx) in chain">
			<icon name="material-symbols:chevron-right-rounded" size="18px" />
			<UiClickable
				class="px-2 h-[26px] flex items-center hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-black dark:hover:text-gray-200 rounded-md"
				:nuxt-link="idx < chain.length - 1 ? item.link : void 0"
			>
				<span class="whitespace-nowrap truncate">{{ item.name }}</span>
			</UiClickable>
		</template>
	</div>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import HouseIcon from '~/assets/svg/house.fill.svg'
import UiClickable from '~/components/ui/Clickable.vue'
import { useBreadcrumbStore } from '~/store/breadcrumb'

const breadcrumbStore = useBreadcrumbStore()

const chain = computed(() => breadcrumbStore.chain)

</script>
