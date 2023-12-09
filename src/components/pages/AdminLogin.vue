<template>
  <div class="login">
    <Navbar />
    <div class="titleDiv">
      <h1 class="text-center">Login</h1>
    </div>
    <div class="loginDiv">
      <div class="loginForm border p-4">
        <div class="logo-div text-center">
          <img
            src="../../assets/logo.jpg"
            alt=""
          >
        </div>
        <p class="error">{{this.error.invalid}}</p>
        <div class="form-group">
          <label for="">Email</label>
          <input
            type="text"
            class="form-control"
            v-model="email"
          >
          <p class="text-danger">{{this.error.email}}</p>
        </div>

        <div class="form-group">
          <label for="">Senha</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
          >
          <p class="text-danger">{{this.error.password}}</p>
        </div>

        <div class="form-group">
          <button
            @click="loginClickAdmin"
            class="site-btn btn btn-block"
          >Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../template/Navbar';
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    Navbar,
  },

  data:()=>({
      email: null,
      password: null,
      error: {},
  }),

  computed: {
    ...mapState('Auth', ['token', 'auth']),
  },

  methods: {
    ...mapActions('Auth', ['adminlogin']),

    async loginClickAdmin() {
      try {
        await this.adminlogin({
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('_speedbids', JSON.stringify(this.auth.user));
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response.data;
      }
    },
  },

  created() {
    if (localStorage.getItem('_speedBids')) {
      this.$router.push('/dashboard');
    }
  },
};
</script>

<style>
.titleDiv {
  margin-top: 100px;
  margin-bottom: 20px;
}

.loginDiv {
  width: 25%;
  margin: 0 auto;
  box-shadow: 5px 5px 10px #e0e0e0;
}

.forgotPassword {
  color: var(--primaryColor);
  cursor: pointer;
}

.error {
  color: red;
  text-align: center;
  margin: 0;
}

@media (max-width: 1000px) {
  .loginDiv {
    width: 90%;
  }
}
</style>