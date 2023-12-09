import { getField, updateField } from "vuex-map-fields";
import axios from "axios";

const state = {
  user: {},
  users: null,
};

const mutations = {
  updateField,
  GET_USER: function (state, payload) {
    state.user = payload.data;
  },

  GET_USERS: function (state, payload) {
    state.users = payload.data;
  },
};

const actions = {
  async updateUser({ commit }, obj) {
    const fd = new FormData();
    fd.set("firstname", state.user.firstname);
    fd.set("lastname", state.user.lastname);
    fd.set("cpf", state.user.cpf);
    fd.set("email", state.user.email);
    fd.set("username", state.user.username);
    fd.set("city", state.user.address.city);
    fd.set("state", state.user.address.state);
    fd.set("country", state.user.address.country);
    fd.set("image", state.user.image);
    fd.append("userImage", obj.selectedFile);

    const response = await axios.put(
      `${process.env.VUE_APP_API_ROOT}/user/${obj.id}`,
      fd,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_USER", response.data);
  },

  async getUser({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/user/${obj.id}`
    );
    console.log(response.data);
    commit("GET_USER", response.data);
  },

  async register(commit, obj) {
    await axios.post(`${process.env.VUE_APP_API_ROOT}/user`, { ...obj });
  },

  async registerEmail(commit, obj) {
    await axios.get(
      `${process.env.VUE_APP_API_ROOT}/user/${obj.email}/${obj.firstname}/${obj.lastname}`
    );
  },

  async getUsers({ commit }, obj) {
    const response = await axios.get(`${process.env.VUE_APP_API_ROOT}/user`, {
      params: {
        filter: obj.filter,
      },
    });
    commit("GET_USERS", response.data);
  },

  async userStatus(commit, obj) {
    await axios.put(
      `${process.env.VUE_APP_API_ROOT}/user/user-status/${obj.userId}`,
      {},
      {
        headers: { "x-access-token": obj.token },
        params: { status: obj.status },
      }
    );
  },
};

const getters = {
  getField,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
