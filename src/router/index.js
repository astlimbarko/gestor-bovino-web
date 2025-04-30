import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Bovinos from '../views/Bovinos.vue'
import Vacunacion from '../views/Vacunacion.vue'
import Vacunas from '../views/Vacunas.vue'
import Marketplace from '../views/Marketplace.vue'
import Ventas from '../views/Ventas.vue'
import MiCuenta from '../views/MiCuenta.vue'
import Registro from '../views/Registro.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/bovinos',
    name: 'Bovinos',
    component: Bovinos,
    meta: { requiresAuth: true }
  },
  {
    path: '/vacunacion',
    name: 'Vacunacion',
    component: Vacunacion,
    meta: { requiresAuth: true }
  },
  {
    path: '/vacunas',
    name: 'Vacunas',
    component: Vacunas,
    meta: { requiresAuth: true }
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace,
    meta: { requiresAuth: true }
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: Ventas,
    meta: { requiresAuth: true }
  },
  {
    path: '/mi-cuenta',
    name: 'MiCuenta',
    component: MiCuenta,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router 