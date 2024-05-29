<template>
  <div>
    <div ref="barcodeScanner" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script>
import Quagga from 'quagga';

export default {
  name: 'TesteCode',
  mounted() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.$refs.barcodeScanner
      },
      decoder: {
        readers: ['ean_reader'] // ean_reader inclui suporte para EAN-13
      }
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(this.onDetected);
  },
  beforeDestroy() {
    Quagga.stop();
  },
  methods: {
    onDetected(result) {
      console.log('Código detectado:', result.codeResult.code);
      // Aqui você pode adicionar lógica adicional para lidar com o código detectado
    }
  }
}
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
