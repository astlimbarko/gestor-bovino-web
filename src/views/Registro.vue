<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-md w-full mx-4">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="px-8 py-10">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestor Bovino</h1>
            <p class="text-gray-600">Registro de Nuevo Rancho</p>
          </div>
          
          <form @submit.prevent="handleRegistro" class="space-y-6">
            <!-- Información del Rancho -->
            <div>
              <label for="nombreRancho" class="block text-sm font-medium text-gray-700 mb-1">Nombre del Rancho</label>
              <input id="nombreRancho" v-model="rancho.nombre" name="nombreRancho" type="text" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese el nombre del rancho">
            </div>
            
            <div>
              <label for="direccion" class="block text-sm font-medium text-gray-700 mb-1">Dirección del Rancho</label>
              <input id="direccion" v-model="rancho.direccion" name="direccion" type="text" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese la dirección del rancho">
            </div>

            <!-- Información del Administrador -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
              <input id="username" v-model="usuario.username" name="username" type="text" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su nombre de usuario">
            </div>
            
            <div>
              <label for="nombreCompleto" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input id="nombreCompleto" v-model="usuario.nombreCompleto" name="nombreCompleto" type="text" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su nombre completo">
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input id="email" v-model="usuario.email" name="email" type="email" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su correo electrónico">
            </div>
            
            <div>
              <label for="telefono" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input id="telefono" v-model="usuario.telefono" name="telefono" type="tel" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su número de teléfono">
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input id="password" v-model="usuario.password" name="password" type="password" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Ingrese su contraseña">
            </div>
            
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input id="confirmPassword" v-model="usuario.confirmPassword" name="confirmPassword" type="password" required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Confirme su contraseña">
            </div>

            <div>
              <button type="submit"
                class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Registrar Rancho
              </button>
            </div>

            <div class="text-center">
              <p class="text-sm text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                  Inicia sesión aquí
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const rancho = ref({
  nombre: '',
  direccion: ''
})

const usuario = ref({
  username: '',
  nombreCompleto: '',
  email: '',
  telefono: '',
  password: '',
  confirmPassword: ''
})

const handleRegistro = () => {
  if (usuario.value.password !== usuario.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }

  // Aquí se implementará la lógica para guardar el rancho y el usuario
  console.log('Registrando rancho:', rancho.value)
  console.log('Registrando usuario:', usuario.value)

  // Simulación de registro exitoso
  alert('Registro exitoso. Ahora puedes iniciar sesión.')
  router.push('/')
}
</script> 