<template>
  <b-modal
    :id="`productImageModal${id}`"
    size="xl"
    :title="'Imagens'"
    centered
  >
    <div class="productSlider">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        controls
        :interval="0"
      >
        <b-carousel-slide
          v-for="(image, i) in productImgs"
          :key="i"
        >
          <template v-slot:img>
            <img :src="`${imageUrl}/${image}`" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ProductModal',
  data: () => ({
    imageUrl: null,
    productImgs: [],
  }),
  props: ['id', 'images', 'defaultImage'],
  created() {
    this.productImgs.push(this.defaultImage);

    this.images.map(res => {
      this.productImgs.push(res);
    });

    this.imageUrl = process.env.VUE_APP_API_IMAGES;
  },
};
</script>

<style>
.productSlider img {
  width: 100%;
  height: 500px;
}
</style>