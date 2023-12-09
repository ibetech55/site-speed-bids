<template>
  <b-modal
    :id="`modalSendUserMessage${userData._id}`"
    centered
    size="lg"
    :title="`Mandar Mensagen para ${userData.firstname} ${userData.lastname}`"
  >
    <div class="user-message-area">
      <textarea v-model="message" class="form-control" cols="30" rows="20"></textarea>
    </div>

    <template v-slot:modal-footer>
      <button @click="closeModal" class="site-btn btn">Cancelar</button>
      <button @click="handleMessage" class="site-btn btn">Mandar</button>
    </template>
  </b-modal>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    props:['userAuth', 'userData'],
    data:()=>({
      message:null
    }),

    methods:{
      ...mapActions('Message', ['messageAdminUser']),

      closeModal(){
        this.$bvModal.hide(`modalSendUserMessage${this.userData._id}`)
      },

      handleMessage(){
        this.messageAdminUser({
        token:this.userAuth.token,
        receiverId:this.userData._id,
        senderId:this.userAuth.userId,
        data:{
              email:this.userData.email,
              message:this.message,
              firstname:this.userData.firstname,
              lastname:this.userData.lastname
        }
      })

      this.closeModal();
      }

    }
}
</script>

<style>

</style>