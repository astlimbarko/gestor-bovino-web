<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Botón para añadir nueva vacunación -->
        <div class="mb-6 flex justify-end">
          <button @click="mostrarFormulario = !mostrarFormulario"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ mostrarFormulario ? 'Cancelar' : 'Registrar Vacunación' }}
          </button>
        </div>

        <!-- Formulario para Registrar Vacunación (solo visible cuando mostrarFormulario es true) -->
        <div v-if="mostrarFormulario" class="bg-white shadow rounded-lg p-6 mb-6">
          <h2 class="text-2xl font-bold mb-6">Registrar Vacunación</h2>
          
          <!-- Búsqueda de Bovino -->
          <div class="mb-6">
            <label for="buscarBovino" class="block text-sm font-medium text-gray-700">Buscar Bovino</label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input type="text" id="buscarBovino" v-model="numeroIdentificacion"
                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Número de identificación">
              <button @click="buscarBovino"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Buscar
              </button>
            </div>
          </div>

          <!-- Información del Bovino -->
          <div v-if="bovinoEncontrado" class="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 class="text-lg font-medium mb-2">Información del Bovino</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p><span class="font-medium">ID:</span> {{ bovinoEncontrado.id }}</p>
                <p><span class="font-medium">Raza:</span> {{ bovinoEncontrado.raza }}</p>
                <p><span class="font-medium">Edad:</span> {{ bovinoEncontrado.edad }}</p>
              </div>
              <div>
                <p><span class="font-medium">Peso:</span> {{ bovinoEncontrado.peso }} kg</p>
                <p><span class="font-medium">Sexo:</span> {{ bovinoEncontrado.sexo }}</p>
                <p><span class="font-medium">Estado:</span> {{ bovinoEncontrado.estado }}</p>
              </div>
            </div>
          </div>

          <!-- Formulario de Vacunación -->
          <form @submit.prevent="guardarVacunacion" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="vacuna" class="block text-sm font-medium text-gray-700">Vacuna</label>
                <select id="vacuna" v-model="vacunacion.vacuna" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option v-for="vacuna in vacunas" :key="vacuna.id" :value="vacuna.id">
                    {{ vacuna.nombre }}
                  </option>
                </select>
              </div>

              <div>
                <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha de Vacunación</label>
                <input type="date" id="fecha" v-model="vacunacion.fecha" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div>
                <label for="hora" class="block text-sm font-medium text-gray-700">Hora de Vacunación</label>
                <input type="time" id="hora" v-model="vacunacion.hora" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div>
                <label for="proxima" class="block text-sm font-medium text-gray-700">Próxima Vacunación</label>
                <input type="date" id="proxima" v-model="vacunacion.proxima" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>

            <div>
              <label for="observaciones" class="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea id="observaciones" v-model="vacunacion.observaciones" rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div class="flex justify-end">
              <button type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Registrar Vacunación
              </button>
            </div>
          </form>
        </div>

        <!-- Lista de Vacunaciones -->
        <div class="bg-white shadow rounded-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bovino
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vacuna
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hora
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Próxima
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
                <tr v-for="vacunacion in vacunacionesPaginadas" :key="vacunacion.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ vacunacion.bovinoId }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vacunacion.vacuna }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vacunacion.fecha }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vacunacion.hora }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vacunacion.proxima }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 text-xs font-semibold rounded-full': true,
                      'bg-green-100 text-green-800': vacunacion.estado === 'Completada',
                      'bg-yellow-100 text-yellow-800': vacunacion.estado === 'Pendiente',
                      'bg-red-100 text-red-800': vacunacion.estado === 'Cancelada'
                    }">
                      {{ vacunacion.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button @click="verDetalles(vacunacion)"
                      class="text-indigo-600 hover:text-indigo-900">
                      Ver Detalles
                    </button>
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
                  <span class="font-medium">{{ Math.min(paginaActual * itemsPorPagina, vacunaciones.length) }}</span>
                  de
                  <span class="font-medium">{{ vacunaciones.length }}</span>
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
const numeroIdentificacion = ref('')
const bovinoEncontrado = ref(null)

const vacunacion = ref({
  vacuna: '',
  fecha: '',
  hora: '',
  proxima: '',
  observaciones: ''
})

// Datos de ejemplo para vacunas
const vacunas = ref([
  { id: 1, nombre: 'Vacuna contra Fiebre Aftosa' },
  { id: 2, nombre: 'Vacuna contra Brucelosis' },
  { id: 3, nombre: 'Vacuna contra Carbunco' }
])

// Datos de ejemplo para vacunaciones
const vacunaciones = ref([
  {
    id: 1,
    bovinoId: 'B001',
    vacuna: 'Vacuna contra Fiebre Aftosa',
    fecha: '2024-03-15',
    hora: '09:00',
    proxima: '2024-09-15',
    estado: 'Completada',
    fechaRegistro: '2024-03-15'
  },
  {
    id: 2,
    bovinoId: 'B002',
    vacuna: 'Vacuna contra Brucelosis',
    fecha: '2024-03-16',
    hora: '10:30',
    proxima: '2024-09-16',
    estado: 'Pendiente',
    fechaRegistro: '2024-03-14'
  }
])

const itemsPorPagina = 20
const paginaActual = ref(1)

// Computed para la paginación
const totalPaginas = computed(() => Math.ceil(vacunaciones.value.length / itemsPorPagina))

const vacunacionesPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPorPagina
  const fin = inicio + itemsPorPagina
  return vacunaciones.value.slice(inicio, fin)
})

const buscarBovino = () => {
  // Simulación de búsqueda
  if (numeroIdentificacion.value) {
    bovinoEncontrado.value = {
      id: numeroIdentificacion.value,
      raza: 'Angus',
      edad: '2 años',
      peso: '450 kg',
      sexo: 'Macho',
      estado: 'Saludable'
    }
  }
}

const guardarVacunacion = () => {
  // Aquí se implementará la lógica para guardar la vacunación
  console.log('Guardando vacunación:', vacunacion.value)
  mostrarFormulario.value = false
}

const verDetalles = (vacunacion) => {
  // Aquí se implementará la lógica para ver los detalles
  console.log('Ver detalles de vacunación:', vacunacion)
}
</script> 