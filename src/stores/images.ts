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
        },
        removeFromFavorite(id:string){
            this.favorite = this.favorite.filter((image) => image.id !== id)
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
