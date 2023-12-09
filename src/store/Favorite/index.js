import axios from 'axios';

const state = {
  favorites: null
};
const mutations = {
  GET_FAVORITES: function (state, payload) {
    state.favorites = payload.data;
  }
};

const actions = {
  async addFavorite({ commit }, obj) {
    const response = await axios.post(`${process.env.VUE_APP_API_ROOT}/favorite`, { ...obj.data },
      { headers: { 'x-access-token': obj.token } })

    commit('GET_FAVORITES', response.data);
  },

  async getFavorite({ commit }, obj) {
    const response = await axios.get(`${process.env.VUE_APP_API_ROOT}/favorite/${obj.id}`,
      { headers: { 'x-access-token': obj.token } })
    commit('GET_FAVORITES', response.data);
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}