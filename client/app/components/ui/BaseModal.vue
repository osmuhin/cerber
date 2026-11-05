<template>
	<ClientOnly>
		<teleport to="body">
			<transition
				@before-leave="emit('before-leave')"
				@after-leave="emit('after-leave')"
				@before-enter="emit('before-enter')"
				@after-enter="emit('after-enter')"
			>
				<div class="ui-modal fixed inset-0 z-30" v-if="show">
					<div class="overflow-y-auto overscroll-contain absolute inset-0 -z-20">
						<div class="min-h-full flex items-center justify-center relative -z-20 py-14 lg:py-0">
							<div class="ui-modal__darken-bg fixed inset-0 bg-black/60 dark:bg-black/70 -z-10" @click="show = false"></div>
							<div class="ui-modal__content">
								<slot></slot>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</teleport>
	</ClientOnly>
</template>

<script setup lang="ts">

const show = defineModel<boolean>({ required: true })

export type ModalEmits = {
	(e: 'before-leave'): void
	(e: 'after-leave'): void
	(e: 'before-enter'): void
	(e: 'after-enter'): void
}

const emit = defineEmits<ModalEmits>()

</script>

<style lang="scss">

.ui-modal {
	&.v-enter-active, &.v-leave-active {
		transition: opacity .3s ease;

		.ui-modal__darken-bg {
			transition: opacity .3s ease;
		}

		.ui-modal__content {
			transition: opacity .25s ease, transform .3s cubic-bezier(.23,.13,.15,1);
		}
	}

	&.v-enter-from, &.v-leave-to {
		.ui-modal__darken-bg, .ui-modal__content {
			opacity: 0;
		}
	}

	&.v-enter-from .ui-modal__content {
		transform: scale(.85);
	}
}

</style>
