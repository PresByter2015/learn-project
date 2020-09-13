import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use (Vuex);

export default () => {
  let store = new Vuex.Store ({
    state: {
      name: 'zf',
      age: 10,
    },
    mutations: {
      changeName (state, data = 'jw') {
        state.name = data;
      },
      changeAge (state) {
        state.age = 100;
      },
    },
    actions: {
      changeAll({commit}) {
        axios.get ('http://localhost:5000/cats/do').then (res => {
          console.log (res.data);
          commit ('changeName', res.data.data);
        });
        return new Promise ((resolve, reject) => {
          setTimeout (() => {
            commit ('changeName');
            commit ('changeAge');
            resolve ();
          }, 1500);
        });
      },
    },
  });
  if (typeof window != 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState (window.__INITIAL_STATE__);
  }
  return store;
};
