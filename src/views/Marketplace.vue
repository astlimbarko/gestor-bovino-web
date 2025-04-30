<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Botón para añadir nueva oferta -->
        <div class="mb-6 flex justify-end">
          <button @click="mostrarFormulario = !mostrarFormulario"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ mostrarFormulario ? 'Cancelar' : 'Ofertar Bovino' }}
          </button>
        </div>

        <!-- Formulario para Ofertar Bovino (solo visible cuando mostrarFormulario es true) -->
        <div v-if="mostrarFormulario" class="bg-white shadow rounded-lg p-6 mb-6">
          <h2 class="text-2xl font-bold mb-6">Ofertar Bovino</h2>
          
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

          <!-- Formulario de Oferta -->
          <form @submit.prevent="guardarOferta" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="precio" class="block text-sm font-medium text-gray-700">Precio (Bs)</label>
                <input type="number" id="precio" v-model="oferta.precio" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div>
                <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                <select id="estado" v-model="oferta.estado" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="Disponible">Disponible</option>
                  <option value="Reservado">Reservado</option>
                  <option value="Vendido">Vendido</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div>
                <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                <input type="text" id="telefono" v-model="oferta.telefono" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div>
                <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección del Rancho</label>
                <input type="text" id="direccion" v-model="oferta.direccion" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>

            <div>
              <label for="foto" class="block text-sm font-medium text-gray-700">Foto del Bovino</label>
              <input type="file" id="foto" @change="handleFileUpload" accept="image/*"
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
            </div>

            <div>
              <label for="comentarios" class="block text-sm font-medium text-gray-700">Comentarios</label>
              <textarea id="comentarios" v-model="oferta.comentarios" rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div class="flex justify-end">
              <button type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Publicar Oferta
              </button>
            </div>
          </form>
        </div>

        <!-- Lista de Ofertas -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <router-link v-for="oferta in ofertas" :key="oferta.id" :to="'/marketplace/' + oferta.id"
            class="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="relative">
              <img :src="oferta.foto" :alt="'Bovino ' + oferta.bovinoId" class="w-full h-48 object-cover">
              <span :class="{
                'absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full': true,
                'bg-green-100 text-green-800': oferta.estado === 'Disponible',
                'bg-yellow-100 text-yellow-800': oferta.estado === 'Reservado',
                'bg-red-100 text-red-800': oferta.estado === 'Vendido',
                'bg-gray-100 text-gray-800': oferta.estado === 'Inactivo'
              }">
                {{ oferta.estado }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium">Bovino #{{ oferta.bovinoId }}</h3>
              <p class="text-2xl font-bold text-indigo-600">Bs {{ oferta.precio }}</p>
              <p class="text-sm text-gray-500">{{ oferta.direccion }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ oferta.fecha }}</span>
                <button @click.stop="reportarVenta(oferta)"
                  class="text-sm text-indigo-600 hover:text-indigo-900">
                  Reportar Venta
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mostrarFormulario = ref(false)
const numeroIdentificacion = ref('')
const bovinoEncontrado = ref(null)

const oferta = ref({
  precio: '',
  estado: 'Disponible',
  telefono: '',
  direccion: '',
  foto: null,
  comentarios: ''
})

// Datos de ejemplo para ofertas
const ofertas = ref([
  {
    id: 1,
    bovinoId: 'B001',
    precio: 2500,
    estado: 'Disponible',
    direccion: 'Rancho San Juan, Santa Cruz',
    foto: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    fecha: '2024-03-15'
  },
  {
    id: 2,
    bovinoId: 'B002',
    precio: 3200,
    estado: 'Reservado',
    direccion: 'Rancho El Paraíso, Santa Cruz',
    foto: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    fecha: '2024-03-14'
  }
])

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

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      oferta.value.foto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const guardarOferta = () => {
  // Aquí se implementará la lógica para guardar la oferta
  console.log('Guardando oferta:', oferta.value)
  mostrarFormulario.value = false
}

const reportarVenta = (oferta) => {
  // Aquí se implementará la lógica para reportar la venta
  console.log('Reportando venta:', oferta)
}
</script> 