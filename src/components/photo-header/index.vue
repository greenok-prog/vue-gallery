<template>
    <div class="container">
        <div class="photo-header">
            <div class="photo-header__user">
                <img class="photo-header__user-avatar"
                    :src="photo.user.profile_image.small" />
                <div class="photo-header__user-info">
                    <h3 class="photo-header__user-name">{{
                        photo.user.name }}
                    </h3>
                    <p>@{{ photo.user.username }}</p>
                </div>
            </div>
            <div class="photo-header__actions">
                <button @click="favoriteHandler"
                    class="photo-header__actions-fav"
                    :class="{ 'photo-header__actions-fav_active': isFavorite }">
                    <FavoriteSvg />
                </button>
                <button :disabled="isLoading" @click="downloadHanlder()"
                    class="photo-header__actions-download">
                    <DownloadSvg />
                    <span>Downloand</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import FavoriteSvg from '../icons/FavoriteSvg.vue';
import DownloadSvg from '@/components/icons/DownloadSvg.vue'
import { useImages } from '@/stores/images';
import { storeToRefs } from 'pinia';
import axios from 'axios';
const props = defineProps<{
    photo: any
}>()
const isFavorite = ref(false)
const downloadUrl = ref('')
const { addToFavorite, removeFromFavorite } = useImages()
const { favorite } = storeToRefs(useImages())
const isLoading = ref(false)

const favoriteHandler = () => {
    if (isFavorite.value) {
        removeFromFavorite(props.photo.id)
        isFavorite.value = false
    } else {
        addToFavorite(props.photo)
        isFavorite.value = true
    }
}
const downloadHanlder = async () => {
    isLoading.value = true
    const response = await fetch(downloadUrl.value);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = props.photo.slug;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
    isLoading.value = false
}

onMounted(async () => {
    if (favorite.value.length) {
        const img = favorite.value.find(el => el.id === props.photo.id)
        if (img.id) {
            isFavorite.value = true
        } else {
            isFavorite.value = false
        }
    } else {
        isFavorite.value = false
    }
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/photos/${props.photo.id}/download/?client_id=${import.meta.env.VITE_API_KEY}`)
    downloadUrl.value = data.url

})

</script>

<style lang="scss" src="./index.scss"></style>