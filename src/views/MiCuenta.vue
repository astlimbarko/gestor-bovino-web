<template>
  <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg">
      <!-- Información del Usuario -->
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Información de la Cuenta
        </h3>
        <div class="mt-5 border-t border-gray-200">
          <dl class="divide-y divide-gray-200">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">
                Nombre de Usuario
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ usuario.username }}
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">
                Nombre Completo
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ usuario.nombreCompleto }}
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">
                Correo Electrónico
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ usuario.email }}
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">
                Teléfono
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ usuario.telefono }}
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">
                Rol
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ usuario.rol }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Configuración de la Cuenta -->
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Configuración
        </h3>
        <div class="mt-5">
          <div class="space-y-4">
            <div>
              <label for="notificaciones" class="flex items-center">
                <input type="checkbox" id="notificaciones" v-model="configuracion.notificaciones"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                <span class="ml-2 text-sm text-gray-700">Recibir notificaciones por correo electrónico</span>
              </label>
            </div>
            <div>
              <label for="idioma" class="block text-sm font-medium text-gray-700">Idioma</label>
              <select id="idioma" v-model="configuracion.idioma"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button @click="guardarConfiguracion"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const usuario = ref({
  username: 'usuario123',
  nombreCompleto: 'Juan Pérez',
  email: 'juan.perez@example.com',
  telefono: '+591 70000000',
  rol: 'Administrador'
})

const configuracion = ref({
  notificaciones: true,
  idioma: 'es'
})

const guardarConfiguracion = () => {
  // Aquí se implementará la lógica para guardar la configuración
  console.log('Configuración guardada:', configuracion.value)
}
</script> 