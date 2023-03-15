import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'
import axios from 'axios'

const store = createStore({
    state() {
        return {
            gallery: []
        }
    },
    mutations: {
        load(state, data) {
            state.gallery = data;
        }
    },
    actions: {
        downloadGallery(context) {
            return new Promise((resolve, reject) => {
                axios.get("http://localhost:1337/api/galleries").
                    then((response) => {
                        var array = response.data.data;
                        context.commit("load", array);
                        resolve();
                    }).catch((err=>{
                        alert(err.message);
                        reject(err.message);
                    }));
            })
        }
    }
})


const app = createApp(App).use(store);

app.mount('#app');
