

<template>
  <main>
    <Search />
    <ImageList :images="images" />
    <a href="#header">
      <ButtonTopSvgVue />
    </a>
  </main>
</template>
<script setup lang="ts">
import Search from '../components/search/index.vue'
import ImageList from '../components/image-list/index.vue';

import { onBeforeMount, onMounted, ref } from 'vue';
import { useImages } from '@/stores/images'
import { storeToRefs } from 'pinia';
import ButtonTopSvgVue from '@/components/icons/ButtonTopSvg.vue';
const { fetchRandomImages, fetchImages } = useImages()
const { images, keyword } = storeToRefs(useImages())
const page = ref(1)
const getNextImages = () => {
  window.onscroll = async () => {
    let bottomWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight
    if (bottomWindow) {
      page.value += 1
      if (!keyword.value) {
        await fetchRandomImages(page.value)
      } else {
        if (keyword.value) {
          await fetchImages(keyword.value, page.value)
        }
      }
    }
  }
}
onMounted(() => {
  getNextImages()
})
onBeforeMount(async () => {
  await fetchRandomImages(page.value)
})

</script>
