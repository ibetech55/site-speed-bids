import axios from "axios";
import fileSaver from "file-saver";

const state = {
  purchases: null,
  session: null,
  userPurchaseData: {},
};

const mutations = {
  GET_PURCHASES: function (state, payload) {
    state.purchases = payload.data;
  },

  GET_SESSION: function (state, payload) {
    state.session = payload.data;
  },

  GET_USER_PURCHASE_DATA: function (state, payload) {
    state.userPurchaseData = payload.data;
  },
};
const actions = {
  async getPurchases({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/purchase/${obj.userId}`,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_PURCHASES", response.data);
  },

  async checkout({ commit }, obj) {
    const response = await axios.put(
      `${process.env.VUE_APP_API_ROOT}/purchase/checkout/${obj.purchaseId}`,
      {},
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_SESSION", response.data);
  },

  async updatePurchase(commit, obj) {
    await axios.put(
      `${process.env.VUE_APP_API_ROOT}/purchase/${obj.purchaseId}`,
      {},
      {
        headers: { "x-access-token": obj.token },
      }
    );
  },

  async downloadReciept(commit, obj) {
    const response = await axios({
      url: `${process.env.VUE_APP_API_ROOT}/purchase/download/${obj.purchaseId}`,
      method: "GET",
      responseType: "blob",
      headers: { "x-access-token": obj.token },
    });

    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    fileSaver(pdfBlob, "reciept.pdf");
  },

  async updatePurchaseLive({ commit }, obj) {
    const response = await axios.post(
      `${process.env.VUE_APP_API_ROOT}/purchase/updateLive`,
      { ...obj.data },
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_SESSION", response.data);
  },

  async getUserPurchaseData({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/purchase/user-purchase-data/${obj.userId}`,
      {
        headers: { "x-access-token": obj.token },
      }
    );
    commit("GET_USER_PURCHASE_DATA", response.data);
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
