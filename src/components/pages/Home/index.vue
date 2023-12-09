<template>
  <div>
    <div v-if="loading">
      <h1>Carregando...</h1>
    </div>

    <div class="home">
      <Navbar />
      <div class="img-div">
        <img src="../../../assets/home.gif" alt="" />
        <div class="content">
          <h1 class="text-center mb-4">Speed Buyer</h1>
          <div class="text-center content-btn-div">
            <button @click="login" class="site-btn login-btn btn btn-lg mr-2">
              Login
            </button>
            <button @click="register" class="site-btn login-btn btn btn-lg">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
      <div class="product-div">
        <h1 class="text-center pt-3">Produtos Recentes</h1>
        <div v-if="!loading" class="glide">
          <vue-glide :options="options" v-model="active">
            <vue-glide-slide
              v-for="(product, i) in products"
              :key="i"
              class="item"
            >
              <div
                class="i-prd-img-div"
                @click="
                  handleImage(`${imageUrl}/${product.image.defaultImage}`)
                "
              >
                <img
                  :src="`${imageUrl}/${product.image.defaultImage}`"
                  alt=""
                />
              </div>
              <div class="i-prd-info">
                <p><span>Nome do Produto:</span> {{ product.productName }}</p>
                <p><span>Preço:</span> R${{ product.price }}</p>
              </div>
            </vue-glide-slide>
            <template slot="control">
              <div class="glide-div-left border" data-glide-dir="<">
                <div class="arrow left"></div>
              </div>
              <div class="glide-div-right border" data-glide-dir=">">
                <div class="arrow right"></div>
              </div>
            </template>
          </vue-glide>
          <div class="glide-dots-container">
            <div class="glide-dots">
              <div
                @click="handleSlide(i - 1)"
                v-for="i in products.length"
                :key="i"
                :class="
                  active === i - 1 ? 'glide-dots-active' : 'glide-dots-inactive'
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Glide, GlideSlide } from "vue-glide-js";
import Navbar from "../../template/Navbar";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    active: 0,
    loading: false,
    imageUrl: null,
    options: {
      type: "carousel",
      perView: 4,
      animationDuration: 1000,
      autoplay: 5000,
    },
  }),

  components: {
    Navbar,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },

  computed: {
    ...mapState("Product", ["products"]),
  },

  methods: {
    ...mapActions("Product", ["getProductsHomePage"]),
    handleImage(image) {
      const home = document.querySelector(".home");
      const overlay = document.createElement("div");
      const img = document.createElement("img");
      img.src = image;
      overlay.appendChild(img);
      home.appendChild(overlay);
      overlay.classList.add("home-image-overlay");
      overlay.addEventListener("click", function (e) {
        if (e.target !== img) {
          home.removeChild(overlay);
        }
      });
    },
    handleSlide(slide) {
      this.active = slide;
    },
    login() {
      this.$router.push("/login");
    },

    register() {
      this.$router.push("/register");
    },
  },

  async created() {
    this.loading = true;
    if (localStorage.getItem("_speedbids")) {
      this.$router.push("/dashboard");
    }

    this.imageUrl = process.env.VUE_APP_API_IMAGES;

    await this.getProductsHomePage();
    this.loading = false;
  },
};
</script>

<style>
.home {
  position: relative;
}
.home-image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100%;
  z-index: 9999;
  display: grid;
  place-items: center;
}

.home-image-overlay img {
  width: 500px;
  height: 500px;
}
.glide-dots-container {
  display: absolute;
}
.glide-dots {
  display: flex;
  justify-items: center;
  align-items: center;
  width: 450px;
  margin: 0 auto;
}

.glide-dots-inactive,
.glide-dots-active {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
}

.glide-dots-inactive {
  border: 1px solid var(--primaryColor);
}

.glide-dots-inactive:hover,
.glide-dots-active:hover {
  cursor: pointer;
}

.glide-dots-inactive:hover {
  background: #e6e6e6;
}

.glide-dots-active {
  background-color: var(--primaryColor);
}

.glide {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

.glide-div-left,
.glide-div-right {
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  height: 100px;
  width: 100px;
  border: 0;
  font-weight: 100;
  text-align: center;
  transform: translateY(50%);
  margin: 0;
  padding: 0;
  transition: all 100ms ease-in-out;
  color: #e6e6e6;
  font-size: 40px;
}

.glide-div-left {
  left: -120px;
}

.glide-div-right {
  right: -120px;
}

.glide-div-left:hover,
.glide-div-right:hover {
  cursor: pointer;
  height: 115px;
  width: 115px;
}

.img-div {
  width: 100%;
  height: calc(58vh - 74px);
  position: relative;
}

.img-div img {
  display: block;
  width: 100%;
  height: 100%;
}

.img-div:after {
  content: "";
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  z-index: 999;
  transform: translate(-50%, -50%);
  color: var(--siteText);
}

.product-div {
  width: 100%;
  /* height: 80vh; */
}

.items {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 85%;
  /* background: red; */
}

.item {
  width: 23%;
  height: 300px;
  border: 1px solid #e6e6e6;
  box-shadow: 5px 5px 10px#ebebeb;
}

.alert-form {
  width: 30%;
  margin: 0 auto;
  box-shadow: 5px 5px 10px#ebebeb;
}

.slider {
  display: flex;
  width: 100px;
  height: 100px;
  /* border-radius: 100%; */
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-shadow: 5px 5px 10px#ebebeb;
}

.slider:hover {
  cursor: pointer;
  width: 120px;
  height: 120px;
}

.arrow {
  border: solid #e6e6e6;
  border-width: 0 3px 3px 0px;
  display: inline-block;
  padding: 1px;
  width: 40px;
  height: 40px;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.div1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

h1 {
  font-weight: 100;
}

.content h1 {
  font-weight: 500;
  font-size: 60px;
}

.login-btn {
  padding: 20px 100px;
  font-size: 30px;
}

.i-prd-img-div {
  height: 200px;
  width: 100%;
  background: gray;
}

.i-prd-img-div:hover {
  cursor: pointer;
}

.i-prd-img-div img {
  width: 100%;
  height: 100%;
}

.i-prd-info {
  padding: 10px;
}
.i-prd-info span {
  font-weight: bold;
}

@media (max-width: 1000px) {
  .content-btn-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-btn-div button {
    padding: 10px 35px;
    font-size: 20px;
  }
  .content h1 {
    padding-top: 100px;
    font-weight: 500;
    font-size: 40px;
  }
  .items {
    display: block;
  }

  .item {
    width: 80%;
    margin: 0 auto 20px auto;
  }

  .alert-form {
    width: 80%;
  }

  .slider {
    display: none;
  }
}
</style>