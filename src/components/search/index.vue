

<template>
    <div class="search">
        <div class="container">
            <div class="search__input">
                <input placeholder="Поиск" v-model="inputValue" />
                <SearchSvg @click="searchHandler" />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchSvg from '../icons/SearchSvg.vue';
import { useImages } from '@/stores/images';
const { fetchImages } = useImages()
const inputValue = ref('')

const searchHandler = async () => {
    if (inputValue.value.length) {
        await fetchImages(inputValue.value)
        inputValue.value = ''
    }
}
</script>

<style lang="scss" src="./index.scss"></style>