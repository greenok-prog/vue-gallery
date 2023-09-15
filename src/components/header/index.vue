<template>
    <header id="header">
        <div class="container header__container"
            :class="{ 'header__container-full': !isMainPage }">
            <LogoSvg class="header__logo" />
            <div class="header__actions">
                <RouterLink class="header__actions-item" to="/"
                    v-if="!isMainPage">
                    <SearchSvg />
                    <span>Поиск</span>
                </RouterLink>
                <RouterLink class="header__actions-item" to="/favorite">
                    <FavoriteSvg />
                    <span>Избранное</span>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue';
import LogoSvg from '../icons/LogoSvg.vue'
import FavoriteSvg from '../icons/FavoriteSvg.vue'
import SearchSvg from '../icons/SearchSvg.vue';

const route = useRoute()

const isMainPage = computed(() => {
    return route.fullPath === '/' || route.fullPath === '/#header'
})

</script>

<style lang="scss" src="./style.scss"></style>