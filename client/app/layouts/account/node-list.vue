<template>
	<NuxtLayout name="account">
		<div class="flex justify-center items-start gap-6">
			<div class="grow max-w-2xl">
				<TheSearch />

				<UiContentTile class="mt-6 pb-6">
					<div class="px-2.5 pt-4">
						<TheBreadcrumb />
					</div>
					<div class="px-6 mt-4">
						<h1 class="font-medium text-xl">Реклама и маркетинг</h1>

						<hr class="w-full border-gray-100 dark:border-gray-850 mt-6 mb-6">

						<GroupList />
						<DocumentList />
					</div>
				</UiContentTile>
			</div>
			<UiContentTile class="py-6 grow max-w-md px-6">
				<SecretFormCreate />
			</UiContentTile>
		</div>
		<slot></slot>
	</NuxtLayout>
</template>

<script setup lang="ts">

import UiContentTile from '~/components/ui/ContentTile.vue'
import TheBreadcrumb from '~/components/account/Breadcrumb.vue'
import GroupList from '~/components/account/nodes/groups/GroupList.vue'
import DocumentList from '~/components/account/nodes/list/DocumentList.vue'
import TheSearch from '~/components/account/Search.vue'
import SecretFormCreate from '~/components/account/nodes/documents/form/FormCreate.vue'

</script>
