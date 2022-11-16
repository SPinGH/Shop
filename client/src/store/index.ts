import { createStore } from 'vuex';

import User from '@/models/User';

export interface State {
    auth: {
        user: User | null;
    };
}

const store = createStore<State>({
    state() {
        return {
            auth: { user: null },
        };
    },
    mutations: {
        SetUser(state, user) {
            state.auth.user = user;
        },
    },
});

export default store;
