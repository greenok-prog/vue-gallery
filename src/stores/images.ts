import { defineStore } from "pinia";
import axios from 'axios';

export const useImages = defineStore('images', {
    state:() => {
        return {
            favorite:[] as any[],
            images:[] as any[],
            currentImage:null as any,
            keyword:null as null | string,
            loading:false as boolean,
            error:false as boolean
        }
    },
    actions:{
        async fetchRandomImages(page:number){
           try{
                this.loading = true
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/photos/random?count=${9}&page=${page}&client_id=${import.meta.env.VITE_API_KEY}`)
                data.forEach((el:any) => {
                    this.images.push(el)
                })
                this.loading = false
                this.error = false
           }catch(e){
                this.loading = false
                this.error = true
           }
        },
        async fetchImages(keyword:string, page:number){
           try{
                this.loading = true
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/search/photos?query=${keyword}&per_page=${9}&page=${page}&client_id=${import.meta.env.VITE_API_KEY}`)
                if(this.keyword && keyword){
                    this.images = [...this.images, ...data.results]
                }else{
                    this.images = data.results
                    this.keyword = keyword
                    this.error = false
                }
                this.loading = false
           }catch(e){
                this.loading = false
                this.error = true
           }
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
