let producao = 480;
let horasTrabalhadas = 0;
let meta = 500;




function calcularProdutividadeHora(producao, horasTrabalhadas) {
   if(horasTrabalhadas === 0) {
    return 0;
   } else {
     return producao / horasTrabalhadas;
   }
}
let produtividadeHora = calcularProdutividadeHora(producao, horasTrabalhadas);
console.log(`Produtividade: ${produtividadeHora} unidades/hora`);

function calcularPercentual(producao, meta) {
    return producao / meta * 100;
}
let percentual = calcularPercentual(producao, meta);
console.log(`Meta atingida: ${percentual}%`);

if(producao >= meta) {
    console.log("Meta atingida!");
} else {
    console.log("Meta não atingida");
};
let resultado = document.getElementById("resultado");
resultado.textContent = "JavaScript conectado com sucesso!";
let botao = document.getElementById("calcular");
let listaHistorico = document.getElementById("listaHistorico");
let historico = JSON.parse(localStorage.getItem("historico")) || [];
for (let registro of historico) {
    console.log(registro.producao);
}
function atualizarHistorico() {
    listaHistorico.innerHTML = "";

    for (let registro of historico.toReversed()) {
        let item = document.createElement("li");

        item.textContent = `Produção: ${registro.producao} | Produtividade: ${registro.produtividade.toFixed(2)} unidades/hora`;

        listaHistorico.appendChild(item);
    }
}

atualizarHistorico();
botao.addEventListener("click", function() {

    
    let campoProducao = document.getElementById("producao");
    let valorProducao = Number(campoProducao.value);
    let campoHoras = document.getElementById("horas");
    let valorHoras = Number(campoHoras.value);
    let campoMeta = document.getElementById("meta");
    let valorMeta = Number(campoMeta.value);
        if (campoHoras.value === "" || campoMeta.value === "" || campoProducao.value === "") {
        resultado.textContent = "Erro: preencha todos os campos";
    return;
    }
      if (valorHoras <= 0 || valorMeta <= 0) {
        resultado.textContent = "Erro: horas e meta devem ser maiores que zero.";
    return;
    } 
    if (valorProducao < 0) {
        resultado.textContent = "Erro: a produção não pode ser negativa.";
    return;
    }
   

    let produtividadeCalculada = calcularProdutividadeHora(valorProducao, valorHoras);
    let percentualCalculado = calcularPercentual(valorProducao, valorMeta);
    let registro = {
        producao : valorProducao,
        horas : valorHoras,
        meta : valorMeta,
        produtividade : produtividadeCalculada,
        percentual : percentualCalculado
    }
    console.log(registro);
    historico.push(registro);

    localStorage.setItem("historico", JSON.stringify(historico));

    console.log(historico);
  

    localStorage.setItem("ultimoRegistro", JSON.stringify(registro));
    console.log(`Produção informada: ${valorProducao}`);
    console.log(`Horas Informadas: ${valorHoras}`);
    console.log(`Meta Informada: ${valorMeta}`);
    resultado.textContent = `produtividade: ${produtividadeCalculada} unidades/hora | Meta atingida ${percentualCalculado}%`;
    atualizarHistorico();
});
