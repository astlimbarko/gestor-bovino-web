<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-md w-full mx-4">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="px-8 py-10">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestor Bovino</h1>
            <p class="text-gray-600">Gestión Inteligente de Ganado</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
              <input id="username" v-model="username" name="username" type="text" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su usuario">
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input id="password" v-model="password" name="password" type="password" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su contraseña">
            </div>

            <div>
              <button type="submit"
                class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Iniciar Sesión
              </button>
            </div>

            <div class="text-center">
              <p class="text-sm text-gray-600">
                ¿No tienes una cuenta?
                <router-link to="/registro" class="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                  Regístrate aquí
                </router-link>
              </p>
            </div>
          </form>

          <!-- Credenciales de prueba -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Credenciales de prueba:</h3>
            <p class="text-sm text-gray-600">Usuario: admin</p>
            <p class="text-sm text-gray-600">Contraseña: admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'admin123') {
    localStorage.setItem('auth', 'true')
    router.push('/dashboard')
  } else {
    alert('Credenciales incorrectas')
  }
}
</script> 