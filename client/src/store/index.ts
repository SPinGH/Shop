import { createStore } from 'vuex';

interface State {
    auth: boolean | null;
}

const store = createStore<State>({
    state() {
        return {
            auth: null,
        };
    },
    mutations: {
        SetAuth(state, auth) {
            state.auth = auth;
        },
    },
    actions: {
        setAuth({ commit }, auth: boolean) {
            commit('SetAuth', auth);
        },
    },
});

export default store;
