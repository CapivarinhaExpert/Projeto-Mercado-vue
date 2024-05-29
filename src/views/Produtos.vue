<template>
    <main>
        

        <table id="box-produto">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Quantidade</th>
                    <th>Categoria</th>
                    <th>Código</th>
                </tr>
            </thead>

            <tbody v-show="adicionar" id="box-inputs">
                <tr>
                    <td><input type="text" id="nome" name="nome" v-model="nome"></td>
                    <td><input type="number" id="valor" v-model="valor" name="valor"></td>
                    <td><input type="number" id="quantidade" v-model="quantidade" name="quantidade"></td>
                    <td>
                        <select v-model="this.categoria" name="categoria" id="categoria">
                            <option selected value="">Selecione</option>
                            <InputCategoria v-for="(atr, index) in this.categoriasData" :key="index"
                                :nome_categoria="atr.nome_categoria" :cod_categoria="atr.cod_categoria">
                            </InputCategoria>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="4"><button id="btn-cadastrar" @click="inserirProduto()"  type="button">Cadastrar</button></td>
                </tr>

            </tbody>
            <tbody id="box-tbody">
                <Produto v-for="(atr, index) in this.dados" :key="index" :Nome="atr.Nome" :cod_produto="atr.cod_produto"
                    :Quantidade="atr.Quantidade" :nome_categoria="atr.nome_categoria" :Valor="atr.Valor"></Produto>


            </tbody>
            <img id="btn-adicionar" :src="srcAdicionar" @click="adicionarView" alt="Adicionar">
        </table>


    </main>


</template>


<script>
import $ from 'jquery';
import Produto from '../components/Produto.vue'
import InputCategoria from '@/components/InputCategoria.vue';
export default {
    name: "Produtos",
    data() {
        return {
            dados: [],
            categoriasData: [],

            nome: '',
            valor: '',
            quantidade: '',
            categoria: '',

            adicionar: false,
            srcAdicionar: 'http://localhost:8080/botao-adicionar.png'
        }
    },
    created() {
        this.getProdutos();
        this.getCategorias();

    },
    components: {
        Produto,
        InputCategoria,
    },
    methods: {
        adicionarView: function () {
            this.adicionar = !this.adicionar
            this.srcAdicionar = this.adicionar ? 'http://localhost:8080/botao-adicionar-cacelar.png' : 'http://localhost:8080/botao-adicionar.png';
        }
        ,

        async inserirProduto() {
            this.adicionarView()
            $.ajax({
                url: 'http://localhost/servidor_php/inserirProduto.php',
                type: 'POST',
                data: { data: JSON.stringify({ nome: this.nome, valor: this.valor, quantidade: this.quantidade, cod_categoria: this.categoria }) },
                success: this.getProdutos,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("deu errado")
                    console.log()
                }
            });
        },
        async getProdutos() {
            fetch("http://localhost/servidor_php/index.php")
                .then(response => response.json())
                .then(data => {
                    this.clearTbody
                    this.dados = data
                });
        },

        async getCategorias() {
            fetch("http://localhost/servidor_php/getCategoria.php")
                .then(response => response.json())
                .then(data => {
                    this.clearTbody
                    this.categoriasData = data
                })
        },

        clearObject: () => {
            this.nome = '';
            this.valor = '';
            this.quantidade = '';

        },
        clearTbody: () => {
            document.getElementById('box-tbody').innerHTML = '';
        }

    }
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




#box-produto {
    width: 70%;
    padding: 20px 0;
    position: relative;
}

#btn-adicionar {
    width: 30px;
    position: absolute;
    top: 0%;
    left: calc(100% + 10px);
    transition: all 0.5s;
}

#btn-adicionar:hover {
    cursor: pointer;
    transform: scale(1.1);
}

#box-inputs td {
    padding: 0%;
}

#box-inputs input {
    background-color: rgb(229, 229, 255);
    width: 100%;
    height: 30px;
    border: #3b70e2 solid 2px;
}

#box-inputs select {
    background-color: rgb(229, 229, 255);
    width: 100%;
    height: 30px;
    border: #3b70e2 solid 2px;
}

#btn-cadastrar {}
</style>
