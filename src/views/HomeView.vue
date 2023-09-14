

<template>
  <main>
    <Search />
    <ImageList :images="images" />
  </main>
</template>
<script setup lang="ts">
import Search from '../components/search/index.vue'
import ImageList from '../components/image-list/index.vue';

import { onMounted } from 'vue';
import { useImages } from '@/stores/images'
import { storeToRefs } from 'pinia';
const { fetchRandomImages } = useImages()
const { images } = storeToRefs(useImages())

onMounted(async () => {
  await fetchRandomImages()
})

</script>
