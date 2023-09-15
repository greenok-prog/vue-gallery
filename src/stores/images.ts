import { defineStore } from "pinia";
import axios from 'axios';

export const useImages = defineStore('images', {
    state:() => {
        return {
            favorite:[] as any[],
            images:[] as any[],
            currentImage:null as any
        }
    },
    actions:{
        async fetchRandomImages(){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/photos/random?count=8&client_id=${import.meta.env.VITE_API_KEY}`)
            this.images = data
        },
        async fetchImages(keyword:string){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/search/photos?query=${keyword}&per_page=8&client_id=${import.meta.env.VITE_API_KEY}`)
            this.images = data.results
            
        },
        async fetchImage(id:string){
            if(this.currentImage){
                this.currentImage = null
            }
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/photos/${id}?client_id=${import.meta.env.VITE_API_KEY}`)
            this.currentImage = data
        },
        addToFavorite(img:any){
            this.favorite.push(img)
            localStorage.setItem('favorite', JSON.stringify(this.favorite))
        },
        removeFromFavorite(id:string){
            this.favorite = this.favorite.filter((image) => image.id !== id)
            localStorage.setItem('favorite', JSON.stringify(this.favorite))
        },
        loadFavoriteFromLocal(){
            const local:any = localStorage.getItem('favorite')
            //@ts-ignore
            this.favorite = JSON.parse(local)
            
        }

    },
    getters:{
        getImages(state){
            return state.images
        },
        getFavorite(state){
            return state.favorite
        }
    }
})
