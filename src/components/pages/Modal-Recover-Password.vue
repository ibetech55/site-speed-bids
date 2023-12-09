<template>
  <b-modal
    id="modal-recover-password"
    title="Recuperar Senha"
    size="md"
    centered
  >
    <p>Uma nova senha foi enviada para sua conta de e-mail.</p>
    <p>Após receber seu e-mail, faça o login e vá para a página de seu perfil para alterar sua senha</p>
    <template v-slot:modal-footer>
      <button @click="loginPage" class="btn site-btn">OK</button>
    </template>
  </b-modal>
</template>

<script>
export default {
  methods:{
    loginPage(){
      this.$router.push('/login');
    }
  }
}
</script>

<style>

</style>