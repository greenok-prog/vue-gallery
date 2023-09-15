<template>
    <div class="photo-block" v-if="currentImage">
        <img :src="currentImage.urls.regular" class="photo-block__bg"
            alt="">
        <PhotoHeader :photo="currentImage" />
        <div class="container">
            <div class="photo-block__image">
                <img loading="lazy" :src="currentImage.urls.regular" />
                <MaximizeSvgVue class="photo-block__max" />
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import PhotoHeader from '@/components/photo-header/index.vue'
import MaximizeSvgVue from '@/components/icons/MaximizeSvg.vue';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useImages } from '@/stores/images'


const { fetchImage } = useImages()
const { currentImage } = storeToRefs(useImages())
const router = useRoute()

onMounted(async () => {
    // @ts-ignore
    await fetchImage(router.params.id)
    console.log(currentImage.value);

})
</script>

<style lang="scss" src="./index.scss"></style>