<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-6">Historial de Ventas</h2>
          
          <!-- Filtros -->
          <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label for="fechaInicio" class="block text-sm font-medium text-gray-700">Fecha Inicio</label>
              <input type="date" id="fechaInicio" v-model="filtros.fechaInicio"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="fechaFin" class="block text-sm font-medium text-gray-700">Fecha Fin</label>
              <input type="date" id="fechaFin" v-model="filtros.fechaFin"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
              <select id="estado" v-model="filtros.estado"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Todos</option>
                <option value="Completada">Completada</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <!-- Tabla de Ventas -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bovino
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comprador
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="venta in ventas" :key="venta.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ venta.fecha }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ venta.bovino }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ venta.comprador }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Bs {{ venta.precio }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-green-100 text-green-800': venta.estado === 'Completada',
                      'bg-yellow-100 text-yellow-800': venta.estado === 'Pendiente',
                      'bg-red-100 text-red-800': venta.estado === 'Cancelada'
                    }">
                      {{ venta.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button @click="verDetalles(venta)" class="text-indigo-600 hover:text-indigo-900 mr-3">
                      Ver Detalles
                    </button>
                    <button @click="cancelarVenta(venta)" v-if="venta.estado === 'Pendiente'" class="text-red-600 hover:text-red-900">
                      Cancelar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filtros = ref({
  fechaInicio: '',
  fechaFin: '',
  estado: ''
})

// Datos de ejemplo para ventas
const ventas = ref([
  {
    id: 1,
    fecha: '2024-03-15',
    bovino: 'B001',
    comprador: 'Juan Pérez',
    precio: 2800,
    estado: 'Completada'
  },
  {
    id: 2,
    fecha: '2024-03-14',
    bovino: 'B002',
    comprador: 'María López',
    precio: 3200,
    estado: 'Pendiente'
  },
  {
    id: 3,
    fecha: '2024-03-13',
    bovino: 'B003',
    comprador: 'Carlos Rodríguez',
    precio: 2500,
    estado: 'Cancelada'
  }
])

const verDetalles = (venta) => {
  // Aquí se implementará la lógica para ver los detalles de la venta
  console.log('Ver detalles de venta:', venta)
}

const cancelarVenta = (venta) => {
  if (confirm('¿Está seguro de cancelar esta venta?')) {
    // Aquí se implementará la lógica para cancelar la venta
    console.log('Cancelar venta:', venta)
  }
}
</script> 