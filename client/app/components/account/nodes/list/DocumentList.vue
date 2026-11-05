<template>
	<AbstractList class="mt-4" name="Доступы" :showOnInit="true" add-item-title="Создать новый доступ">
		<!-- <ul class="-mx-4">
			<li v-for="document in documents">
				<DocumentItem :document="document" :icon="['letter', 'FTP']" />
			</li>
		</ul> -->
		<!-- <div v-if="!documents.length"> -->
		<div>
			<p class="text-center text-gray-400 text-sm">Доступы отсутствуют</p>
		</div>
	</AbstractList>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import AbstractList from '~/components/account/nodes/AbstractList.vue'
import DocumentItem from '~/components/account/nodes/list/SecretItem.vue'
import { useNodesStore } from '~/store/nodes'

const store = useNodesStore()

// const documents = computed(() => store.documents)

</script>
