<template>

    <main>


        <table id="box-produto">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Divida</th>
                </tr>
            </thead>

            <tbody v-show="adicionar" id="box-inputs">
                <tr>
                    <td></td>
                    <td><input v-model="Nome" type="text" name="nome" id="nome" placeholder="Digite o nome"></td>
                    <td><input v-model="Divida" type="number" name="divida" id="divida"></td>
                </tr>
                <tr>
                    <td colspan="4"><button id="btn-cadastrar" @click="cadastrarCLiente()"  type="button" placeholder="Digite a divida inicial">Cadastrar</button></td>
                </tr>

            </tbody>
            <tbody id="box-tbody">

                <ClienteComp v-for="(atr, index) in this.dados" :key="index" :cod_cliente="atr.cod_cliente"
                    :Nome="atr.Nome" :Divida="atr.Divida"></ClienteComp>

            </tbody>
            <img id="btn-adicionar" :src="srcAdicionar" @click="adicionarView" alt="Adicionar">
        </table>


    </main>


</template>



<script>
import ClienteComp from '@/components/ClienteComp.vue';
import $ from 'jquery'
export default {
    name: 'CLientesView',
    data() {
        return {
            dados: [],
            adicionar:false,
            Nome:'',
            Divida:'',


            srcAdicionar: 'http://localhost:8080/botao-adicionar.png'
        }
    },
    components: {
        ClienteComp
    },
    created() {
        this.getClientes()
    },
    methods: {
        adicionarView: function () {
            this.adicionar = !this.adicionar
            this.srcAdicionar = this.adicionar ? 'http://localhost:8080/botao-adicionar-cacelar.png' : 'http://localhost:8080/botao-adicionar.png';
        },
        async getClientes() {
            fetch("http://localhost/servidor_php/getCLientes.php")
                .then(response => response.json())
                .then(data => {
                    this.clearTbody
                    this.dados = data
                });
        },
        async cadastrarCLiente(){
            $.ajax({
                url:'http://localhost/servidor_php/CadastrarCliente.php',
                type:'POST',
                data:{data: JSON.stringify({Nome: this.Nome, Divida: this.Divida})},
                success:this.getClientes,
                error: function (jqXHR, textStatus, errorThrown){
                    console.log('deu ruin')
                }
            })
            this.Nome=''
            this.Divida = ''
            this.adicionarView()
        }
    },
    clearTbody: () => {
        document.getElementById('box-tbody').innerHTML = '';
    },
    

}
</script>