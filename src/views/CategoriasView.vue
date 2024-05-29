<template>



    <main>
        <table id="box-produto">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Código</th>
                </tr>

                
            </thead>
            <tbody v-show="adicionar" id="box-inputs">
                <tr>
                    <td><input v-model="nome" type="text" name="nome" placeholder="Digite o nome da categoria"></td>
                    <td>Automatico</td>
                </tr>
                <tr>
                    <td colspan="4"><button id="btn-cadastrar" @click="inserirProduto()"  type="button" placeholder="Digite a divida inicial">Cadastrar</button></td>
                </tr>
            </tbody>
            <tbody id="box-tbody">

                <Categoria v-for="(atr, index) in this.dados" :key="index" :nome_categoria="atr.nome_categoria"
                    :cod_categoria="atr.cod_categoria"></Categoria>

            </tbody>
            <img id="btn-adicionar" :src="srcAdicionar" @click="adicionarView" alt="Adicionar">
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
            nome: '',//depois usar categoria.nome

            adicionar: false,
            srcAdicionar: 'http://localhost:8080/botao-adicionar.png'
        }
    },
    created() {
        this.getCategorias()
    },
    methods: {

        adicionarView: function () {
            this.adicionar = !this.adicionar
            this.srcAdicionar = this.adicionar ? 'http://localhost:8080/botao-adicionar-cacelar.png' : 'http://localhost:8080/botao-adicionar.png';
        },
        async inserirProduto() {
            $.ajax({
                url: 'http://localhost/servidor_php/inserirCategoria.php',
                type: 'POST',
                data: { data: JSON.stringify({ nome: this.nome }) },
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
