<template>
  <div>
      <h1 class="text-center mb-3">Live</h1>
    <div v-if="winner" class="winner-info border my-3 p-3">
        <h3 class="text-center">{{buyer.winner.username}} ganhou a licitação R${{buyer.currentPrice}}</h3>
        <div v-if="userAuth.userId === buyer.winner._id" class="btn-div text-center mt-4">
            <button @click="checkout" class="site-btn btn btn-lg">Ir Para Checkout</button>
        </div>
    </div>
    <div v-if="timerDiv" class="timer">
        <p>{{ formatMinutes(timeLeft) }}</p>
    </div>
    <div class="chat-section">
        <div class="product-chat border">
            <h2 class="text-center mt-2">Produto</h2>
                <div class="pc-img-div">
                    <img :src="`${imageUrl}/${buyer.product.image.defaultImage}`" alt="">
                </div>
            <div class="pc-info">
                <p><span>Nome do Produto:</span> {{buyer.product.productName}}</p>
                <p><span>Vendador:</span> {{buyer.owner.username}}</p>
                <p><span>Preço:</span> R${{buyer.product.price}}</p>
                <p><span>Lance Atual:</span> R${{buyer.currentPrice}}</p>
                <p><span>Ultimo Licitante:</span> {{!buyer.winner ? '' : buyer.winner.username}}</p>
                <p><span>Numero de Licitantes:</span> {{buyer.liveBidders.length}}</p>
            </div>
        </div>
        <div class="chatForm border">
          <div class="messages border mb-3">
                <p v-for="(message, i) in messages" :key="i" :class="userAuth.userId === message.userId ? 'myBid' : 'otherBid'"><span>{{message.username}}:</span> {{message.info}}</p>
          </div>
          <div class="btn-div" v-if="buyer.owner._id !== userAuth.userId">
              <textarea v-model="bidInput" class="form-control mb-2"></textarea>
              <p class="text-danger">{{error}}</p>
              <button @click="handleBid" class="site-btn btn btn-block b-button">Lance um Preço</button>
          </div>
      </div>
    </div>
      
  </div>
</template>

<script>
// import io from 'socket.io-client'
import moment from 'moment';
import {mapActions, mapState} from 'vuex';
export default {
    data:()=>({
        socket:null,
        userAuth:null,
        messages:[],
        bidInput:null,
        buyerId:null,
        imageUrl:null,
        error:null,
        timer:null,
        winner:false,
        timeLimit: null,
        timePassed: 0,
        loading:null,
        timerDiv:true,
        timeNow:null,
        bidEndTime:null,
        socketUrl:null
    }),

    computed:{
        ...mapState('Buyer', ['buyer', 'bidTimestamp']),
        ...mapState('Purchase', ['session']),
        timeLeft() {
        return this.timeLimit - this.timePassed
    }
    },

    watch:{
        messages: async function(){
            await this.getBuyer({
            token:this.userAuth.token,
            buyerId:this.buyerId
        })
        },

        winner: async function(){
            if(this.userAuth.userId == this.buyer.winner._id){
                await this.updatePurchaseLive({
                token:this.userAuth.token,
                data:{
                    buyerId:this.buyer._id,                   
                }
                })
            }
        }
    },

    methods:{
        ...mapActions('Buyer', ['getBuyer', 'bidderTimestamp']),
        ...mapActions('Purchase', ['updatePurchaseLive']),

        finshedBid(){
            this.winner = true;
            let timer = document.querySelector('.timer');
            let btn = document.querySelector('.b-button');
            timer.style.display = "none"
            btn.disabled = true;

            // if(this.userAuth.userId === this.buyer.winner._id)
            // {
            //     await this.updatePurchaseLive({
            //         token:this.userAuth.token,
            //         data:{
            //             buyerId:this.buyer._id,                   
            //         }
            //     })
            // }
 
        },

        formatMinutes(time){

            let formattedTime = moment(time).startOf('day').seconds(time).format('mm:ss')
            if(formattedTime === '00:00'){
                if(!this.loading){
                   this.finshedBid();
                }
            }

            else{
                return formattedTime
            }
        },
          startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

    handleBid(){
        this.socket.emit('bid', {price:this.bidInput, bidId:this.buyerId, userId:this.userAuth.userId, username:this.userAuth.username});
        this.bidInput = null;
        this.error = null;
    },

    handleTime(){
        const userEnterRoom = new Date(this.bidTimestamp.timeEntered).getTime();
        const bidEndTime = new Date(this.buyer.times.endTime).getTime();
        this.timeLimit = (bidEndTime-userEnterRoom)/1000;
    },

    checkout() {

      this.$router.push({
        name: 'checkout',
        params: { purchaseData: this.session },
      });
    },
    },

    async created(){
        this.loading = true;
        this.userAuth = JSON.parse(localStorage.getItem("_speedbids"));

        this.imageUrl = process.env.VUE_APP_API_IMAGES;
        this.buyerId = this.$route.params.liveId
        await this.getBuyer({
            token:this.userAuth.token,
            buyerId:this.buyerId
        })


        if(!this.buyer.liveStatus){
            this.$router.push("/live-bids")
        }

        await this.bidderTimestamp({
            token:this.userAuth.token,
            buyerId:this.buyer._id,
            entering:false
        })

        await this.bidderTimestamp({
            token:this.userAuth.token,
            buyerId:this.buyer._id,
            entering:true
        })

        this.handleTime();
        this.startTimer();

        if(process.env.NODE_ENV == 'production'){
            this.socket = window.io.connect('https://speedbuyerapi.herokuapp.com');
        }

        else{
            this.socket = window.io.connect(process.env.VUE_APP_API_SOCKET);
        }

        this.socket.emit("loggedIn", {bidId:this.buyerId, firstname:this.userAuth.firstname, lastname:this.userAuth.lastname, userId:this.userAuth.userId, username:this.userAuth.username})
        this.socket.on("logInMessage", (data)=>{
        this.messages.push(data);
        })

        this.socket.on("timer", (data)=>{
            this.timer = data;
        })

        this.socket.on('error', (data)=>{
            this.error = data.error;
        })

        this.socket.on('bid2', (data)=>{
            this.messages.push(data);
        })

        this.loading = false;
    },

    async beforeDestroy(){
        await this.bidderTimestamp({
            token:this.userAuth.token,
            buyerId:this.buyer._id,
            entering:false
        })
        await this.socket.emit("closeSocket", 'Closing Socket')
    },
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

.timer{
    text-align: center;
}

.timer p{
    font-size: 30px;
    border-radius: 10px;
    font-weight: 100;
    width: 100px;
    margin:0 auto 10px auto;
}
</style>