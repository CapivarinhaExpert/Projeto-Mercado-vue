if (isset($_POST['data'])) {
    $dados = json_decode($_POST['data'], true); // Decodifica o JSON para array

    // Verifica se o decode foi bem-sucedido
    if (is_array($dados)) {
        $sql = "INSERT INTO compra (cod_cliente) VALUES (?)";
      
        foreach ($dados as $produto) {
            $cod_cliente = $produto['cod_cliente'];
            $Quantidade_prod = $produto['Quantidade']
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i",$cod_cliente );

            if ($stmt->execute()) {

               
            } else {
                echo "Erro ao inserir produto: " . $stmt->error . "\n";
            }

            $stmt->close();
        }
    } else {
        echo "Dados recebidos em formato inválido.";
    }
} else {
    echo "Nenhum dado recebido.";
}
