<template>
	<div class="p-6 h-full relative">
		<CerberLogo class="w-28" />

		<div class="absolute min-h-screen inset-0 overflow-hidden pointer-events-none -z-10 opacity-[.1]">
			<img class="absolute right-1/2 top-0 w-[4290px] max-w-none -translate-y-[1590px] translate-x-[2386px]" src="/images/blurs.png">
		</div>

		<div class="pt-11 pb-20 mt-28">
			<div class="tile max-w-sm dark:bg-gray-900/50 bg-white/50 backdrop-blur-xl rounded-[20px] mx-auto py-7">
				<div class="text-center">
					<h1 class="text-2xl font-medium">Войти</h1>
				</div>
				<form class="px-8 mt-10 space-y-6" @submit.prevent="sendForm" autocomplete="off">
					<UiInput :validation-field="useField('login')" label="Логин" />
					<UiInput type="password" :validation-field="useField('password')" label="Пароль" />

					<div>
						<TheAlert
							class="mb-8 text-sm"
							:show="serverError === 'auth_credentials_error'"
							appearance="error"
						>Неверный логин или пароль</TheAlert>

						<div class="flex justify-center">
							<UiClickable class="w-[54px] h-[54px] flex justify-center items-center rounded-full bg-black dark:bg-white dark:text-black text-white relative" type="submit">
								<icon :style="{ opacity: +!pending }" name="material-symbols:arrow-forward-rounded" size="28px" />
								<div class="absolute inset-0 flex items-center justify-center" v-if="pending">
									<UiSpinner size="28px" />
								</div>
							</UiClickable>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import CerberLogo from '~/assets/svg/cerver-logo-with-text.svg'
import UiInput from '~/components/ui/Input.vue'
import UiClickable from '~/components/ui/Clickable.vue'
import TheAlert from '~/components/ui/Alert.vue'
import UiSpinner from '~/components/ui/Spinner.vue'
import { useValidation } from '~/composables/use-validation'
import { ref, useAuth, useHead, useRouter } from '#imports'
import { object, string } from 'yup'

useHead({ title: 'Cerber - Авторизация' })

const pending = ref(false)
const serverError = ref<string|null>()

const router = useRouter()

const { useField, validate, touchAll } = useValidation().defineRules(object({
	login: string().required('Введите логин').default('admin'),
	password: string().required('Введите пароль').default('123123')
}))

const sendForm = async () => {
	const form = await validate()
	touchAll()

	if (!form) {
		return
	}

	pending.value = true

	try {
		await useAuth('default').signIn(form.login, form.password)
		serverError.value = null

		// window.location.reload()

		await router.replace({ force: true })
	} catch (error: any) {
		if (error.data && 'error_reason' in error.data) {
			serverError.value = error.data.error_reason
		}
	}

	pending.value = false
}

</script>

<style scoped>

.tile {
	box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);
}

</style>
