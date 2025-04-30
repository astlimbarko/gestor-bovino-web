<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Botón para añadir nueva vacuna -->
        <div class="mb-6 flex justify-end">
          <button @click="mostrarFormulario = !mostrarFormulario"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ mostrarFormulario ? 'Cancelar' : 'Añadir Vacuna' }}
          </button>
        </div>

        <!-- Formulario para Añadir Vacuna (solo visible cuando mostrarFormulario es true) -->
        <div v-if="mostrarFormulario" class="bg-white shadow rounded-lg p-6 mb-6">
          <h2 class="text-2xl font-bold mb-6">{{ vacunaEditando ? 'Editar Vacuna' : 'Añadir Vacuna' }}</h2>
          
          <form @submit.prevent="guardarVacuna" class="space-y-6">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre de la Vacuna</label>
              <input type="text" id="nombre" v-model="vacuna.nombre" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>

            <div>
              <label for="observaciones" class="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea id="observaciones" v-model="vacuna.observaciones" rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div class="flex justify-end space-x-3">
              <button type="button" @click="cancelarEdicion"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancelar
              </button>
              <button type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ vacunaEditando ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Lista de Vacunas -->
        <div class="bg-white shadow rounded-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Observaciones
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="vacuna in vacunasPaginadas" :key="vacuna.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ vacuna.nombre }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ vacuna.observaciones }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vacuna.fechaRegistro }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex space-x-2">
                      <button @click="editarVacuna(vacuna)"
                        class="text-indigo-600 hover:text-indigo-900">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="eliminarVacuna(vacuna)"
                        class="text-red-600 hover:text-red-900">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Paginación -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button @click="paginaActual--" :disabled="paginaActual === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button @click="paginaActual++" :disabled="paginaActual === totalPaginas"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Siguiente
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando
                  <span class="font-medium">{{ (paginaActual - 1) * itemsPorPagina + 1 }}</span>
                  a
                  <span class="font-medium">{{ Math.min(paginaActual * itemsPorPagina, vacunas.length) }}</span>
                  de
                  <span class="font-medium">{{ vacunas.length }}</span>
                  resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button @click="paginaActual--" :disabled="paginaActual === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Anterior</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button v-for="pagina in totalPaginas" :key="pagina"
                    @click="paginaActual = pagina"
                    :class="{
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium': true,
                      'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': pagina === paginaActual,
                      'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': pagina !== paginaActual
                    }">
                    {{ pagina }}
                  </button>
                  <button @click="paginaActual++" :disabled="paginaActual === totalPaginas"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Siguiente</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mostrarFormulario = ref(false)
const vacunaEditando = ref(null)

const vacuna = ref({
  nombre: '',
  observaciones: ''
})

// Datos de ejemplo para vacunas
const vacunas = ref([
  {
    id: 1,
    nombre: 'Vacuna contra Fiebre Aftosa',
    observaciones: 'Vacuna para prevenir la fiebre aftosa en bovinos',
    fechaRegistro: '2024-03-15'
  },
  {
    id: 2,
    nombre: 'Vacuna contra Brucelosis',
    observaciones: 'Vacuna para prevenir la brucelosis en bovinos',
    fechaRegistro: '2024-03-14'
  },
  {
    id: 3,
    nombre: 'Vacuna contra Carbunco',
    observaciones: 'Vacuna para prevenir el carbunco en bovinos',
    fechaRegistro: '2024-03-13'
  }
])

const itemsPorPagina = 20
const paginaActual = ref(1)

// Computed para la paginación
const totalPaginas = computed(() => Math.ceil(vacunas.value.length / itemsPorPagina))

const vacunasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPorPagina
  const fin = inicio + itemsPorPagina
  return vacunas.value.slice(inicio, fin)
})

const editarVacuna = (vacunaSeleccionada) => {
  vacunaEditando.value = vacunaSeleccionada
  vacuna.value = { ...vacunaSeleccionada }
  mostrarFormulario.value = true
}

const eliminarVacuna = (vacunaSeleccionada) => {
  if (confirm('¿Está seguro de eliminar esta vacuna?')) {
    // Aquí se implementará la lógica para eliminar la vacuna
    console.log('Eliminando vacuna:', vacunaSeleccionada)
  }
}

const guardarVacuna = () => {
  if (vacunaEditando.value) {
    // Aquí se implementará la lógica para actualizar la vacuna
    console.log('Actualizando vacuna:', vacuna.value)
  } else {
    // Aquí se implementará la lógica para crear una nueva vacuna
    console.log('Creando vacuna:', vacuna.value)
  }
  cancelarEdicion()
}

const cancelarEdicion = () => {
  mostrarFormulario.value = false
  vacunaEditando.value = null
  vacuna.value = {
    nombre: '',
    observaciones: ''
  }
}
</script> 