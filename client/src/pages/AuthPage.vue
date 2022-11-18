<template>
    <app-container class="auth">
        <page-title>{{ isLoginPage ? 'Вход' : 'Регистрация' }}</page-title>
        <form class="form" @submit.prevent="onSubmit">
            <app-input class="input" type="email" v-model="inputData.email" label="Почта" :error="errors.email" />
            <app-input
                class="input"
                type="password"
                v-model="inputData.password"
                label="Пароль"
                :error="errors.password" />
            <p v-if="isLoginPage" class="message">
                Нет аккаунта? <router-link to="/registration">Зарегистрироваться</router-link>
            </p>
            <p v-else class="message">Есть аккаунт? <router-link to="/login">Войти</router-link></p>
            <div class="submitWrapper">
                <p v-if="errors.global" class="error">{{ errors.global }}</p>
                <app-button class="submit" type="submit" :loading="isLoading">Войти</app-button>
            </div>
        </form>
    </app-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMutation } from 'vue-query';
import { useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import { useStore } from 'vuex';

import { login as loginApi, registrate as registrateApi } from '@/api/authApi';
import AppContainer from '@/components/ui/AppContainer.vue';
import BadRequestError from '@/models/BadRequestError';
import AppButton from '@/components/ui/AppButton.vue';
import PageTitle from '@/components/ui/PageTitle.vue';
import AppInput from '@/components/ui/AppInput.vue';

export default defineComponent({
    components: { AppContainer, AppInput, AppButton, PageTitle },
    setup() {
        const store = useStore();
        const router = useRouter();
        const isLoginPage = computed(() => router.currentRoute.value.path === '/login');

        const inputData = ref({
            email: '',
            password: '',
        });

        const errors = ref({
            email: '',
            password: '',
            global: '',
        });

        const onError = (error: AxiosError) => {
            if (error.response) {
                if (error.response.status === 400) {
                    const messages = (error.response.data as BadRequestError)?.messages;
                    messages.forEach((message) => {
                        if (message.property === 'email') errors.value.email = message.errors[0];
                        if (message.property === 'password') errors.value.password = message.errors[0];
                    });
                } else {
                    errors.value.global = (error.response.data as any)?.message ?? 'Произошла ошибка';
                }
            }
        };
        const onSuccess = (token: string) => {
            store.dispatch('auth', token);
            router.push('/');
        };

        const { mutate: login, isLoading: loginIsLoading } = useMutation(['login', inputData], loginApi, {
            onError,
            onSuccess,
        });
        const { mutate: registrate, isLoading: registrateIsLoading } = useMutation(
            ['login', inputData],
            registrateApi,
            { onError, onSuccess }
        );

        const isLoading = computed(() => loginIsLoading.value || registrateIsLoading.value);

        const onSubmit = () => {
            if (isLoginPage.value) {
                login(inputData.value);
            } else {
                registrate(inputData.value);
            }
        };

        return {
            isLoginPage,
            inputData,
            errors,
            onSubmit,
            isLoading,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '../mixins.scss';
.auth {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    background-color: var(--dark-bg-color);
}
.form {
    flex: 1 1 auto;
    margin: 0 auto;
    padding: 20px;
    max-width: 500px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
}
.input {
    margin-bottom: 20px;

    @include respValue('font-size', 24, 18);
    font-weight: 700;
}
.submitWrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
}
.error {
    text-align: right;
    color: var(--danger-color);
}
.submit {
    flex: 0 0 auto;
}
.message {
    color: var(--dark-text-color);

    a {
        color: var(--primary-color);
        text-decoration: none;

        @media (any-hover: hover) {
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
