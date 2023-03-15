<script setup>
import {  onMounted } from "vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";

const store = useStore();

const status = reactive({
  downloaded:false
})

const h1 = reactive("Картинная галерея");

onMounted(() => {
  
  store
    .dispatch("downloadGallery")
    .then(() => {
      console.log("Галерея загружена.");
      status.downloaded=true;
    })
    .catch((err) => console.log(err));
});

const gallery = computed(() => {
  return store.state.gallery;
});
</script>

<template>
  {{ h1 }}
  <p v-if="status" class="downloaded">Последнее обновление: {{ new Date() }}</p>
<p>
  Количество картин в нашей галерее: {{ gallery.length }}
  <ol>
    <li v-for="item in gallery" :key="item.id">
      <span>&nbsp{{ item.attributes.name }} </span>
      <div>
        <img class="gallery-img" :src="item.attributes.imgSrc" :alt="item.attributes.name">
      </div>
    </li>
  </ol>
</p>
</template>

<style scoped>
.downloaded{
  font-size: 0.8em;
}

ol {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

li{
  text-align: center;
}

.gallery-img{
  width: 50%;
  height: auto;
  
}
</style>
