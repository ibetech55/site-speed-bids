<template>
  <div>
      <Navbar2 />
      <h1 class="mt-4 text-center">Recuperar Senha</h1>
      <div class="rs-form border p-3 mt-5">
          <div class="rs-form-img">
              <img src="../../assets/logo.jpg" alt="">
          </div>
          <div class="form-group mt-5">
              <label for="rs-email">Digite Seu Email</label>
              <input type="text" id="rs-email" class="form-control" v-model="email">
              <p class="text-danger">{{this.error}}</p>
          </div>
          <div class="rs-btn-div">
              <button class="btn site-btn" @click="handleSubmit">Submit</button>
          </div>
      </div>
      <modalRecoverPassword />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Navbar2 from "../template/Navbar2";
import modalRecoverPassword from '../pages/Modal-Recover-Password'
export default {
    components:{
        Navbar2,
        modalRecoverPassword,
    },

    computed:{
        ...mapState('Auth', ['recoverPass']),
    },

    data:()=>({
        typeCode:null,
        error:null,
        email:null,
    }),

    methods:{
        ...mapActions('Auth', ['recoverPassword']),
        async handleSubmit(){
            try{
                await this.recoverPassword({email:this.email})

                if(this.recoverPass.success){
                    this.$bvModal.show('modal-recover-password')
                }
            } catch(error){
                this.error = error.response.data.error;
            }
        }
    },
}
</script>

<style>
.rs-form{
    width:20%;
    margin:0 auto;
}

.rs-btn-div{
    text-align: center;
}

.rs-form-img{
    width:100px;
    height:100px;
    margin:0 auto;
}

.rs-form-img img{
    height:100%;
    width:100%;
}

@media(max-width:1000px){
    .rs-form{
        width:95%;
    }
}
</style>