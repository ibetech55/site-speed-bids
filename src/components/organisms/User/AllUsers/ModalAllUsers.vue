<template>
  <b-modal 
    :id="`modalAllUsers${userData._id}`"
    size="xl"
    :title="`Dados de ${userData.firstname} ${userData.lastname}`"
    centered
  >
      <div>
          <div class="all-user-form row">
              <div class="form-group col-4">
                    <label for="">Primeiro Nome</label>
                    <input readonly :type="text" v-model="form.firstname" class="form-control">
              </div>

             <div class="form-group col-4">
                    <label for="">Sobre Nome</label>
                    <input readonly :type="text" v-model="form.lastname" class="form-control">
              </div>

                <div class="form-group col-4">
                    <label for="">Usuário</label>
                    <input readonly :type="text" v-model="form.username" class="form-control">
              </div>

                <div class="form-group col-4">
                    <label for="">Email</label>
                    <input readonly :type="text" v-model="form.email" class="form-control">
              </div>

                <div class="form-group col-4">
                    <label for="">CPF</label>
                    <input readonly :type="text" v-model="form.cpf" class="form-control">
              </div>

              <div class="col-12 row">
                <div class="form-group col-4">
                    <label for="">Cidade</label>
                    <input readonly :type="text" v-model="form.city" class="form-control">
                </div>

                <div class="form-group col-4">
                    <label for="">Estado</label>
                    <input readonly :type="text" v-model="form.state" class="form-control">
                </div>

                <div class="form-group col-4">
                    <label for="">País</label>
                    <input readonly :type="text" v-model="form.country" class="form-control">
              </div>

              <div class="col-12">
                  <p><span class="font-weight-bold">Status:</span> {{userData.active ? 'Ativo' : 'Desativado'}}</p>
              </div>
              </div>
          </div>
      </div>

    <template v-slot:modal-footer>
        <button  @click="handleStatus" class="btn btn-outline-danger mr-3">Disabilitar Usuário</button>
        <button  @click="handlePurchase" class="site-btn btn mr-3">Compras</button>
        <button  @click="closeModal" class="site-btn btn">Ok</button>
    </template>
  </b-modal>
</template>

<script>
import {mapActions} from 'vuex';

export default {
        props:['userData', 'userAuth'],
    data:()=>({
        form:{
            firstname:null,
            lastname:null,
            username:null,
            email:null,
            cpf:null,
            city:null,
            state:null,
            country:null
        }
    }),

    methods:{
        ...mapActions('User', ['userStatus', 'getUsers']),

        closeModal() {
            this.$bvModal.hide(`modalAllUsers${this.userData._id}`);
        },
        handlePurchase(){
            this.$router.push(`/admin/purchases/${this.userData._id}`)
        },

        async handleStatus(){
            await this.userStatus({
                userId:this.userData._id,
                status:this.userData.active,
                token:this.userAuth.token
            })

            await this.getUsers({filter:null})
        }
    },

    created(){
        this.form.firstname = this.userData.firstname
        this.form.username = this.userData.username
        this.form.lastname = this.userData.lastname
        this.form.email = this.userData.email
        this.form.cpf = this.userData.cpf
        this.form.city = this.userData.address.city
        this.form.state = this.userData.address.state
        this.form.country = this.userData.address.country
    },


}
</script>

<style scoped>
input:read-only{
    background-color: #fff;
}

</style>