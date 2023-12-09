import { getField, updateField } from "vuex-map-fields";

const axios = require("axios");
const state = {
  products: null,
  product: null,
  filter: {},
  productsLogout: null
};
const mutations = {
  updateField,

  GET_PRODUCTS: function (state, payload) {
    state.products = payload.data;
  },

  GET_PRODUCT: function (state, payload) {
    state.product = payload.data;
  },

  GET_MY_PRODUCTS: function (state, payload) {
    state.products = payload.data;
  },

  GET_ALL_PRODUCTS_LOGOUT: function (state, payload) {
    state.productsLogout = payload.data;
  }
};
const actions = {
  async updateDefaultImg({ commit }, obj) {
    const fd = new FormData();
    fd.set("defaultImage", obj.defaultImage);
    fd.set("id", obj.id);
    fd.append("newDefaultImage", obj.newDefaultImage);

    const response = await axios.put(
      `${process.env.VUE_APP_API_ROOT}/product/defaultImage/${obj.id}`,
      fd,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_PRODUCT", response.data);
  },

  async deleteImage(commit, obj) {
    await axios.delete(
      `${process.env.VUE_APP_API_ROOT}/product/deleteImage/${obj.imageName}/${obj.id}`,
      { headers: { "x-access-token": obj.token } }
    );
  },

  async updateProduct({ commit }, obj) {
    const response = await axios.put(
      `${process.env.VUE_APP_API_ROOT}/product/${obj.id}`,
      { ...state.product },
      { headers: { "x-access-token": obj.token } }
    );
    commit("GET_PRODUCT", response.data);
  },

  async storeProduct(commit, obj) {
    const fd = new FormData();
    fd.set("productName", obj.data.productName);
    fd.set("price", obj.data.price);
    fd.set("category", obj.data.category);
    fd.set("description", obj.data.description);
    fd.set("user", obj.data.user);
    fd.set("endDate", obj.data.endDate);
    fd.set("endTime", obj.data.endTime);
    fd.set("bidType", obj.data.bidType);
    fd.append("defaultImage", obj.data.image.defaultImage);

    for (let i = 0; i < obj.data.image.productImages.length; i++) {
      fd.append("productImages", obj.data.image.productImages[i]);
    }

    await axios.post(`${process.env.VUE_APP_API_ROOT}/product`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": obj.token,
      },
    });
  },

  async getProducts({ commit }) {
    const response = await axios.get(`${process.env.VUE_APP_API_ROOT}/product`);
    commit("GET_PRODUCTS", response.data);
  },

  async getProductsHomePage({ commit }) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/product/home-page`
    );
    commit("GET_PRODUCTS", response.data);
  },

  async getProduct({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/product/${obj.id}`
    );
    commit("GET_PRODUCT", response.data);
  },

  async getMyProducts({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/product/my-products/${obj.id}`,
      {
        headers: { "x-access-token": obj.token },
      }
    );
    commit("GET_MY_PRODUCTS", response.data);
  },

  async getSimilarProducts({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/product/${obj.category}/${obj.id}`
    );
    commit("GET_PRODUCTS", response.data);
  },

  async addMoreProductImage({ commit }, obj) {
    const fd = new FormData();
    fd.append("addedProductImage", obj.image);

    const response = await axios.put(
      `${process.env.VUE_APP_API_ROOT}/product/addImages/${obj.id}`,
      fd,
      {
        headers: { "x-access-token": obj.token },
      }
    );

    commit("GET_PRODUCT", response.data);
  },

  async deleteProduct(commit, obj) {
    await axios.delete(
      `${process.env.VUE_APP_API_ROOT}/product/${obj.productName}/${obj.id}`,
      { headers: { "x-access-token": obj.token } }
    );
  },

  async filterProducts({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/product/filter`,
      {
        params: {
          productName: obj.productName,
          category: obj.category,
          minPrice: obj.minPrice,
          maxPrice: obj.maxPrice,
          sortDate: obj.sortDate,
          sortPrice: obj.sortPrice,
        },
      }
    );
    commit("GET_PRODUCTS", response.data);
  },

  async getFavoriteProducts({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/favorite/favoriteProducts/${obj.id}`,
      { headers: { "x-access-token": obj.token } }
    );
    commit("GET_PRODUCTS", response.data);
  },

  async getAllProductsAdmin({ commit }, obj) {
    const response = await axios.get(
      `${process.env.VUE_APP_API_ROOT}/product/getProductsAdmin`,
      {
        headers: { "x-access-token": obj.token },
        params: { productFilter: obj.productFilter },
      }
    );
    commit("GET_PRODUCTS", response.data);
  },

  async productStatus(commit, obj) {
    await axios.put(
      `${process.env.VUE_APP_API_ROOT}/product/admin-status/${obj.productId}`,
      { active: obj.active },
      {
        headers: { "x-access-token": obj.token },
      }
    );
  },

  async getProductsLogout({ commit }) {
    const response = await axios.get(`${process.env.VUE_APP_API_ROOT}/product/getAllLogout`);
    commit('GET_ALL_PRODUCTS_LOGOUT', response.data);
  }
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
