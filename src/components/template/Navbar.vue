<template>
  <div class="site-nav">
    <div class="div-left">
      <img
        src="../../assets/logo.jpg"
        alt=""
      >
      <h1
        @click="homePage"
        class="navheader"
      >Speed Buyer</h1>
    </div>

    <div
      id="nav"
      class="nav-items-ham nav-items"
    >
      <router-link
        v-if="!this.token"
        id="navLink"
        class="nav-items-ham-a"
        to="login"
      >Login</router-link>
      <router-link
        v-if="!this.token"
        class="nav-items-ham-a"
        id="navLink"
        to="register"
      >Cadastrar</router-link>
      <!-- <router-link
        class="nav-items-ham-a"
        id="navLink"
        to="products"
      >Ver Produtos</router-link> -->

      <a
        v-if="this.token"
        @click="logoutClick"
        class="nav-items-ham-a logout"
        id="navLink"
      >Logout</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Navbar',

  data() {
    return {
      token: null,
    };
  },

  methods: {
    homePage() {
      this.$router.push('/');
    },

    logoutClick() {
      localStorage.removeItem('_speedBids');
      this.$router.push('/');
    },
  },

  created() {
    this.token = localStorage.getItem('_speedBids');
  },
};
</script>

<style>
.site-nav {
  background: var(--primaryColor);
  color: var(--siteText);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.site-nav .div-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-nav div img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.navheader:hover {
  cursor: pointer;
}

.nav-items a {
  color: var(--siteText);
  text-decoration: none;
  display: block;
  padding: 25px 40px;
}

.nav-items a:hover {
  background: var(--hoverColor);
  color: #fff;
  text-decoration: none;
}

.hamMenu {
  position: relative;
  display: none;
}

.nav-items-ham {
  display: none;
}

.nav-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout {
  cursor: pointer;
}

@media (max-width: 1000px) {
  .nav-items {
    display: none;
  }

  .hamMenu {
    display: block;
  }

  .nav-items a {
    display: block;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    text-decoration: none;
    color: var(--siteText);
  }

  .nav-items a:first-child {
    border-top: 1px solid #e0e0e0;
  }

  .hamMenu:before .hamMenu:checked ~ .nav-items-ham {
    display: block;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 9999;
    background: var(--primaryColor);
    width: 100%;
  }
}

@media (min-width: 1000px) {
  .nav-items-ham {
    display: none;
  }

  .nav-items {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>