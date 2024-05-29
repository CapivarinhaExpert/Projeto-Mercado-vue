<template>
  <nav>
    <router-link to="/painel">Painel de venda</router-link> |
    <router-link to="/produtos">Produtos</router-link> |
    <router-link to="/categorias">Categorias</router-link> |
    <router-link to="/clientes">Clientes</router-link> |
    <router-link to="/teste">teste</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
