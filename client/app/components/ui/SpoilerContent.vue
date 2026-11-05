<template>
	<div :id="id"></div>
</template>

<script setup lang="js">

import { onMounted, onBeforeUnmount, useId, watch, computed } from 'vue'
import { useNuxtApp } from '#imports'

const id = useId()
const { $theme } = useNuxtApp()
let pjsInstance

const color = computed(() => $theme.scheme.value === 'light' ? '#000' : '#fff')
const size = computed(() => $theme.scheme.value === 'light' ? 1 : 0.75)

const config = {
	particles: {
		number: {
			value: 400,
			density: {
				enable: false,
				value_area: 800
			}
		},
		color: { value: color.value },
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000000'
			},
			polygon: { nb_sides: 0 }
		},
		opacity: {
			anim: {
				enable: false,
				speed: 2,
				opacity_min: 0.5
			},
			value: 1,
			random: true
		},
		size: {
			value: size.value,
			random: false,
			anim: {
				enable: false,
				speed: 3,
				size_min: 0.1,
				sync: false
			}
		},
		line_linked: { enable: false },
		move: {
			enable: true,
			speed: 0.3,
			direction: 'none',
			random: true,
			straight: false,
			out_mode: 'bounce',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: 'canvas',
		events: {
			onhover: {
				enable: false,
				mode: 'repulse'
			},
			onclick: {
				enable: false,
				mode: 'push'
			},
			resize: true
		}
	},
	retina_detect: true
}

watch($theme.scheme, () => {
	pjsInstance.particles.color.value = color.value
	pjsInstance.tmp.obj.size_value = size.value

	pjsInstance.fn.particlesRefresh()
})

onMounted(() => {
	if (!('particlesJS' in window)) {
		console.error('particlesJS is not defined')
	}

	window.particlesJS(id, config)
	pjsInstance = window.pJSDom.pop().pJS
})

onBeforeUnmount(() => {
	cancelAnimationFrame(pjsInstance.fn.drawAnimFrame)
   pjsInstance.canvas.el.remove()
})

</script>
