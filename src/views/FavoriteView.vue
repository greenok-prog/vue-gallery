<template>
    <div class="favorite">
        <h1>Избранное</h1>
        <ImageList :images="favorite" />
    </div>
</template>
<script lang="ts" setup>
import ImageList from '@/components/image-list/index.vue'

import { useImages } from '@/stores/images';
import { storeToRefs } from 'pinia';

import { onMounted } from 'vue';

const { loadFavoriteFromLocal } = useImages()
const { favorite } = storeToRefs(useImages())

onMounted(() => {
    window.onscroll = null
    loadFavoriteFromLocal()
})
</script>

<style lang="scss">
.favorite {
    h1 {
        text-align: center;
        margin-top: 94px;
        font-size: 72px;

        @media (max-width:600px) {
            font-size: 48px;
        }
    }
}
</style>