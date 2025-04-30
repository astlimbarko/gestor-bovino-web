<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Bovinos</h2>
      <button @click="showAddModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Bovino
      </button>
    </div>

    <!-- Tabla de bovinos -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Raza
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sexo
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Nacimiento
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="bovino in bovinos" :key="bovino.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ bovino.nombre }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ bovino.raza }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ bovino.sexo }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ bovino.fechaNacimiento }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(bovino.estado)"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ bovino.estado }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="editBovino(bovino)"
                class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
              <button @click="deleteBovino(bovino)"
                class="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para agregar/editar bovino -->
    <div v-if="showAddModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              {{ editingBovino ? 'Editar Bovino' : 'Agregar Nuevo Bovino' }}
            </h3>
            <form @submit.prevent="saveBovino">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" v-model="form.nombre" id="nombre"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="sm:col-span-3">
                  <label for="raza" class="block text-sm font-medium text-gray-700">Raza</label>
                  <input type="text" v-model="form.raza" id="raza"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="sm:col-span-2">
                  <label for="sexo" class="block text-sm font-medium text-gray-700">Sexo</label>
                  <select v-model="form.sexo" id="sexo"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>
                  </select>
                </div>
                <div class="sm:col-span-4">
                  <label for="fechaNacimiento" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input type="date" v-model="form.fechaNacimiento" id="fechaNacimiento"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="sm:col-span-6">
                  <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                  <select v-model="form.estado" id="estado"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="Activo">Activo</option>
                    <option value="Enfermo">Enfermo</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Fallecido">Fallecido</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="saveBovino"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Guardar
            </button>
            <button type="button" @click="showAddModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showAddModal = ref(false)
const editingBovino = ref(null)

const form = reactive({
  nombre: '',
  raza: '',
  sexo: 'M',
  fechaNacimiento: '',
  estado: 'Activo'
})

const bovinos = ref([
  {
    id: 1,
    nombre: 'Toro Bravo',
    raza: 'Brahman',
    sexo: 'M',
    fechaNacimiento: '2023-01-15',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Vaca Linda',
    raza: 'Holstein',
    sexo: 'H',
    fechaNacimiento: '2022-05-20',
    estado: 'Activo'
  }
])

const getStatusClass = (status) => {
  const classes = {
    'Activo': 'bg-green-100 text-green-800',
    'Enfermo': 'bg-yellow-100 text-yellow-800',
    'Vendido': 'bg-blue-100 text-blue-800',
    'Fallecido': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const editBovino = (bovino) => {
  editingBovino.value = bovino
  Object.assign(form, bovino)
  showAddModal.value = true
}

const deleteBovino = (bovino) => {
  if (confirm('¿Estás seguro de eliminar este bovino?')) {
    bovinos.value = bovinos.value.filter(b => b.id !== bovino.id)
  }
}

const saveBovino = () => {
  if (editingBovino.value) {
    const index = bovinos.value.findIndex(b => b.id === editingBovino.value.id)
    bovinos.value[index] = { ...form, id: editingBovino.value.id }
  } else {
    const newId = Math.max(...bovinos.value.map(b => b.id), 0) + 1
    bovinos.value.push({ ...form, id: newId })
  }
  showAddModal.value = false
  resetForm()
}

const resetForm = () => {
  form.nombre = ''
  form.raza = ''
  form.sexo = 'M'
  form.fechaNacimiento = ''
  form.estado = 'Activo'
  editingBovino.value = null
}
</script> 