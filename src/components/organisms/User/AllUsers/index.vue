<template>
  <div>
      <h1 class="text-center mb-3">Todos os Usuário</h1>
      <div class="mb-3">
        <label for="">Filtro:</label>
        <div class="form-inline">
          <input @keydown="handleUserFilter" v-model="filter" type="text" class="form-control">
        </div>
      </div>
      <div v-if="loading">
        <h1>Carregando...</h1>
      </div>
      <b-table
      v-if="!loading"
      striped
      :fields="fields"
      :items="users"
      responsive
      >
        <template v-slot:cell(nome)="row">
          <span class="align-middle">{{row.item.firstname}} {{row.item.lastname}}</span>
        </template>

        <template v-slot:cell(active)="row">
          <span class="align-middle">{{row.item.active ? 'Ativo' : 'Desativado' }}</span>
        </template>

        <template v-slot:cell(options)="row">
          <button class="site-btn btn mr-3" v-b-modal="`modalAllUsers${row.item._id}`">Detalhes</button>
          <ModalAllUsers :userData="row.item" :userAuth="userAuth"/>
          <button v-b-modal="`modalSendUserMessage${row.item._id}`" class="site-btn btn">Mensagen</button>
          <ModalSendUserMessage :userData="row.item" :userAuth="userAuth" />
        </template>
      </b-table>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ModalAllUsers from './ModalAllUsers'
import ModalSendUserMessage from './ModalSendUserMessage'

export default {
  data:()=>({
    fields:[
      {key:'nome', label:'Nome', sortable:true},
      {key:'username', label:'Usuário', sortable:true},
      {key:'email', label:'Email', sortable:true},
      {key:'cpf', label:'CPF'},
      {key:'active', label:'Status', sortable:true},
      {key:'options', label:'Opções'}
    ],
    filter:null,
    userAuth:null,
    loading:false
  }),

  components:{
    ModalAllUsers,
    ModalSendUserMessage
  },

  computed:{
    ...mapState('User', ['users']),
  },

  methods:{
    ...mapActions('User', ['getUsers']),
    async handleUserFilter(){
      this.loading = true;
      setTimeout(()=>{
        this.getUsers({
          filter:this.filter
        })
      }, 500)
      this.loading = false;
    }
  },

  async created(){
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'))
    this.loading = true;
          await this.getUsers({
        userFilter:this.userFilter
      })
      this.loading = false
  }
}
</script>

<style>

</style>