<template></template>

<script setup lang="ts">

import { definePageMeta, useHead } from '#imports'
import { useAccountLayoutLoaderStore } from '~/store/loaders'
import { useRoute } from 'vue-router'

definePageMeta({ middleware: 'auth', layout: 'account-node-list' })

const route = useRoute()

useHead({ title: 'Cerber - Доступы' })

const loaderStore = useAccountLayoutLoaderStore()

// loaderStore.addPromise(
	// useSecretGroupAggregateStore().fetch({ alias: route.params.alias as string})
// )

</script>
