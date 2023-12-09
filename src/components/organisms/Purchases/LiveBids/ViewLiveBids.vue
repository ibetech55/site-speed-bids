<template>
  <div>
    <h1 class="text-center">Live Lances</h1>
    <div v-if="loading">
      <h1>Carregando...</h1>
    </div>
    <div v-else class="liveBidsCards">
      <div
        v-for="(liveBid, i) in liveBids"
        :key="i"
        class="liveBidCard border mb-4"
      >
        <div class="lbc1">
          <div class="lbc1-img-div">
            <img
              :src="`${imageUrl}/${liveBid.product.image.defaultImage}`"
              alt=""
            >
          </div>
        </div>
        <div class="lbc2">
          <div class="bid-info">
            <p><span>Nome do Produto:</span> {{liveBid.product.productName}}<p>
                <p><span>Vendedor: </span>{{liveBid.owner.username}}</p>
                <p><span>Data do Live:</span> {{formatDate(liveBid.product.endDate)}}</p>
                <p><span>Preço Inicial:</span> R${{liveBid.product.price}}</p>
                <div
                  v-if="liveBid.liveStatus"
                  class="statusSection"
                >
                  <div class="statusBall"></div>
                  <p>Live</p>
                </div>
                <div
                  v-if="liveBid.liveStatus"
                  class="text-center mt-4"
                >
                  <router-link :to="`/live/${liveBid._id}`" class="site-btn btn btn-lg">Participar</router-link>
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
    userAuth: null,
    imageUrl: null,
    loading: false
  }),

  computed: {
    ...mapState('Buyer', ['liveBids']),
  },

  methods: {
    ...mapActions('Buyer', ['viewLiveBids']),

    formatDate(time) {
      return moment(time).format('DD/MM/YYYY HH:mm');
    },
  },

  async created() {
    this.loading = true;
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
    await this.viewLiveBids({
      token: this.userAuth.token,
      userId: this.userAuth.userId,
    });
    this.loading = false;
  },
};
</script>

<style scoped>
.liveBidCard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  padding: 10px;
}

.lbc1 {
  width: 50%;
  padding: 20px;
}
.lbc2 {
  width: 50%;
}

.lbc1-img-div {
  height: 200px;
  width: 90%;
  height: 300px;
  margin: 0 auto;
}

.lbc1-img-div img {
  width: 100%;
  height: 100%;
}

.bid-info {
  padding-left: 20px;
}

.bid-info p {
  margin: 0;
  line-height: 2em;
}

.bid-info span {
  font-weight: bold;
}

.statusSection {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: green;
}

.statusBall {
  height: 10px;
  width: 10px;
  background: green;
  border-radius: 100%;
  margin-top: 2px;
  margin-right: 5px;
}
</style>