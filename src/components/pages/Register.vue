<template>
  <div class="register">
    <Navbar />

    <div class="titleDiv">
      <h1 class="text-center">Cadastrar</h1>
    </div>
    <div class="form-div">
      <div class="formReg p-4 border">
        <div class="logo-div text-center">
          <img
            src="../../assets/logo.jpg"
            alt=""
          >
        </div>

        <div class="form-row1">
          <div class="form-group regInline">
            <label for="">Primeiro Nome</label>
            <input
              type="text"
              class="form-control"
              v-model="form.firstname"
            >
            <p class="text-danger m-0">{{this.error.firstname}}</p>
          </div>
          <div class="form-group regInline">
            <label for="">Sobrenome</label>
            <input
              type="text"
              class="form-control"
              v-model="form.lastname"
            >
            <p class="text-danger m-0">{{this.error.lastname}}</p>
          </div>

          <div class="form-group regInline">
            <label for="">CPF</label>
            <input
              type="text"
              class="form-control"
              v-model="form.cpf"
            >
            <p class="text-danger m-0">{{this.error.cpf}}</p>
          </div>
        </div>

        <div class="form-row1">
          <div class="form-group regInline">
            <label for="">Email</label>
            <input
              type="text"
              class="form-control"
              v-model="form.email"
            >
            <p class="text-danger m-0">{{this.error.email}}</p>
          </div>

          <div class="form-group regInline">
            <label for="">Usuário</label>
            <input
              type="text"
              class="form-control"
              v-model="form.username"
            >
            <p class="text-danger m-0">{{this.error.username}}</p>
          </div>

          <div class="form-group regInline">
            <label for="">Senha</label>
            <input
              type="password"
              class="form-control"
              v-model="form.password"
            >
            <p class="text-danger m-0">{{this.error.password}}</p>
          </div>
        </div>

        <div class="form-row1">
          <div class="form-group regInline">
            <label for="">Cidade</label>
            <input
              type="text"
              class="form-control"
              v-model="form.address.city"
            >
            <p class="text-danger m-0">{{this.error.city}}</p>
          </div>

          <div class="form-group regInline">
            <label for="">Estado</label>
            <input
              type="text"
              class="form-control"
              v-model="form.address.state"
            >
            <p class="text-danger m-0">{{this.error.state}}</p>
          </div>

          <div class="form-group regInline">
            <label for="">País</label>
            <input
              type="text"
              class="form-control"
              v-model="form.address.country"
            >
            <p class="text-danger m-0">{{this.error.country}}</p>
          </div>
        </div>

        <div class="text-center mt-3">
          <button
            @click="registerClick"
            class="site-btn btn btn-lg"
          >Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../template/Navbar';
import { mapActions } from 'vuex';
import swal from 'sweetalert2';

export default {
  components: {
    Navbar,
  },

  data() {
    return {
      form: {
        firstname: null,
        lastname: null,
        cpf: null,
        email: null,
        username: null,
        password: null,
        address: {
          city: null,
          state: null,
          country: null,
        },
      },

      error: {},
    };
  },

  methods: {
    ...mapActions('User', ['register', 'registerEmail']),

    async registerClick() {
      try {
        await this.register(this.form);

        await swal.fire(
          'Cadastrado',
          'Bem-vindo!\nUm e-mail de confirmação será enviado para você',
          'success',
        );

        this.$router.push('/login');

        await this.registerEmail({
          email: this.form.email,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
        });
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
.regsiter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-row1 {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  margin-bottom: 15px;
}

.formReg {
  width: 60%;
  margin: 0 auto;
  box-shadow: 5px 5px 10px #ebebeb;
}

.regInline {
  width: 30%;
  margin-right: 10px;
  margin-bottom: 0;
}

.logo-div {
  margin-bottom: 20px;
}

.logo-div img {
  width: 75px;
  height: 75px;
}

@media (max-width: 1000px) {
  .form-row1 {
    display: block;
  }

  .hide {
    display: none;
  }

  .regInline {
    margin-right: 0;
    width: 100%;
  }

  .formReg {
    margin-bottom: 30px;
    width: 90%;
  }
}
</style>