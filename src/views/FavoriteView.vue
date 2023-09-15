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
    loadFavoriteFromLocal()
})
</script>

<style lang="scss">
.favorite {

    h1 {
        text-align: center;
        margin-top: 94px;
        font-size: 72px;
    }
}
</style>