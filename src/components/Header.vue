<template>
  <header class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <h1 class="text-base text-gray-600">Rancho Viejo</h1>
      </div>
      <div class="relative" ref="menuContainer">
        <button @click="mostrarMenu = !mostrarMenu" class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="font-medium">Mi cuenta</span>
        </button>
        <div v-if="mostrarMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
          <router-link to="/mi-cuenta" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200">Mi cuenta</router-link>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200" @click="cerrarSesion">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mostrarMenu = ref(false)
const menuContainer = ref(null)

const handleClickOutside = (event) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target)) {
    mostrarMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const cerrarSesion = () => {
  localStorage.removeItem('auth')
  router.push('/')
}
</script> 