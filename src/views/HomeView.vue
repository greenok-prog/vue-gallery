

<template>
  <div ref="main">
    <Search />
    <ImageList :images="images" />
    <a href="#header">
      <ButtonTopSvgVue />
    </a>
  </div>
</template>
<script setup lang="ts">
import Search from '../components/search/index.vue'
import ImageList from '../components/image-list/index.vue';
import ButtonTopSvgVue from '@/components/icons/ButtonTopSvg.vue';

import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { useImages } from '@/stores/images'
import { storeToRefs } from 'pinia';


const { fetchRandomImages, fetchImages } = useImages()
const { images, keyword } = storeToRefs(useImages())

const route = useRoute()
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
const isMainPage = computed(() => {
  return route.fullPath === '/' || route.fullPath === '/#header'
})

onMounted(() => {
  if (!images.value.length) {
    window.onscroll = null
  }

})
onBeforeMount(async () => {
  await fetchRandomImages(page.value)
  if (isMainPage) {
    getNextImages()

  }
})

</script>
