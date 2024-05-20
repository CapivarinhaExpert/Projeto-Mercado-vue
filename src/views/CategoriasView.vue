<template>


    <div id="meuForm">
                <label for="nome">Nome Categoria:</label>
                <input type="text" id="nome" name="nome" v-model="nome">
                <br>

                <p>{{ nome }}</p>
                <br>
                <button @click="inserirProduto()" type="button">Enviar</button>
    </div>


    <main>
        <table id="box-categoria">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Código</th>
                </tr>
            </thead>
            <tbody id="box-tbody">

                <Categoria v-for="(atr, index) in this.dados" :key="index" :nome_categoria="atr.nome_categoria" :cod_categoria="atr.cod_categoria"></Categoria>

            </tbody>

        </table>

    </main>


</template>



<script>
import $ from 'jquery';
import Categoria from '@/components/Categoria.vue';
export default {
    name: 'CategoriasView',
    components: {
        Categoria
    },
    data() {
        return {
            dados: [],
            nome:''//depois usar categoria.nome
        }
    },
    created(){
        this.getCategorias()
    },
    methods: {
        async inserirProduto() {
            $.ajax({
                url: 'http://localhost/servidor_php/inserirCategoria.php',
                type: 'POST',
                data: { data: JSON.stringify({ nome: this.nome}) },
                success: this.getCategorias,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("deu errado")
                }
            });
        },
        async getCategorias() {
            fetch("http://localhost/servidor_php/getCategoria.php")
                .then(response => response.json())
                .then(data => {
                    this.clearTbody
                    this.dados = data
                })
        },

        clearTbody: () => {
            document.getElementById('box-tbody').innerHTML = '';
        }

    },

}



</script>


<style>
* {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
}

main {

    display: flex;
    flex-direction: column;
    align-items: center;
}

a {
    text-decoration: none;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #ddd;
}

#nav-bar {
    width: 100%;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(23, 111, 111);
}

#nav-list {
    list-style-type: none;
    display: flex;
    gap: 10px;
    color: white;

}


#box-categoria {
    width: 70%;
    padding: 20px 0;
}
</style>
