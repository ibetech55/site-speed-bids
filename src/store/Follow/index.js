import axios from "axios";

const state = {
  follows: null,
  showMyFollows: null,
};

const mutations = {
  GET_FOLLOWS: function(state, payload) {
    state.follows = payload.data;
  },

  SHOW_MY_FOLLOWS: function(state, payload) {
    state.showMyFollows = payload.data;
  },
};

const actions = {
  async addFollow({ commit }, obj) {
    const response = await axios.post(
      `${process.env.VUE_APP_API_ROOT}/follow`,
      { userId: obj.userId, followId: obj.id },
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_FOLLOWS", response.data);
  },

  async getFollows({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/follow/${obj.id}`,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_FOLLOWS", response.data);
  },

  async showFollows({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/follow/show-follows/${obj.id}`,
      {
        headers: { "x-access-token": obj.token },
        params: { filter: obj.filter },
      }
    );
    commit("SHOW_MY_FOLLOWS", response.data);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
