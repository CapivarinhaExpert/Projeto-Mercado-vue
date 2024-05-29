import { createRouter, createWebHistory } from 'vue-router'
import Produtos from '@/views/Produtos.vue'
import CategoriasView from '@/views/CategoriasView.vue'
import CLientesView from '@/views/ClientesView.vue'
import PainelVendaView from '@/views/PainelVendaView.vue'
import TesteCode from '@/views/TesteCode.vue'

const routes = [
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: CategoriasView
  },
  {
    path: '/clientes',
    name: 'clientes',
    component:CLientesView
  },
  {
    path: '/painel',
    name: 'painel',
    component: PainelVendaView
  },
  {
    path: '/teste',
    name: 'teste',
    component: TesteCode
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
