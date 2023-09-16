

<template>
    <div class="search">
        <div class="container">
            <form class="search__input" @submit="(e) => searchHandler(e)">
                <input placeholder="Поиск" v-model="inputValue" />
                <SearchSvg @click="e => searchHandler(e)" />
            </form>
        </div>

    </div>
</template>

<script lang="ts" setup>
import SearchSvg from '@/components/icons/SearchSvg.vue';
import { ref } from 'vue';
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