<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          🐂 Registrar Vaquero
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Complete la información para registrar un nuevo vaquero
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegistro">
        <div class="space-y-4">
          <div>
            <label for="usuario" class="block text-sm font-medium text-gray-700">Usuario</label>
            <input id="usuario" v-model="vaquero.usuario" type="text" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input id="nombre" v-model="vaquero.nombre" type="text" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input id="email" v-model="vaquero.email" type="email" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input id="telefono" v-model="vaquero.telefono" type="text" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input id="password" v-model="vaquero.password" type="password" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Repetir Contraseña</label>
            <input id="confirmPassword" v-model="vaquero.confirmPassword" type="password" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>

        <div>
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Registrar Vaquero
          </button>
        </div>

        <div class="text-center">
          <router-link to="/" class="text-sm text-indigo-600 hover:text-indigo-500">
            Volver al inicio de sesión
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const vaquero = ref({
  usuario: '',
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  confirmPassword: ''
})

const handleRegistro = () => {
  // Aquí se implementará la lógica de registro
  // Por ahora solo redirigimos al login
  router.push('/')
}
</script> 