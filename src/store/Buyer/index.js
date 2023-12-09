import axios from "axios";

const state = {
  buyers: {},
  buyer: {},
  addedPrice: null,
  liveBids: {},
  bidTimestamp: null,
};

const mutations = {
  GET_BUYERS: function (state, payload) {
    state.buyers = payload.data;
  },

  GET_BUYER: function (state, payload) {
    state.buyer = payload.data;
  },

  ADDED_PRICE: function (state, payload) {
    state.addedPrice = payload.data;
  },

  VIEW_BIDS: function (state, payload) {
    state.liveBids = payload.data;
  },

  GET_TIMESTAMP: function (state, payload) {
    state.bidTimestamp = payload.data;
  },
};

const actions = {
  async getBuyers({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/buyer/${obj.id}`,
      { headers: { "x-access-token": obj.token } }
    );
    commit("GET_BUYERS", response.data);
  },

  async getBuyer({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/buyer/get-buyer/${obj.buyerId}`,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_BUYER", response.data);
  },

  async addPrice({ commit }, obj) {
    const response = await axios.put(
      `${process.env.VUE_APP_API_ROOT}/buyer/${obj.id}`,
      { ...obj.data },
      { headers: { "x-access-token": obj.token } }
    );

    commit("ADDED_PRICE", response.data);
  },

  async addLiveBidder(commit, obj) {
    await axios.post(
      `${process.env.VUE_APP_API_ROOT}/buyer/liveBid`,
      { ...obj.data },
      {
        headers: { "x-access-token": obj.token },
      }
    );
  },

  async viewLiveBids({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/buyer/view-bids/${obj.userId}`,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    console.log(response.data);
    commit("VIEW_BIDS", response.data);
  },

  async bidderTimestamp({ commit }, obj) {
    const response = await axios.post(
      `${process.env.VUE_APP_API_ROOT}/buyer/bidder-timestamp/${obj.buyerId}`,
      { entering: obj.entering },
      {
        headers: { "x-access-token": obj.token },
      }
    );
    commit("GET_TIMESTAMP", response.data);
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
