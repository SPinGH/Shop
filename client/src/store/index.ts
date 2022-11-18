import { AxiosError } from 'axios';
import { createStore } from 'vuex';

import BaseError from '@/models/BaseError';
import { getUser } from '@/api/userApi';
import User from '@/models/User';

export interface State {
    auth: {
        isLoading: boolean;
        error: BaseError | null;
        user: User | null;
    };
}

const store = createStore<State>({
    state() {
        return {
            auth: {
                isLoading: false,
                error: null,
                user: null,
            },
        };
    },
    mutations: {
        SetIsLoading(state, isLoading) {
            state.auth.isLoading = isLoading;
        },
        SetError(state, error) {
            state.auth.error = error;
        },
        SetUser(state, user) {
            state.auth.user = user;
        },
    },
    actions: {
        async auth({ commit }, token?: string) {
            if (token) localStorage.setItem('token', token);
            else token = localStorage.getItem('token') ?? undefined;

            if (!token) return;

            commit('SetIsLoading', true);
            commit('SetError', null);

            try {
                const user = await getUser();
                commit('SetUser', user);
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    commit('SetError', error.response.data);
                } else {
                    commit('SetError', {
                        message: 'Произошла ошибка',
                        statusCode: 500,
                    } as BaseError);
                }
            }
            commit('SetIsLoading', false);
        },
        logout({ commit }) {
            commit('SetUser', null);
            localStorage.removeItem('token');
        },
    },
});

export default store;
