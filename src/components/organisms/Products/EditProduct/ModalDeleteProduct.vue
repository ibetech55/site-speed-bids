<template>
  <b-modal
    id="ModalDeleteProduct"
    centered
    size="lg"
  >
    <div>
      <h1 class="text-center">Deletar Produto</h1>
      <p class="text-center">Digite o nome <span class="font-weight-bold">{{productName}}</span> para deletar o produto</p>
      <div class="form-group">
        <label for="">Digite o nome do produto:</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
        >
        <p class="text-danger">{{this.error.productName}}</p>
      </div>
    </div>
    <template v-slot:modal-footer>
      <button
        @click="closeModal"
        class="btn btn-secondary btn-lg"
      >Cancelar</button>
      <button
        @click="handleDelete"
        class="btn btn-lg btn-outline-danger"
      >Deletar</button>
    </template>
  </b-modal>
</template>

<script>
import swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
  props: ['productName', 'productId', 'userAuth'],
  name: 'ModalDeleteProduct',
  data: () => ({
    error: {},
    name: null,
  }),

  methods: {
    ...mapActions('Product', ['deleteProduct']),

    closeModal() {
      this.$bvModal.hide('ModalDeleteProduct');
    },

    handleDelete() {
      swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#29303b',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then(async result => {
          if (result.value) {
            await this.deleteProduct({
              id: this.productId,
              token: this.userAuth.token,
              productName: this.name,
            });
            await swal.fire(
              'Deleted!',
              'Your Product has been deleted.',
              'success',
            );
            this.product = null;
            this.error = {};
            this.$router.push('/my-product');
          }
        })
        .catch(err => {
          console.log(err.response.data);
          this.error = err.response.data;
        });
    },
  },
};
</script>

<style>
</style>