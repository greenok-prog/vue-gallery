<template>
    <div class="container">
        <div class="image-list" v-if="images.length">
            <RouterLink class="image-list__item" :to="`/${image.id}`"
                v-for="image in images" :key="image.id">
                <img loading="lazy" :src="image.urls.small"
                    :alt="image.alt_description">
            </RouterLink>

        </div>
        <h3 v-else>Ничего не найдено</h3>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    images: any[]
}>()

</script>

<style lang="scss" src="./index.scss"></style>