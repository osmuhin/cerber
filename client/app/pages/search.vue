<template>
	<UiContainer class="py-7">
		<div class="flex items-start gap-6 mt-4">
			<Sidebar />
			<div class="w-full" v-if="invalidSearchQuery">
				<h2 class="text-center text-lg font-medium">Поисковый запрос не задан</h2>
			</div>
			<div class="flex items-start gap-6" v-else>
				<ContentTile class="w-full">
					<h2 class="">
						<span class="text-gray-600">Результаты поиска по запросу</span> <span class="font-medium">"{{ searchQuery }}"</span>:
					</h2>
					<div class="mt-8">
						<div>
							<SecretList />
						</div>

						<hr class="my-5 border-gray-100">

						<div>
							<GroupList />
						</div>
					</div>
				</ContentTile>
				<ContentTile class="w-full">
					<SecretView />
				</ContentTile>
			</div>
		</div>
	</UiContainer>
</template>

<script setup lang="ts">

import UiContainer from '~/components/ui/Container.vue'
import ContentTile from '~/components/ui/ContentTile.vue'
import Sidebar from '~/components/account/LeftSidebarWithGroups.vue'
import SecretView from '~/components/account/secrets/Detail.vue'
import SecretList from '~/components/account/secrets/list/SecretList.vue'
import GroupList from '~/components/account/secrets/list/GroupList.vue'
import { definePageMeta, useHead, useRoute, ref } from '#imports'

definePageMeta({ middleware: 'auth' })

const { query } = useRoute()
const searchQuery = query.text
const invalidSearchQuery = ref(!searchQuery)

useHead({
	title: invalidSearchQuery.value ? 'Поисковый запрос не задан - Cerber' : `"${searchQuery}": 2 результата - Cerber`
})

</script>
