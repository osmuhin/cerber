<template>
	<div class="ui-content-tile" :style="{ 'border-radius': `${borderRadius}px` }">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{ borderRadius?: number }>(), {
	borderRadius: 20
})

</script>

<style>

@layer components {
	.ui-content-tile {
		position: relative;
		background-color: #fff;
		box-shadow: 0 4px 30px 0 color-mix(in oklab, #000 4%, transparent);
		z-index: 0;

		&:where(html.dark &) {
			background-color: var(--color-dark-tile);
			box-shadow: none;
		}
	}
}


</style>
