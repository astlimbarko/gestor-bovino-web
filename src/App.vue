<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isLoginPage = ref(route.path === '/')
const isAuthenticated = ref(false)

// Función para verificar autenticación
const checkAuth = () => {
  isAuthenticated.value = localStorage.getItem('auth') === 'true'
  isLoginPage.value = route.path === '/'
}

// Verificar autenticación al montar el componente
onMounted(() => {
  checkAuth()
})

// Observar cambios en la ruta
watch(() => route.path, () => {
  checkAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
    <!-- Sidebar -->
    <div v-if="isAuthenticated && !isLoginPage" class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-center h-16 bg-gradient-to-r from-indigo-600 to-indigo-700">
          <h1 class="text-white text-xl font-semibold tracking-wide">Gestor Bovino</h1>
        </div>
        <nav class="flex-1 px-2 py-4 space-y-1">
          <router-link to="/dashboard" class="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors duration-200">
            <svg class="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Dashboard</span>
          </router-link>
          <router-link to="/bovinos" class="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors duration-200">
            <svg class="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span class="font-medium">Bovinos</span>
          </router-link>
          <router-link to="/vacunacion" class="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors duration-200">
            <svg class="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">Vacunación</span>
          </router-link>
          <router-link to="/vacunas" class="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors duration-200">
            <svg class="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span class="font-medium">Vacunas</span>
          </router-link>
          <router-link to="/marketplace" class="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors duration-200">
            <svg class="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="font-medium">Marketplace</span>
          </router-link>
          <router-link to="/ventas" class="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors duration-200">
            <svg class="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">Ventas</span>
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Contenido principal -->
    <div :class="{'ml-64': isAuthenticated && !isLoginPage}" class="flex-1 flex flex-col">
      <Header v-if="isAuthenticated && !isLoginPage" />
      
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>
      
      <Footer v-if="isAuthenticated && !isLoginPage" />
    </div>
  </div>
</template>

<style>
.router-link-active {
  @apply bg-indigo-50 text-indigo-600;
}

/* Transiciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mejoras en scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
