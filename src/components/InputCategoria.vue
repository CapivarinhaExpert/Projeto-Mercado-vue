<template>
    <option :value="cod_categoria">{{ nome_categoria }}</option>

</template>

<script>
    export default{
        name:'InputCategoria',
        props: ['nome_categoria', 'cod_categoria']

    }
</script>