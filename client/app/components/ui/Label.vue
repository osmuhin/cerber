<template>
	<label class="ui-label">
		<slot></slot>
	</label>
</template>

<style lang="scss">

@layer components {
	.ui-label {
		-webkit-tap-highlight-color: rgba(#000, 0);
		color: rgba(#000, .65);
		display: block;
		font-size: .875rem;
	}

	html.dark .ui-label {
		color: rgba(#fff, .65);
	}
}

</style>
