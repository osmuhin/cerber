<template>
	<div
		class="ui-switch rounded-full w-10 h-6 bg-gray-200 dark:bg-gray-700 flex items-center p-0.5 cursor-pointer"
		:class="[ isOn ? 'on' : 'off' ]"
		@click="isOn = !isOn"
	>
		<div class="handle w-5 h-5 bg-white rounded-full"></div>
	</div>
</template>

<script setup lang="ts">

const isOn = defineModel<boolean>()

</script>

<style>

.ui-switch {
	transition: background-color .2s ease, box-shadow .2s ease;

	.handle {
		animation: .2s cubic-bezier(.4,0,.2,1) forwards;
		transition: .2s ease;
		transition-property: margin-left, width;
	}

	&:active .handle {
		width: 23px;
	}

	&.on {
		background-color: #000;

		.handle {
			animation-name: switch-on;
		}

		&:active .handle {
			margin-left: -3px;
		}
	}

	&.off {
		.handle {
			animation-name: switch-off;
		}
	}
}

html.dark {
	.ui-switch.on {
		background-color: var(--color-green-500);
	}
}

@keyframes switch-on {
	from {
		transform: translateX(0);
	}

	to {
		transform: translateX(16px);
	}
}

@keyframes switch-off {
	from {
		transform: translateX(16px);
	}

	to {
		transform: translateX(0);
	}
}

</style>
