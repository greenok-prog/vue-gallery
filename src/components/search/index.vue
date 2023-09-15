

<template>
    <div class="search">
        <div class="container">
            <form class="search__input" @submit="(e) => searchHandler(e)">
                <input placeholder="Поиск" v-model="inputValue" />
                <SearchSvg />
            </form>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchSvg from '../icons/SearchSvg.vue';
import { useImages } from '@/stores/images';
const { fetchImages } = useImages()
const inputValue = ref('')

const searchHandler = async (e: Event) => {
    e.preventDefault()
    if (inputValue.value.length) {
        await fetchImages(inputValue.value, 1)
        inputValue.value = ''
    }
}
</script>

<style lang="scss" src="./index.scss"></style>