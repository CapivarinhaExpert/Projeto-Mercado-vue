<template>

    <tr><td>{{ nome_categoria }}</td> <td>{{ cod_categoria }}</td></tr>

</template>


<script>
    export default{
        name: 'Categoria',
        props:['nome_categoria', 'cod_categoria']
    }
</script>