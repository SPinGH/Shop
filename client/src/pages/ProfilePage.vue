<template>
    <app-container class="profile">
        <page-header>
            <h1>
                Личный кабинет <span class="email">({{ $store.state.auth.user?.email }})</span>
            </h1>
        </page-header>
        <div class="edit">
            <app-input class="input" v-model="address" label="Адрес доставки" outlined :disabled="updateIsLoading" />
            <app-button class="saveBtn" @click="onSaveClick" :loading="updateIsLoading" outlined>Сохранить</app-button>
            <p v-if="updateError" class="error">Произошла ошибка</p>
        </div>
        <app-loader v-if="isLoading" class="loader" />
        <div class="orders">
            <p class="title">Заказы</p>
            <ul class="list">
                <transition-group name="list">
                    <li v-for="order in orders" :key="order.id" class="item">
                        <order-item :order="order" />
                    </li>
                </transition-group>
            </ul>
        </div>

        <p v-if="orders?.length === 0">У вас нет заказов</p>
        <p v-if="error">Произошла ошибка при загрузке</p>
    </app-container>
</template>

<script lang="ts">
import { useMutation, useQuery } from 'vue-query';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import AppContainer from '@/components/ui/AppContainer.vue';
import { updateUser as updateUserApi } from '@/api/userApi';
import OrderItem from '@/components/logic/OrderItem.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { getOrders } from '@/api/orderApi';
import { State } from '@/store';

export default defineComponent({
    components: { AppContainer, PageHeader, AppLoader, OrderItem, AppInput, AppButton },
    setup() {
        const store = useStore<State>();

        const address = ref(store.state.auth.user?.address);

        const { data: orders, isLoading, error } = useQuery('orders', getOrders);

        const { mutate: updateUser, isLoading: updateIsLoading, error: updateError } = useMutation(updateUserApi);

        const onSaveClick = () => {
            if (store.state.auth.user) {
                updateUser({ id: store.state.auth.user?.id, body: { address: address.value } });
            }
        };

        return {
            address,
            orders,
            isLoading,
            error,
            onSaveClick,
            updateIsLoading,
            updateError,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.profile {
    display: flex;
    flex-direction: column;

    background-color: var(--dark-bg-color);
}
.email {
    text-transform: none;
}

.edit {
    background-color: var(--bg-color);
    @include respValue('padding', 15, 8);

    display: grid;
    align-items: flex-end;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'input btn' 'error error';
    gap: 10px;

    margin-bottom: 10px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr auto;
        grid-template-areas: 'input input' 'error btn';
    }
}
.input {
    grid-area: input;
}
.saveBtn {
    grid-area: btn;
}
.error {
    grid-area: error;
    align-self: center;
    color: var(--danger-color);
}
.orders {
    background-color: var(--bg-color);
}
.title {
    @include respValue('padding', 15, 8);

    font-size: 16px;
}

.list {
    flex: 1 1 auto;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;

    position: relative;
    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
    &-leave-active {
        position: absolute;
    }
    .item {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
}
.item {
    border-top: 1px solid var(--dark-bg-color);

    &:not(:last-child) {
        margin-bottom: 10px;
    }
}
.result {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
