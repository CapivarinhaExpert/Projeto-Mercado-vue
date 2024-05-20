<template>
    <main>
        <div id="box">

            <div id="meuForm">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" v-model="nome" value="João">
                <br>

                <label for="">Valor:</label>
                <input type="number" id="valor" v-model="valor" name="valor">
                <br>

                <label for="quantidade">Quantidade:</label>
                <input type="number" id="quantidade" v-model="quantidade" name="quantidade">
                <br>

                <label for="categoria">Categoria:</label>
                <select v-model="this.categoria" name="categoria" id="categoria">
                    <option selected value="">Selecione uma opção</option>
                    <InputCategoria  v-for="(atr, index) in this.categoriasData" :key="index" :nome_categoria="atr.nome_categoria" :cod_categoria="atr.cod_categoria"></InputCategoria>
                </select>
                <p>{{ categoria }}</p>

                <p>{{ nome }}</p>
                <br>
                <button @click="inserirProduto()" type="button">Enviar</button>
            </div>



        </div>

        <table id="box-produto">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Código</th>
                    <th>Quantidade</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody id="box-tbody">
                <Produto v-for="(atr, index) in this.dados" :key="index" :Nome="atr.Nome" :cod_produto="atr.cod_produto"
                    :Quantidade="atr.Quantidade" :nome_categoria="atr.nome_categoria"></Produto>


            </tbody>

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
            categoriasData:[],

            nome: '',
            valor: '',
            quantidade: '',
            categoria: '',

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


        async inserirProduto() {
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


#box-produto {
    width: 70%;
    padding: 20px 0;
}
</style>

