<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-6">Reportar Venta</h2>

          <!-- Información del Bovino -->
          <div class="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 class="text-lg font-medium mb-2">Información del Bovino</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p><span class="font-medium">ID:</span> {{ bovino.id }}</p>
                <p><span class="font-medium">Raza:</span> {{ bovino.raza }}</p>
                <p><span class="font-medium">Edad:</span> {{ bovino.edad }}</p>
              </div>
              <div>
                <p><span class="font-medium">Peso:</span> {{ bovino.peso }} kg</p>
                <p><span class="font-medium">Precio:</span> Bs {{ bovino.precio }}</p>
                <p><span class="font-medium">Estado:</span> {{ bovino.estado }}</p>
              </div>
            </div>
          </div>

          <!-- Formulario de Venta -->
          <form @submit.prevent="guardarVenta" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="fechaVenta" class="block text-sm font-medium text-gray-700">Fecha de Venta</label>
                <input type="date" id="fechaVenta" v-model="venta.fecha" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div>
                <label for="tipoComprador" class="block text-sm font-medium text-gray-700">Tipo de Comprador</label>
                <select id="tipoComprador" v-model="venta.tipoComprador" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="registrado">Registrado en la Plataforma</option>
                  <option value="nuevo">Nuevo Comprador</option>
                </select>
              </div>

              <div v-if="venta.tipoComprador === 'registrado'">
                <label for="comprador" class="block text-sm font-medium text-gray-700">Seleccionar Comprador</label>
                <select id="comprador" v-model="venta.compradorId" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Seleccione un comprador</option>
                  <option v-for="comprador in compradores" :key="comprador.id" :value="comprador.id">
                    {{ comprador.nombre }} - {{ comprador.telefono }}
                  </option>
                </select>
              </div>

              <div v-if="venta.tipoComprador === 'nuevo'">
                <label for="nombreComprador" class="block text-sm font-medium text-gray-700">Nombre del Comprador</label>
                <input type="text" id="nombreComprador" v-model="venta.nombreComprador" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div v-if="venta.tipoComprador === 'nuevo'">
                <label for="telefonoComprador" class="block text-sm font-medium text-gray-700">Teléfono del Comprador</label>
                <input type="text" id="telefonoComprador" v-model="venta.telefonoComprador" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="flex justify-end">
              <button type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Reportar Venta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Datos de ejemplo para el bovino
const bovino = ref({
  id: route.query.id || 'B001',
  raza: 'Angus',
  edad: '2 años',
  peso: '450 kg',
  precio: '2500',
  estado: 'Disponible'
})

// Datos de ejemplo para compradores registrados
const compradores = ref([
  { id: 1, nombre: 'Juan Pérez', telefono: '70000001' },
  { id: 2, nombre: 'María López', telefono: '70000002' },
  { id: 3, nombre: 'Carlos Rodríguez', telefono: '70000003' }
])

const venta = ref({
  fecha: '',
  tipoComprador: 'registrado',
  compradorId: '',
  nombreComprador: '',
  telefonoComprador: ''
})

const guardarVenta = () => {
  // Aquí se implementará la lógica para guardar la venta
  console.log('Guardando venta:', venta.value)
  router.push('/marketplace')
}
</script> 