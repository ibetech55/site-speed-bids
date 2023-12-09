<template>
  <div class="editProduct">
    <div class="prdEditForm border">
      <h1 class="text-center">Editar Produto</h1>
      <div class="form-group">
        <label for="">Nome do Produto</label>
        <input
          type="text"
          class="form-control"
          v-model="product.productName"
        >
      </div>

      <div class="form-group">
        <label for="">Preço</label>
        <input
          type="text"
          class="form-control"
          v-model="product.price"
        >
      </div>

      <div class="form-group">
        <label for="">Categoria</label>
        <select
          class="form-control"
          v-model="product.category"
        >
          <option value=""></option>
          <option value="automobiles">Automóveis</option>
          <option value="houses">Casas</option>
          <option value="electronics">Eletrônicos</option>
          <option value="sports">Esportes</option>
          <option value="music">Musicas</option>
          <option value="outhers">Outras</option>
        </select>
      </div>

      <div class="form-group">
        <label for="">Descrição</label>
        <textarea
          class="form-control"
          v-model="product.description"
        ></textarea>
      </div>

      <div
        class="btn-edit-prd-div form-group text-center m-0"
        v-if="product.active"
      >
        <button
          v-b-modal.ModalDeleteProduct
          class="btn btn-outline-danger btn-lg"
        >Deletar</button>
        <button
          @click="handleEditProduct"
          class="site-btn btn btn-lg"
        >Editar</button>
      </div>
      <ModalDeleteProduct
        :productName="product.productName"
        :productId="product._id"
        :userAuth="userAuth"
      />
    </div>

    <div class="editImagesDiv">
      <div
        class="editImagesDiv2"
        :key="i"
      >
        <div class="editImageImg">
          <img
            :src="`${imageUrl}/${product.image.defaultImage}`"
            alt=""
          >
        </div>
        <div class="imageOptions">
          <button
            v-if="!defaultImageFile"
            @click="defaultImageFile = true"
            class="site-btn btn btn-lg"
          >Substituir imagem padrão</button>
          <div v-if="defaultImageFile">
            <input
              type="file"
              @change="defaultFileChange"
            >
            <div>
              <button
                @click="defaultImageFile = false"
                class="site-btn btn btn-lg mt-3"
              >Cancelar</button>
              <button
                @click="handleDefaultImg(product.image.defaultImage)"
                class="site-btn btn btn-lg mt-3 ml-3"
              >Salvar</button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="editImagesDiv2 border"
        v-for="(productImage, i) in product.image.productImages"
        :key="i"
      >
        <div class="editImageImg">
          <img
            :src="`${imageUrl}/${productImage}`"
            alt=""
          >
        </div>
        <div class="imageOptions">
          <span
            class="deleteSpan"
            @click="handleDeleteImg(productImage)"
          >
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      </div>
      <div
        class="addImageDiv border"
        v-if="product.active"
      >
        <div @click="addImage">
          <i class="fas fa-plus "></i>
          <p
            style="font-size:20px;"
            class="m-0 text-center"
          >Adicionar Imagen</p>
        </div>

        <p style="font-size:20px;">{{addedImageName}}</p>
        <p
          class="text-danger text-center"
          style="font-size:20px;"
        >{{this.error.image}}</p>
        <button
          @click="saveImage"
          class="site-btn btn btn-lg"
          v-if="!hideAddImage"
        >Salavr Imagen</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import swal from 'sweetalert2';
import ModalDeleteProduct from './ModalDeleteProduct';

export default {
  data: () => ({
    userAuth: null,
    id: null,
    imageUrl: null,
    defaultImageFile: false,
    selectedDefaultFile: null,
    hideAddImage: true,
    addedImage: null,
    addedImageName: null,
    error: {},
  }),

  components: {
    ModalDeleteProduct,
  },

  computed: {
    ...mapFields('Product', ['product']),
  },

  methods: {
    ...mapActions('Product', [
      'getProduct',
      'updateProduct',
      'deleteImage',
      'updateDefaultImg',
      'addMoreProductImage',
    ]),

    async saveImage() {
      try {
        await this.addMoreProductImage({
          token: this.userAuth.token,
          id: this.product._id,
          image: this.addedImage,
        });

        this.error = {};
        this.addedImageName = null;
        this.addedImage = null;
        this.hideAddImage = true;
      } catch (err) {
        console.log(err.response);
        this.error = err.response.data;
        this.hideAddImage = true;
      }
    },

    addImage() {
      var input = document.createElement('input');
      input.type = 'file';

      input.onchange = e => {
        this.addedImage = e.target.files[0];
        this.addedImageName = e.target.files[0].name;
        this.hideAddImage = false;
      };

      input.click();
    },

    defaultFileChange(e) {
      this.selectedDefaultFile = e.target.files[0];
    },

    async handleDefaultImg(image) {
      try {
        await this.updateDefaultImg({
          id: this.product._id,
          token: this.userAuth.token,
          defaultImage: image,
          newDefaultImage: this.selectedDefaultFile,
        });

        this.defaultImageFile = await false;

        await swal.fire('Default Image Updated', '', 'success');
      } catch (err) {
        this.error = err.response.data;
        swal.fire(this.error.image, '', 'warning');
      }
    },

    async handleDeleteImg(imageName) {
      await this.deleteImage({
        id: this.id,
        token: this.userAuth.token,
        imageName,
      });

      await swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        })
        .then(async result => {
          if (result.value) {
            await swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success',
            );
            await this.getProduct({ id: this.id, token: this.userAuth.token });
          }
        });
    },

    async handleEditProduct() {
      try {
        await this.updateProduct({
          id: this.product._id,
          token: this.userAuth.token,
        });

        await swal.fire('Product Successively updated', 'Updated', 'success');

        await this.getProduct({ id: this.id, token: this.userAuth.token });
      } catch (err) {
        console.log(err);
      }
    },
  },

  async created() {
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.id = this.$route.params.id;
    await this.getProduct({
      id: this.id,
      token: this.userAuth.token,
      url: this.$route.name,
    });
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
  },
};
</script>

<style scoped>
.btn-edit-prd-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prdEditForm {
  margin: 0 auto;
  width: 50%;
  padding: 20px;
}

.editImagesDiv {
  width: 100%;
  margin-top: 20px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, 20%);
  grid-gap: 1em;
}

.editImageImg {
  width: 100%;
  height: 300px;
}

.editImageImg img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
}

.imageOptions {
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editImagesDiv2 {
  padding: 1px;
  border: 1px solid #dee2e6;
}

.addImageDiv {
  width: 350px;
  height: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 150px;
  font-weight: 100;
}

.addImageDiv div:hover {
  cursor: pointer;
}

.deleteSpan {
  color: red;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
}

.deleteSpan:hover{
  cursor: pointer;
  background:red;
  color: #fff;
}
</style>