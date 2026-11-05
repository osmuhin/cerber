import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.directive<any, any>('click-outside', {
		mounted($el, { value }) {
			$el.clickOutsideEvent = (event: MouseEvent) => {
				$el !== event.target && !$el.contains(event.target) && value(event)
			}

			document.body.addEventListener('click', $el.clickOutsideEvent, { capture: true })
		},
		beforeUnmount($el) {
			document.body.removeEventListener('click', $el.clickOutsideEvent, { capture: true })
		}
	})
})
