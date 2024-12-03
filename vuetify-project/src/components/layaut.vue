<template>
  <header class="header">
    <h1 class="title">Cartelera</h1>
  </header>
  
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer class="custom-drawer">
      <v-list>
        <v-list-item class="drawer-item"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer class="custom-drawer" location="right">
      <v-list>
        <v-list-item class="drawer-item"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <Cartelera />
    </v-main>
  </v-layout>
</template>

<script setup>
import Cartelera from './cartelera.vue';
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background-image: url('../assets/cine2.jpg'); 
  height: 50vh;
  background-size: cover;
  background-position: center;
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: white;
}

.title {
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
}

.custom-drawer {
  background-color: rgba(107, 0, 0, 0.5);
}

</style>
