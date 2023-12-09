<template>
  <div>
    <b-modal
      id="ModalChangePassword"
      title="Change Password"
      centered
      size="lg"
    >
      <div class="form-group">
        <label for="">Senha Atual:</label>
        <input
          type="password"
          class="form-control"
          v-model="currentPassword"
        >
        <p class="text-danger">{{error.currentPassword}}</p>
      </div>

      <div class="form-group">
        <label for="">Nova Senha:</label>
        <input
          type="password"
          class="form-control"
          v-model="newPassword"
        >
        <p class="text-danger">{{error.password}}</p>
      </div>

      <div class="form-group">
        <label for="">Confirmar Senha:</label>
        <input
          type="password"
          class="form-control"
          v-model="confirmPassword"
        >
        <p class="text-danger">{{error.password}}</p>
      </div>

      <template v-slot:modal-footer>
        <button
          class="btn btn-lg btn-secondary"
          @click="closeModal"
        >
          Cancelar
        </button>
        <button
          class="site-btn btn btn-lg"
          @click="handlePassword"
        >
          Salvar
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import swal from 'sweetalert2';

export default {
  props: ['userAuth'],

  data: () => ({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
    error: {},
  }),

  methods: {
    ...mapActions('Auth', ['updatePassword']),

    async handlePassword() {
      try {
        await this.updatePassword({
          token: this.userAuth.token,
          id: this.userAuth.userId,
          data: {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          },
        });

        await swal.fire('Password Updated', '', 'success');
        await this.$bvModal.hide('ModalChangePassword');
        this.confirmPassword = null;
        this.newPassword = null;
        this.currentPassword = null;
        this.error = {};
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
      }
    },

    closeModal() {
      this.$bvModal.hide('ModalChangePassword');
    },
  },
};
</script>

<style>
label {
  font-weight: bold;
}
</style>