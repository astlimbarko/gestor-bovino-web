<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Resumen del Rancho</h2>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-indigo-50 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total de Bovinos
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      150
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-50 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Bovinos Sanos
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      145
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Próximas Vacunaciones
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      12
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
      <div class="flow-root">
        <ul class="-mb-8">
          <li v-for="(activity, index) in activities" :key="index">
            <div class="relative pb-8">
              <span v-if="index !== activities.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
              <div class="relative flex space-x-3">
                <div>
                  <span class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                    <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p class="text-sm text-gray-500">{{ activity.description }}</p>
                  </div>
                  <div class="text-right text-sm whitespace-nowrap text-gray-500">
                    <time :datetime="activity.datetime">{{ activity.date }}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const activities = [
  {
    description: 'Nuevo bovino registrado: "Toro Bravo"',
    date: 'Hace 1 hora',
    datetime: '2024-04-29T12:00:00'
  },
  {
    description: 'Vacunación completada para 5 bovinos',
    date: 'Hace 3 horas',
    datetime: '2024-04-29T10:00:00'
  },
  {
    description: 'Nuevo usuario registrado: Juan Pérez',
    date: 'Hace 5 horas',
    datetime: '2024-04-29T08:00:00'
  }
]
</script> 