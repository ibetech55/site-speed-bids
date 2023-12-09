<template>
  <div>
      <h1 class="text-center mb-3">Mandar Mensagem Para {{user.username}}</h1>
    <div class="chat-section" v-if="loading">
        <div class="chatForm border">
          <div class="messages border mb-3">
                <p v-for="(message, i) in messages" :key="i" :class="userAuth.userId === message.sender._id ? 'myBid' : 'otherBid'">
                    <span>{{message.sender.username}}:</span> {{message.text}}
                </p>
          </div>
          <div class="btn-div">
              <textarea v-model="myMessage" class="form-control mb-2"></textarea>
              <button  @click="handleMessage" class="site-btn btn btn-block b-button">Mandar Mensagen</button>
          </div>
      </div>
    </div>
      
  </div>
</template>

<script>
// import io from 'socket.io-client'
import {mapActions, mapState} from 'vuex';

export default {
    data:()=>({
        userAuth:null,
        recieverId:null,
        socket:null,
        myMessage:null,
        loading:null,
    }),

    computed:{
        ...mapState('User', ['user']),
        ...mapState('Message', ['messages'])

    },

    methods:{
        ...mapActions('User', ['getUser']),
        ...mapActions('Message', ['getMessages']),

        handleMessage(){
            this.socket.emit('private_chat', {
                receiver:{id:this.user._id, username:this.user.username},
                sender:{id:this.userAuth.userId, username:this.userAuth.username},
                message:this.myMessage
            });

            this.myMessage = null;
        },
    },

    async created(){
        console.log(window)
        this.loading = false;
        this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
        this.recieverId = this.$route.params.id;
        await this.getUser({id:this.$route.params.id})
        await this.getMessages({
            token:this.userAuth.token,
            senderId:this.userAuth.userId,
            receiverId:this.user._id
        })

        if(process.env.NODE_ENV == 'production'){
            this.socket = window.io.connect('https://speedbuyerapi.herokuapp.com');
        }

        else{
             this.socket = window.io.connect(process.env.VUE_APP_API_SOCKET)
        }

        this.socket.emit('register', this.userAuth.username)
        this.socket.on('message-sent', async (data)=>{

            console.log(data)
            console.log((this.user._id === data.receiver && this.userAuth.userId === data.sender) || 
            (this.user._id === data.sender && this.userAuth.userId === data.receiver))

            if((this.user._id === data.receiver && this.userAuth.userId === data.sender) || 
            (this.user._id === data.sender && this.userAuth.userId === data.receiver)){
                            await this.getMessages({
                token:this.userAuth.token,
                senderId:this.userAuth.userId,
                receiverId:this.user._id
            })
            }

        })
        this.loading = true;
                // await this.getUser({id:this.$route.params.id})


    }

}
</script>

<style scoped>
.chatForm{
    width:50%;
    margin:0 auto;
    padding: 10px;
}

.messages{
    height: 500px;
    padding: 10px;
    overflow-y: scroll;
}

.myBid{
    margin:0;
    text-align: right;
}

.otherBid{
    margin:0;
    text-align: left;
}

span{
    font-weight: bold;
}

.chat-section{
    display: flex;
    justify-content: center;
}

.product-chat{
    width: 50%;
    height: 555px;
    margin-right: 20px;
}

.pc-img-div{
    margin:0 auto;
    width: 40%;
    height: 250px;
    background: gray;
}

.pc-img-div img{
    width: 100%;
    height: 100%;
}

h2{
    font-weight: 100;
}

span{
    font-weight: bold;
}

.pc-info{
    padding-left:30%;
    padding-top:10px;
}
</style>