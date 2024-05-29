<template>
    <tr>
        <td>{{ cod_cliente }}</td>
        <td>{{ Nome }}</td>
        <td>{{ Divida }}</td>
    </tr>
</template>


<script>
export default {
    name: 'ClienteComp',
    props: ['cod_cliente', 'Nome', 'Divida']
}
</script>