import { createRouter, createWebHistory } from 'vue-router'
import Produtos from '@/views/Produtos.vue'
import CategoriasView from '@/views/CategoriasView.vue'
const routes = [
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos
  },{
    path: '/categorias',
    name: 'categorias',
    component: CategoriasView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
