<template>
  <div class="dashboard">
    <div class="site-nav">
      <div class="div-left">
        <div
          @click="changeMenu"
          class="lines"
        >
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
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
          v-if="this.token"
          class="nav-items-ham-a"
          id="navLink"
          to="register"
          style="visibility:hidden;"
        >Register</router-link>
        <div class="navPic">
          <img
            :src="`${imageUrl}/${image}`"
            alt=""
          >
          <div class="navOptions">
            <p
              v-if="this.token"
              @click="logoutClick"
              class="border-bottom m-0 p-3"
            >Logout</p>
            <router-link
              class="userConfig border-bottom m-0 p-3"
              :to="`/user-config/${this.userAuth.userId}`"
            >Usuário</router-link>
          </div>
        </div>
      </div>

        <div id="responsive-pic" class="navPic">
          <img
            :src="`${imageUrl}/${image}`"
            alt=""
          >
          <div class="navOptions">
            <p
              v-if="this.token"
              @click="logoutClick"
              class="border-bottom m-0 p-3"
            >Logout</p>
            <router-link
              class="userConfig border-bottom m-0 p-3"
              :to="`/user-config/${this.userAuth.userId}`"
            >User</router-link>
          </div>
        </div>

    </div>
    <div class="divA">
      <div
        id="menu"
        class="menu border-right border-top"
      >
        <router-link
          v-if="userType == 'master'"
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/admin/all-products"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Todos Os Produtos</p>
        </router-link>
        <router-link
          v-if="userType == 'master'"
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/admin/all-users"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Todos Os Usuários</p>
        </router-link>
        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/dashboard"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Produtos</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/purchases"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Compras</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/favorites"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Favoritos</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/follows"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Seguidores</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/add-product"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Adicionar Produtos</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/my-product"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Meus Produtos</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/live-bids"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Lives</p>
        </router-link>

        <router-link
          id="menuItem"
          :class="`${this.menuClass} m-0`"
          to="/messages"
        >
          <div class="m-0 text-center">
            <span>
              <i class="fas fa-users"></i>
            </span>
          </div>
          <p>Mensagens</p>
        </router-link>
      </div>
      <div
        id="mainSec"
        class="mainSection"
      >
        <router-view></router-view>
        <div
          id="overlayDiv"
          @click="mydiv"
        ></div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      size: false,
      menuClass: null,
      token: null,
      imageUrl: null,
      userAuth: null,
      image: null,
      userType:null
    };
  },

  computed: {
    ...mapState('User', ['user']),
  },

  async created() {
    if (!localStorage.getItem('_speedbids')) {
      this.$router.push('/');
    }
    this.token = localStorage.getItem('_speedbids');
    this.menuClass = 'menuItem';

    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    await this.getUser({ id: this.userAuth.userId });
    this.userType = jwtDecode(this.userAuth.token).type;
    this.image = this.user.image;
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
  },

  methods: {
    ...mapActions('User', ['getUser']),

    homePage() {
      this.$router.push('/');
    },

    mydiv() {
      let overlayDiv = document.getElementById('overlayDiv');
      let mainSec = document.getElementById('mainSec');
      let menu = document.getElementById('menu');
      mainSec.style.width = '93%';
      menu.style.width = '7%';
      overlayDiv.classList.remove('overlayDiv');

      this.menuClass = 'menuItem';

      this.size = false;
    },

    changeMenu() {
      let mainSec = document.getElementById('mainSec');
      let menu = document.getElementById('menu');
      let overlayDiv = document.getElementById('overlayDiv');

      if (!this.size) {
        mainSec.style.width = '88%';
        menu.style.width = '12%';
        overlayDiv.classList.add('overlayDiv');
        this.menuClass = 'menuItem2';
        mainSec.style.position = 'fixed';
        this.size = true;
      } else {
        mainSec.style.width = '93%';
        menu.style.width = '7%';
        overlayDiv.classList.remove('overlayDiv');
        this.menuClass = 'menuItem';
        mainSec.style.position = 'absolute';
        this.size = false;
      }
    },

    logoutClick() {
      localStorage.removeItem('_speedbids');
      this.$router.push('/');
    },
  },
};
</script>

<style>
.dashboard {
  position: relative;
}

.divA {
  min-height: calc(100vh - 74px);
  display: flex;
}

.menu {
  width: 7%;
  height: calc(100vh - 74px);
  position: fixed;
  top: 74px;
  left: 0;
  background: var(--primaryColor);
}

.menuItem {
  display: block;
  color: var(--siteText);
  text-align: center;
  border-bottom: 1px solid var(--siteText);
  padding: 5px 0 10px 0;
  font-size:13px;
}

.menuItem:hover,
.menuItem2:hover {
  text-decoration: none;
  color: var(--siteText);
  background: var(--hoverColor);
}

.menuItem2 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--siteText);
  text-align: center;
  border-bottom: 1px solid var(--siteText);
  padding: 13px 0 13px 20px;
    font-size:13px;
}

.menuItem p {
  margin: 0;
  /* margin-left: 10px; */
}

.menuItem2 p {
  margin: 0 0 0 10px;
}

.mainSection {
  width: 93%;
  min-height: calc(100vh - 74px);
  position: absolute;
  right: 0;
  top: 74px;
  z-index: -0;
  padding: 30px 20px 30px 20px;
  transition: ease-in 0.2s;
}

.site-nav {
  background: var(--primaryColor);
  color: var(--siteText);
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: 9999;
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

.overlayDiv {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - 74px);
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: ease-in 0.5s;
  z-index: 9999;
}

.navPic {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 20px;
}

.navPic img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.navPic:hover {
  cursor: pointer;
}

.navOptions {
  display: none;
  position: fixed;
  top: 55px;
  right: 30px;
  width: 200px;
  background: var(--primaryColor);
  color: var(--site);
}

.navPic:hover > .navOptions {
  display: block;
}

.navOptions:hover {
  display: block;
}

.navOptions p:hover {
  background: var(--hoverColor);
}

  #responsive-pic{
    display: none;
  }

@media (max-width: 1000px) {
  #responsive-pic{
    display: block;
  }

#responsive-pic:hover > .navOptions {
  display: block;
  position:absolute;
  top:10px;
  z-index: 10000 !important;
}
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

  .divA {
    display: block;
  }

  .mainSection {
    position: relative;
    width: 90%;
    margin: 0 auto;
  }
}

.lines {
  margin-right: 20px;
}

.lines:hover {
  cursor: pointer;
}

.line {
  padding: 3px;
  width: 50px;
  background: #fff;
  margin-bottom: 6px;
}

.line:last-child {
  margin-bottom: 0;
}

.userConfig {
  display: block;
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