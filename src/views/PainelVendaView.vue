<template>
    <main>
        <div id="box-SomaTotal">
            {{ somaTotal }}
        </div>
        <div id="box-adicionar-produto">
            <select v-model="valorAdicionar" name="Produto">
                <inputProduto v-for="(atr, index) in dados" :key="index" :nome="atr.Nome"
                    :cod_produto="atr.cod_produto"></inputProduto>>
            </select>
            <button @click="adicionarCarrinho()">Adicionar</button>
        </div>
        <p>{{ valorAdicionar }}</p>

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


            <tbody id="box-tbody">
                <Produto v-for="(atr, index) in this.dadosSelecionados" :key="index" :Nome="atr.Nome"
                    :cod_produto="atr.cod_produto" :Quantidade="atr.Quantidade" :nome_categoria="atr.nome_categoria"
                    :Valor="atr.Valor"></Produto>


            </tbody>

        </table>
        <div id="box-pagamentos">
           <button id="adicionar-compra">Adicionar</button>
        </div>

    </main>


</template>

<script>
import $ from 'jquery'
import Produto from '@/components/Produto.vue';
import inputProduto from '@/components/inputProduto.vue';

export default {
    name: 'PainelVendaView',
    data() {
        return {
            dados: [],
            valorAdicionar: '',
            dadosSelecionados: [],
            somaTotal: 0,
        }
    },
    components: {
        inputProduto,
        Produto

    },
    created() {
        this.getProdutos()
    },
    methods: {
        adicionarCarrinho() {
            this.dados.forEach((element) => {
                if (this.valorAdicionar === element.cod_produto) {

                    // this.dadosSelecionados.push(element)

                    if (this.dadosSelecionados.some(elementS => {
                        if (elementS.cod_produto === element.cod_produto) {
                            elementS.Quantidade +=1
                            return true;
                        }
                        return false;
                    })) {

                    } else {
                        this.dadosSelecionados.push(element)
                    }

                }

                
            })
            this.somaTotal = 0 //zerando a soma para somar tudo com o adicionamento
            this.dadosSelecionados.forEach(element => {
                        this.somaTotal = this.somaTotal + (element.Quantidade * element.Valor)
                });
            ;
        },
        async getProdutos() {
            fetch("http://localhost/servidor_php/index.php")
                .then(response => response.json())
                .then(data => {
                    this.dados = data
                    this.dados.forEach(element => {
                        element.Quantidade = 1
                    });
                });


        },
        async inserirCompra(){
            $.ajax({
                url: 'http://localhost/servidor_php/inserirProduto.php',
                type: 'POST',
                data: { data: JSON.stringify({Quantidade: this.dadosSelecionados.Quantidade, }) },
                success: console.log('deu certo'),
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("deu errado")
                    console.log()
                }
            });
        }
    }
}
</script>



<style>
#box-SomaTotal{
    position: fixed;
    top: 12px;
    left: 50px;
    background-color: white;
    width: 30px;
    height: 30px;
}

#box-adicionar-produto {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
}

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

#adicionar-compra{
    background-color: rgb(0, 224, 0);
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: all 0.5s;
}
#adicionar-compra:hover{

    box-shadow: 2px 2px 2px black;
}
</style>
