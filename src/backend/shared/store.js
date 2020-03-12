import Vue from 'vue'
import Vuex from 'vuex'

import Lang from 'lang.js'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        routes: [],
        settings: {},
        nav: [],
        abilities: {},
        trans: null
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = Object.assign({}, routes);
        },
        setSettings(state, settings) {
            state.settings = Object.assign({}, settings);
        },
        setNav(state, nav) {
            state.nav = Object.assign([], nav);
        },
        setAbilities(state, abilities) {
            state.abilities = Object.assign({}, abilities);
        },
        setTranslations(state, language) {
            state.trans = new Lang({
                messages: language.trans,
                locale: language.locale || 'en',
                fallback: language.fallback_locale || 'en'
            });
        }
    },
    actions: {}
});

