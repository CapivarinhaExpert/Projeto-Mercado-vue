<template>

  <tr><td>{{Nome}}</td> <td>{{ Valor }}</td> <td>{{Quantidade}}</td> <td>{{ nome_categoria }}</td> <td>{{cod_produto}}</td></tr>
    

</template>


<script>
    export default {
        name: "ProdutoVue",
        props:['Nome', 'cod_produto', "Quantidade", "nome_categoria", "Valor"]
    }

</script>