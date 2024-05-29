<template>

    <option :value="cod_produto">{{ nome }}</option>

</template>

<script>
    export default {
        name: 'inputProduto',
        props:['nome', 'cod_produto']

    }
</script>