<template>
  <div>
    <div class="filter">
      <div>
        <div class="filterDiv">
          <div class="filterDiv1">
            <h1 class="text-center pt-2">Produtos</h1>
            <label for="checkbox">
              <span>&#9660;</span>
            </label>
          </div>
          <input type="checkbox" id="checkbox" />
          <div class="filters">
            <div class="filters2">
              <div class="form-group">
                <label for>Nome Do Produto</label>
                <input type="text" class="form-control" v-model="filter.productName" />
              </div>

              <div class="form-group">
                <label>Categoria</label>
                <select class="form-control" v-model="filter.category">
                  <option value></option>
                  <option value="automobiles">Automóveis</option>
                  <option value="houses">Casas</option>
                  <option value="electronics">Eletrônicos</option>
                  <option value="sports">Esportes</option>
                  <option value="music">Música</option>
                  <option value="outhers">Outros</option>
                </select>
              </div>

              <div class="form-group">
                <label for>Preço Mínimo</label>
                <input type="text" class="form-control" v-model="filter.minPrice" />
              </div>

              <div class="form-group">
                <label for>Preço Máximo</label>
                <input type="text" class="form-control" v-model="filter.maxPrice" />
              </div>
            </div>

            <div class="filters2">
              <div class="form-group">
                <label for="">Classificar por data:</label>
                <select class="form-control" v-model="filter.sortDate">
                  <option value="newOld">Mais Novo - Mais Antigo</option>
                  <option value="oldNew">Mais Antigo - Mais Novo</option>
                </select>
              </div>

              <div class="form-group">
                <label for="">Classificar por preço:</label>
                <select class="form-control" v-model="filter.sortPrice">
                  <option value="highLow">Mais Alto - Mais Baixo</option>
                  <option value="lowHigh">Mais Baixo - Mais Alto</option>
                </select>
              </div>
            </div>

            <div class="text-center mt-2">
              <button @click="handleFilter" class="site-btn btn btn-lg">Filtro</button>
            </div>
          </div>
        </div>
        <div v-if="loading">
          <h1 class="p-2">Carregando...</h1>
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
import ProductModal from "./Product/ProductModal.vue";
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
    ...mapActions("Product", ["getProducts", "filterProducts"]),
    ...mapActions("Favorite", ["addFavorite", "getFavorite"]),

    formatCategory(name){
      let newName;
        if(name === 'houses'){
          newName = 'Casas'
        } else if(name === 'electronics'){
          newName = 'Eletrônicos'
        }else if(name === 'sports'){
          newName = 'Esportes'
        }else if(name === 'music'){
          newName = 'Música'
        } else if(name === 'outhers'){
          newName = 'Outros'
        } else if(name === 'automobiles'){
            newName = 'Automóveis'
        }
        return newName;
    },

    formatProductTime(time) {
      return moment(time).format("DD/MM/YYYY hh:mm");
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

    handleFavorite(productId) {
      this.addFavorite({
        token: this.userAuth.token,
        data: { userId: this.userAuth.userId, productId },
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

    await this.getProducts();
    await this.getFavorite({
      id: this.userAuth.userId,
      token: this.userAuth.token,
    });

    this.imageUrl = process.env.VUE_APP_API_IMAGES;
    this.loading = false;
  },
};
</script>

<style scoped>
.filters {
  height: 0;
  overflow: hidden;
}

.filters2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filters2 div {
  width: 20%;
  margin-right: 20px;
}

#checkbox {
  display: none;
}

#checkbox:checked + .filters {
  height: 250px;
  transition: all 0.5s;
}

.filterDiv1 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.filterDiv1 label {
  position: absolute;
  right: 15px;
}
.filter {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9988;
}

.filter2 {
  width: 100%;
  height: 20vh;
  transition: ease-in 0.5s;
}

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

@media(max-width:1000px){
  .itemsP{
    display: block;
  }

  .itemP{
    margin:20px auto;
  }
}
</style>