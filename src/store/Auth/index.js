import axios from "axios";

const state = {
  token: {},
  auth: {},
  recoverPass: {}
};
const mutations = {
  authData: (state, resp) => {
    state.token = resp.user.token;
    state.auth = resp;
  },

  RECOVER_PASSWORD: (state, resp) => {
    state.recoverPass = resp
  }
};

const actions = {
  async login({ commit }, obj) {
    const response = await axios.post(`${process.env.VUE_APP_API_ROOT}/auth`, {
      ...obj,
    });

    commit("authData", response.data);
  },

  async logout(commit, obj) {
    await axios.get(`${process.env.VUE_APP_API_ROOT}/auth`, {
      headers: { "x-access-token": obj.token },
    });
  },

  async updatePassword(commit, obj) {
    await axios.put(
      `${process.env.VUE_APP_API_ROOT}/auth/change-password/${obj.id}`,
      { ...obj.data },
      { headers: { "x-access-token": obj.token } }
    );
  },

  async deleteUser(commit, obj) {
    await axios.delete(
      `${process.env.VUE_APP_API_ROOT}/auth/${obj.password}/${obj.id}`,
      { headers: { "x-access-token": obj.token } }
    );
  },

  async deleteUserEmail(commit, obj) {
    console.log(obj);
    await axios.get(
      `${process.env.VUE_APP_API_ROOT}/auth/delete-profile-email/${obj.data.email}/${obj.data.firstname}/${obj.data.lastname}`,
      { headers: { "x-access-token": obj.token } }
    );
  },

  async adminlogin({ commit }, obj) {
    const response = await axios.post(
      `${process.env.VUE_APP_API_ROOT}/auth/admin`,
      {
        ...obj,
      }
    );

    commit("authData", response.data);
  },

  async recoverPassword({ commit }, obj) {
    const response = await axios.get(`${process.env.VUE_APP_API_ROOT}/auth/recover-password/${obj.email}`);
    commit('RECOVER_PASSWORD', response.data);
  }
};
const getters = {};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
};
