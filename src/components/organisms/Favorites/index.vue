<template>
  <div>
    <div class="filter">
      <div>
        <div class="filterDiv">
          <div class="filterDiv1">
            <h1 class="text-center">Favoritos</h1>
          </div>
        </div>
        <div v-if="loading">
          <h1>Carregando...</h1>
        </div>
        <div class="itemsP border-top" v-else>
          <div class="itemP border" v-for="(product, i) in products" :key="i">
            <div class="itemImg border border-bottom-0">
              <img :src="`${imageUrl}/${product.image.defaultImage}`" alt />
              <div v-b-modal="`productImageModal${product._id}`" class="imgOverlay"></div>

              <ProductModal
                :id="product._id"
                :images="product.image.productImages"
                :defaultImage="product.image.defaultImage"
              />
            </div>
            <div class="itemInfo">
              <div
                :class="favorites ? checkFavorites(product._id)  ? 'starDiv' : 'starDiv2' : 'starDiv2'"
              >
                <span @click="handleFavorite(product._id)">
                  <i class="fa fa-star"></i>
                </span>
              </div>
              <p>
                <span class="font-weight-bold">Produto:</span>
                {{product.productName}}
              </p>
              <p>
                <span class="font-weight-bold">Preço:</span>
                R${{product.price}}
              </p>
              <p>
                <span class="font-weight-bold">Categoria:</span>
                {{formatCategory(product.category)}}
              </p>
              <p>
                <span class="font-weight-bold">Usuário: </span>
                <router-link :to="`/user/${product.user._id}`">{{product.user.username}}</router-link>
              </p>
              <p>
                <span class="font-weight-bold">Carregado:</span>
                {{formatProductTime(product.createdAt)}}
              </p>
              <div class="text-center">
                <button @click="viewProduct(product._id)" class="site-btn btn btn-lg">Ver Produto</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductModal from "../Products/Product/ProductModal";
import { mapFields } from "vuex-map-fields";
import moment from "moment";
moment.locale("pt-br");

export default {
  components: {
    ProductModal,
  },

  data: () => ({
    size: false,
    imageUrl: null,
    fav: false,
    favoriteColor: "starDiv",
    userAuth: null,
    loading: false,
  }),

  computed: {
    ...mapState("Product", ["products"]),
    ...mapState("Favorite", ["favorites"]),
    ...mapFields("Product", ["filter"]),
  },

  methods: {
    ...mapActions("Product", [
      "getProducts",
      "filterProducts",
      "getFavoriteProducts",
    ]),
    ...mapActions("Favorite", ["addFavorite", "getFavorite"]),
    formatCategory(name) {
      let newName;
      if (name === "houses") {
        newName = "Casas";
      } else if (name === "electronics") {
        newName = "Eletrônicos";
      } else if (name === "sports") {
        newName = "Esportes";
      } else if (name === "music") {
        newName = "Música";
      } else if (name === "outhers") {
        newName = "Outros";
      } else if (name === "automobiles") {
        newName = "Automóveis";
      }
      return newName;
    },
    formatProductTime(time) {
      return moment(time).fromNow();
    },

    handleFilter() {
      this.filterProducts({ ...this.filter });
    },

    checkFavorites(productId) {
      return this.favorites.productDetails.some(
        (obj) => obj.productId === productId && obj.active === true
      );
    },

    viewProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    async handleFavorite(productId) {
      await this.addFavorite({
        token: this.userAuth.token,
        data: { userId: this.userAuth.userId, productId },
      });

      await this.getFavoriteProducts({
        id: this.userAuth.userId,
        token: this.userAuth.token,
      });
    },

    changeDivs() {
      let up = document.getElementById("arrowUp");
      let down = document.getElementById("arrowDown");
      if (!this.size) {
        document.querySelector(".filter2").style.height = "10vh";
        document.querySelector(".itemsP").style.minHeight = "81.5vh";
        this.size = true;
        up.style.display = "none";
        down.style.display = "inline";
      } else {
        document.querySelector(".filter2").style.height = "20vh";
        document.querySelector(".itemsP").style.minHeight = "71.5vh";
        this.size = false;
        up.style.display = "inline";
        down.style.display = "none";
      }
    },
  },

  async created() {
    this.loading = true;
    this.userAuth = await JSON.parse(localStorage.getItem("_speedbids"));

    await this.getFavoriteProducts({
      id: this.userAuth.userId,
      token: this.userAuth.token,
    });
    await this.getFavorite({
      id: this.userAuth.userId,
      token: this.userAuth.token,
    });

    this.imageUrl = process.env.VUE_APP_API_IMAGES;
    this.loading = false;
  },
};
</script>

<style>
.itemsP {
  width: 100%;
  /* min-height: 71.5vh; */
  padding: 20px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 20%);
  grid-gap: 1em;
}

.itemP {
  /* height: 500px; */
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* margin: 0 auto; */
  /* margin-bottom: 20px; */
  margin-bottom: 0;
}

.itemImg {
  height: 250px;
  width: 100%;
  position: relative;
}

.itemImg img {
  display: block;
  width: 100%;
  height: 100%;
}

.itemInfo {
  width: 100%;
  padding: 15px 10px;
}

.itemImg:hover {
  cursor: pointer;
}

.itemImg:hover > .imgOverlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}

/* .itemP:first-child {
  margin-top: 20px;
} */

.divArrow {
  font-size: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.starDiv,
.starDiv2 {
  background: var(--primaryColor);
  font-size: 30px;
  text-align: center;
}

.starDiv {
  color: yellow;
}

.starDiv2 {
  color: #fff;
}

.starDiv span:hover,
.starDiv2 span:hover {
  cursor: pointer;
}
</style>