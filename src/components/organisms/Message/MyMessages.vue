<template>
  <div>
    <h1 class="text-center">Minhas Mensagens</h1>

    <div class="myMessages">
      <div class="myMessages-div border p-2" v-for="(message, i) in myMessages" :key="i">
        <p class="m-0">
          <span class="font-weight-bold">Usuário: </span>
          <router-link :to="`/user/${message.id}`">{{message.username}}</router-link>
        </p>

        <router-link :to="`/send-message/${message.id}`" class="btn site-btn">Ver Mensagen</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("Message", ["myMessages"]),
  },

  data: () => ({
    userAuth: null,
  }),

  methods: {
    ...mapActions("Message", ["getMyMessages"]),
  },

  created() {
    this.userAuth = JSON.parse(localStorage.getItem("_speedbids"));

    this.getMyMessages({
      token: this.userAuth.token,
      id: this.userAuth.userId,
    });
  },
};
</script>

<style>
.myMessages-div {
  width: 50%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>