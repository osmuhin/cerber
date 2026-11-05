<template></template>

<script setup lang="ts">

import { definePageMeta, useHead } from '#imports'
import { useAccountLayoutLoaderStore } from '~/store/loaders'
import { useBreadcrumbStore } from '~/store/breadcrumb'
import { useNodesStore } from '~/store/nodes'

definePageMeta({ middleware: 'auth', layout: 'account-home' })

useHead({ title: 'Cerber - Доступы' })

const loaderStore = useAccountLayoutLoaderStore()
const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.clearChain()

loaderStore.addPromise(
	useNodesStore().fetchRootNodes()
)

</script>
