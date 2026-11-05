<template>
	<NuxtLayout name="default">
		<div class="flex items-start gap-6">
			<div class="h-screen pl-6 py-6 sticky top-0">
				<div class="min-w-3xs h-full flex flex-col justify-between items-start">
					<UiClickable :nuxt-link="{ to: '/' }">
						<CerberLogo class="h-12" />
					</UiClickable>

					<ClientOnly>
						<UserBadge />
					</ClientOnly>
				</div>
			</div>
			<div class="w-full py-6 pr-6">
				<ClientOnly>
					<slot></slot>
				</ClientOnly>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">

import CerberLogo from '~/assets/svg/cerver-logo-with-text.svg'
import UserBadge from '~/components/account/UserBadge.vue'
import UiClickable from '~/components/ui/Clickable.vue'

</script>
