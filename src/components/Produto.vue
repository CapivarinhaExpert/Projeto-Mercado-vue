<template>

  <tr><td>{{Nome}}</td> <td>{{cod_produto}}</td> <td>{{Quantidade}}</td> <td>{{ nome_categoria }}</td></tr>
    

</template>


<script>
    export default {
        name: "ProdutoVue",
        props:['Nome', 'cod_produto', "Quantidade", "nome_categoria"]
    }

</script>