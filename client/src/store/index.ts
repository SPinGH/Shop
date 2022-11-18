import { createStore } from 'vuex';

import Category from '@/models/Category';
import User from '@/models/User';

export interface State {
    auth: {
        user: User | null;
    };
    categories: Category[] | null;
}

const store = createStore<State>({
    state() {
        return {
            auth: { user: null },
            categories: null,
        };
    },
    mutations: {
        SetUser(state, user) {
            state.auth.user = user;
        },
        SetCategories(state, categories) {
            state.categories = categories;
        },
    },
    actions: {
        logout({ commit }) {
            commit('SetUser', null);
            localStorage.removeItem('token');
        },
    },
});

export default store;
