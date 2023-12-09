<template>
  <div class="addProduct">
    <div class="productForm border p-4">
      <h1 class=text-center>Adicionar Produto</h1>
      <div class="form-group">
        <label for="">Nome</label>
        <input
          type="text"
          class="form-control"
          v-model="form.productName"
        >
        <p class="text-danger">{{this.error.productName}}</p>
      </div>

      <div class="form-group">
        <label for="">Preço</label>
        <input
          type="text"
          class="form-control"
          v-model="form.price"
        >
        <p class="text-danger">{{this.error.price}}</p>
      </div>

      <div class="form-group">
        <label for="">Categoria</label>
        <select
          class="form-control"
          v-model="form.category"
        >
          <option value=""></option>
          <option value="automobiles">Automóveis</option>
          <option value="houses">Casas</option>
          <option value="electronics">Eletrônicos</option>
          <option value="sports">Esportes</option>
          <option value="music">Música</option>
          <option value="outhers">Outros</option>
        </select>
        <p class="text-danger">{{this.error.category}}</p>
      </div>

      <div class="timeSection">
        <label for="example-datepicker">Escolher um data e hora</label>
        <div class="timeSection2">
          <div class="mr-3">
            <b-form-datepicker
              id="example-datepicker"
              v-model="form.endDate"
            ></b-form-datepicker>
            <p class="text-danger">{{this.error.endDate}}</p>
          </div>

          <div>
            <b-form-timepicker
              locale="en"
              v-model="form.endTime"
            ></b-form-timepicker>
              <p class="text-danger">{{this.error.endTime}}</p>
          </div>
        </div>
      </div>

      <div class="form-group mt-4">
        <label for="">Tipo da Lance</label>
        <select
          class="form-control"
          v-model="form.bidType"
        >
          <option value="Standard">Padrão</option>
          <option value="Live">Live</option>
        </select>
          <p class="text-danger">{{this.error.bidType}}</p>
      </div>

      <div class="form-group mt-4">
        <label for="">Descrição</label>
        <textarea
          type="text"
          class="form-control"
          v-model="form.description"
        ></textarea>
        <p class="text-danger">{{this.error.description}}</p>
      </div>

      <p class="text-center text-danger mb-0">{{this.error.images}}</p>
      <div class="form-group">
        <label for="">Default Imagen</label>
        <input
          class="d-block"
          type="file"
          @change="selectImage"
        >
      </div>

      <div
        class="form-group"
        id="moreImages"
      >
        <div
          id="imgDiv"
          class="form-group"
          v-for="i in images"
          :key='i'
        >
          <label
            class="d-block"
            for=""
          >Adicionar Imagens</label>
          <input
            type="file"
            @change="selectImages"
          >
          <span
            class="addSpan"
            @click="addImage"
          >
            <i class="fas fa-plus"></i>
          </span>
          <span
            class="deleteSpan"
            @click="deleteImage(i)"
          >
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      </div>
      <div class="form-group text-center mt-5 mb-0">
        <button
          @click="saveProduct"
          class="site-btn btn btn-lg"
        >Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import swal from 'sweetalert2';

export default {
  data() {
    return {
      images: ['image1'],
      form: {
        productName: null,
        price: null,
        category: null,
        description: null,
        user: null,
        image: { defaultImage: null, productImages: [] },
        endDate: null,
        endTime: null,
        bidType: null,
      },
      error: {},
      userAuth: null,
      defaultImage: null,
      productImages: [],
    };
  },

  methods: {
    ...mapActions('Product', ['storeProduct']),

    selectImages(e) {
      this.form.image.productImages.push(e.target.files[0]);
    },

    selectImage(e) {
      this.form.image.defaultImage = e.target.files[0];
    },

    makeid: function(length) {
      var result = '';
      var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    },

    addImage() {
      if (this.images.length < 5) {
        this.images.push(this.makeid(4));
      } else {
        alert('Limit');
      }
    },

    deleteImage(i) {
      if (this.images.length > 1) {
        let indx = this.images.indexOf(i);
        this.images = this.images.filter(res => res !== i);
        this.form.image.productImages = this.form.image.productImages.splice(
          indx,
          1,
        );
      }
    },

    async saveProduct() {
      try {
        const obj = {
          data: this.form,
          token: this.userAuth.token,
        };
        await this.storeProduct(obj);
        await swal.fire(
          'Produto Cadastrado',
          'Novo produto foi cadastrado!',
          'success',
        );
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response.data;
      }
    },
  },

  created() {
    if (!localStorage.getItem('_speedbids')) {
      this.$router.push('/');
    }

    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.form.user = this.userAuth.userId;
  },
};
</script>

<style scoped>
.productForm {
  width: 45%;
  margin: 0 auto;
}

.addSpan {
  padding: 10px;
  border-radius: 10%;
  border: 1px solid var(--primaryColor);
  color: var(--primaryColor);
}

.addSpan:hover {
  background: var(--primaryColor);
  cursor: pointer;
  color: #fff;
}

.deleteSpan {
  padding: 10px;
  border-radius: 10%;
  border: 1px solid red;
  color: red;
  margin-left: 10px;
}

.deleteSpan:hover {
  background: red;
  cursor: pointer;
  color: #fff;
}

.timeSection2 {
  display: flex;
  align-items: center;
}

@media (max-width: 1000px) {
  .productForm {
    width: 100%;
  }

  .menu {
    display: none;
  }
}
</style>