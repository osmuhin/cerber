<template>
	<div class="py-7">
		<div>
			<h1 class="font-bold text-gray-700 text-2.5xl">Настройки</h1>
		</div>
		<div class="flex gap-6 mt-5">
			<div class="w-80 h-[400px] dark:bg-[#111]/60 bg-[#ebebeb]/50 backdrop-blur-xl rounded-2xl">
				<ul class="p-4">
					<Clickable class="menu-item w-full">
						<icon class="mr-2.5 -ml-0.5" size="20px" name="material-symbols:shield-rounded" />
						<span>Безопасность</span>
					</Clickable>
					<Clickable class="menu-item w-full">
						<icon class="mr-2.5 -ml-0.5" size="20px" name="material-symbols:shield-rounded" />
						<span>Безопасность</span>
					</Clickable>
					<Clickable class="menu-item w-full">
						<icon class="mr-2.5 -ml-0.5" size="20px" name="material-symbols:shield-rounded" />
						<span>Безопасность</span>
					</Clickable>
				</ul>
			</div>
			<div class="flex-1 h-[600px] dark:bg-[#111]/60 bg-[#ebebeb]/50 backdrop-blur-xl rounded-2xl">

			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { definePageMeta } from '#imports'
import Clickable from '~/components/ui/Clickable.vue'

definePageMeta({ middleware: 'auth', layout: 'account' })

</script>

<style lang="scss" scoped>

@use "sass:color";

.menu-item {
	@apply dark:text-gray-300 text-gray-600 flex w-full h-9 rounded-md items-center px-4;

	.chevron-right {
		transition: transform .15s ease;
	}

	&:hover {
		background-color: #e7e7e7;
	}
}

html.dark {
	.menu-item {
		&:hover {
			background-color: color.scale(#fff, $lightness: -85%);
		}
	}
}

</style>
