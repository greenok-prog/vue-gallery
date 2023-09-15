<template>
    <div class="container">
        <div class="image-list" v-if="images.length">
            <RouterLink class="image-list__item" :to="`/${image.id}`"
                v-for="image in images" :key="image.id">
                <img :src="image.urls.regular"
                    :alt="image.alt_description">
            </RouterLink>
        </div>
        <h3 class="image-list__loader" v-if="loading">
            <LoaderSvg />
        </h3>

        <h3 v-if="!loading && !images.length">Ничего не найдено</h3>
    </div>
</template>

<script lang="ts" setup>
import { useImages } from '@/stores/images';
import { storeToRefs } from 'pinia';
import LoaderSvg from '@/components/icons/LoaderSvg.vue'

defineProps<{
    images: any[]
}>()

const store = useImages()
const { loading } = storeToRefs(store)

</script>

<style lang="scss" src="./index.scss"></style>