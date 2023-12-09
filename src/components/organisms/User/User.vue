<template>
  <div>
    <div v-if="loading">
      <h1>Carregando...</h1>
    </div>
    <div v-else class="form-div">
      <div class="formReg p-4 border">
        <h1 class="text-center mb-4">{{user.firstname}} {{user.lastname}}</h1>
        <div class="userImgDiv text-center">
          <div class="userImg">
            <img
              :src="`${imageUrl}/${user.image}`"
              alt=""
            >
          </div>
        </div>

        <div>
          <div class="userInfo">
            <div class="userInfoDiv">
              <p class="userLabel">Primeiro Nome: </p>
              <p class="userData">{{user.firstname}}</p>
            </div>

            <div class="userInfoDiv">
              <p class="userLabel">Sobrenome: </p>
              <p class="userData">{{user.lastname}}</p>
            </div>

            <div class="userInfoDiv">
              <p class="userLabel">Usuário: </p>
              <p class="userData">{{user.username}}</p>
            </div>
          </div>

          <div class="userInfo mt-3">
            <div class="userInfoDiv">
              <p class="userLabel">Cidade: </p>
              <p class="userData">{{user.address.city}}</p>
            </div>

            <div class="userInfoDiv">
              <p class="userLabel">Estado: </p>
              <p class="userData">{{user.address.state}}</p>
            </div>

            <div class="userInfoDiv">
              <p class="userLabel">País: </p>
              <p class="userData">{{user.address.country}}</p>
            </div>
          </div>

          <div class="text-center mt-3">
            <div v-if="follows">
              <button
                v-if="follows.follows.includes(user._id)"
                @click="handleFollow"
                class="site-btn btn btn-lg"
              >Unfollow</button>

              <button
                v-if="!follows.follows.includes(user._id)"
                @click="handleFollow"
                class="site-btn btn btn-lg"
              >Follow</button>
            </div>

            <div v-if="!follows">
              <button
                @click="handleFollow"
                class="site-btn btn btn-lg"
              >Follow</button>
            </div>
          </div>
        </div>
      </div>

      <div class="userProducts">
        <h1 class="text-center mt-5">{{user.firstname}}´s Produtos</h1>

        <div class="userProductsDiv">
          <div
            class="userProductDiv border mb-5"
            v-for="(product, i) in products"
            :key="i"
          >

            <div class="productImgDiv">
              <img
                :src="`${imageUrl}/${product.image.defaultImage}`"
                alt=""
              >
            </div>

            <div class="productInfoDiv">
              <div class="productInfo">
                <p><span class="userLabel">Nome do Produto: </span><span class="userData">{{product.productName}}</span></p>
                <p><span class="userLabel">Preço: </span><span class="userData">R${{product.price}}</span></p>
                <p><span class="userLabel">Carregado: </span><span class="userData">{{formatTime(product.createdAt)}}</span></p>
                <div class="text-center">
                  <button
                    @click="handleUserProduct(product._id)"
                    class="site-btn btn btn-lg"
                  >Ver Produto</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
moment.locale('pt-br');
export default {
  data: () => ({
    imageUrl: null,
    userAuth: null,
    loading: false,
  }),

  computed: {
    ...mapState('User', ['user']),
    ...mapState('Product', ['products']),
    ...mapState('Follow', ['follows']),
  },

  methods: {
    ...mapActions('User', ['getUser']),
    ...mapActions('Product', ['getMyProducts']),
    ...mapActions('Follow', ['addFollow', 'getFollows']),

    handleFollow() {
      this.addFollow({
        token: this.userAuth.token,
        id: this.user._id,
        userId: this.userAuth.userId,
      });
    },

    formatTime(time) {
      return moment(time).format('LL');
    },

    handleUserProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },

  async created() {
    window.scrollTo(0, 0);
        this.loading = true;
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    await this.getUser({ id: this.$route.params.id });

    await this.getMyProducts({
      token: this.userAuth.token,
      id: this.user._id,
    });

    await this.getFollows({
      token: this.userAuth.token,
      id: this.userAuth.userId,
    });
    this.imageUrl = `${process.env.VUE_APP_API_IMAGES}`;
    this.loading = false;
  },
};
</script>

<style>
.userInfo {
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.userInfoDiv {
  width: 25%;
}

.userLabel {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
}

.userData {
  font-size: 20px;
  margin: 0;
}

.userProductsDiv {
  width: 100%;
  margin: 0 auto;
}

.userProductDiv {
  width: 60%;
  margin: 0 auto;
  display: flex;
  padding: 10px;
}

.productImgDiv {
  width: 50%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.productImgDiv img {
  width: 100%;
  height: 100%;
}

.productInfoDiv {
  width: 50%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>