<template>
	<NuxtLayout name="account">
		<div class="flex justify-center items-start gap-6">
			<div class="grow max-w-2xl">
				<TheSearch />


				<UiContentTile class="mt-6 py-6">
					<div class="px-6">
						<GroupList />
						<DocumentList />
					</div>
				</UiContentTile>

			</div>
			<UiContentTile class="py-6 grow max-w-md px-6">
				<DocumentFormCreate />
			</UiContentTile>
		</div>
		<slot></slot>
	</NuxtLayout>
</template>

<script setup lang="ts">

import UiContentTile from '~/components/ui/ContentTile.vue'
import GroupList from '~/components/account/nodes/groups/GroupList.vue'
import DocumentList from '~/components/account/nodes/list/DocumentList.vue'
import TheSearch from '~/components/account/Search.vue'
import DocumentFormCreate from '~/components/account/nodes/documents/form/FormCreate.vue'

</script>
