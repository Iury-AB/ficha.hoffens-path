function exportarFicha() {
  removerVantagens();
  const dados = {};
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id) {
      dados[el.id] = el.value;
    }
  });

  const ficha = {
    dados,
    contadorVantagens
  };

  const blob = new Blob(
    [JSON.stringify(ficha, null, 2)],
    { type: "application/json" }
  );

  const nome = document.getElementById("personagem").value;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ficha-${nome}.json`;
  link.click();
}

function importarFicha(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const json = JSON.parse(reader.result);
    const dados = json.dados;
    const nVantagens = json.contadorVantagens || 0;

    const listaVantagens = document.getElementById("lista-vantagens");
    listaVantagens.innerHTML = "";
    contadorVantagens = 0;

    for (let i = 0; i < nVantagens; i++) {
      adicionarVantagem();
    }

    Object.keys(dados).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = dados[id];
    });

    // recalcula campos automáticos
    if (typeof recalcularTudo === "function") {
      recalcularTudo();
    }

    const nome = document.getElementById("personagem").value;
    document.getElementById("pagina").innerHTML = nome;
  };
  
  reader.readAsText(file);
}

function getIndex() {
  return JSON.parse(localStorage.getItem("fichas:index")) || [];
}

function saveIndex(index) {
  localStorage.setItem("fichas:index", JSON.stringify(index));
}

function carregarIndex() {
  const select = document.getElementById("listaFichas");
  const index = JSON.parse(localStorage.getItem("fichas:index")) || [];

  // limpa o select
  select.innerHTML = "";

  // opção padrão
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "— selecionar personagem —";
  select.appendChild(placeholder);

  // adiciona as fichas
  index.forEach(nome => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    select.appendChild(option);
  });
}

function salvarFicha() {
  removerVantagens();
  const dados = {};

  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id) dados[el.id] = el.value;
  });

  const nome = document.getElementById("personagem").value;

  localStorage.setItem(`ficha:${nome}`, JSON.stringify(dados));
  localStorage.setItem(`contadorVantagens:${nome}`, contadorVantagens);

  document.getElementById("pagina").innerHTML = nome;

  const index = getIndex();
  if (!index.includes(nome)) {
    index.push(nome);
    saveIndex(index);
  }

  carregarIndex();
}

function carregarFicha(nome) {
  const dados = JSON.parse(localStorage.getItem(`ficha:${nome}`));
  if (!dados) return;

  const nVantagens = JSON.parse(localStorage.getItem(`contadorVantagens:${nome}`));

  const listaVantagens = document.getElementById("lista-vantagens");
  listaVantagens.innerHTML = "";

  contadorVantagens = 0;

  for (let index = 0; index < nVantagens; index++) {
    adicionarVantagem();
  }

  Object.keys(dados).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = dados[id];
  });

  document.getElementById("pagina").innerHTML = nome;
  recalcularTudo();
}

function deletarFicha() {

  const nome = document.getElementById("personagem").value;

  localStorage.removeItem(`ficha:${nome}`);
  localStorage.removeItem(`contadorVantagens:${nome}`);

  const index = getIndex().filter(n => n !== nome);
  saveIndex(index);

  carregarIndex();
}

function limparFicha() {
  // limpa inputs, selects e textareas
  document.querySelectorAll("input, textarea, select").forEach(el => {

    // não limpa botões, file inputs ou readonly calculados
    if (
      el.type === "button" ||
      el.type === "submit" ||
      el.type === "file" ||
      el.readOnly
    ) return;

    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
  });

  contadorVantagens = 0;
  const listaVantagens = document.getElementById("lista-vantagens");
  listaVantagens.innerHTML = "";

  // limpa seleção de ficha
  const lista = document.getElementById("listaFichas");
  if (lista) lista.value = "";

  // recalcula campos automáticos
  if (typeof recalcularTudo === "function") {
    recalcularTudo();
  }

  document.getElementById("pagina").innerHTML = "Ficha de Personagem";
}

carregarIndex();

function calcularTotalAtributo(hab, grad, def, ot){
  const habilidade = Number(document.getElementById(hab).value) || 0;
  const graduacao = Number(document.getElementById(grad).value) || 0;
  const outros = Number(document.getElementById(ot).value) || 0;

  document.getElementById(def).value = habilidade + graduacao + outros
}

function copiaValor(fonte, destino) {
  const valorFonte = Number(document.getElementById(fonte).value) || 0;
  document.getElementById(destino).value = valorFonte;
}

function npLimit(limitWith, limitedStat){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const res = document.getElementById(limitWith).value;

  document.getElementById(limitedStat).value = parseInt(2*NP-res);
}

function limitePericia(pericia){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const hab = Number(document.getElementById(`${pericia}-hab`).value) || 0;
  const outros = Number(document.getElementById(`${pericia}-outros`).value) || 0;

  let limite = NP+10 - hab - outros;
  document.getElementById(`${pericia}-max`).value = limite;
}

function limiteCombate(acerto){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const hab = Number(document.getElementById(`${acerto}-hab`).value) || 0;
  const outros = Number(document.getElementById(`${acerto}-outros`).value) || 0;

  let limite = NP*2 - hab - outros;
  document.getElementById(`${acerto}-max`).value = limite;
}

function limitResistencia(){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const aparar = Number(document.getElementById("aparar-total").value) || 0;
  const esquiva = Number(document.getElementById("esquiva-total").value) || 0;
  let valorDefesa = 0;
  if (esquiva > aparar) {
    valorDefesa= esquiva;
  }
  else{
    valorDefesa = aparar;
  }

  document.getElementById("resistencia-max").value = 2*NP-valorDefesa;
}

function recalcularTudo() {
  calcularTotalAtributo("agilidade","esquiva-grad","esquiva-total","esquiva-outros");
  calcularTotalAtributo("luta","aparar-grad","aparar-total","aparar-outros");
  calcularTotalAtributo("vigor","fortitude-grad","fortitude-total","fortitude-outros");
  calcularTotalAtributo("vigor","resistencia-grad","resistencia-total","resistencia-outros");
  calcularTotalAtributo("prontidao","vontade-grad","vontade-total","vontade-outros");
  npLimit("resistencia-total","esquiva-max");
  npLimit("resistencia-total","aparar-max");
  npLimit("fortitude-total","vontade-max");
  npLimit("vontade-total","fortitude-max");
  npLimit("fortitude-total","vontade-max");
  limitResistencia();
  
  const pericias = {
    acrobacia: "agilidade",
    atletismo: "forca",

    ccc1: "luta",        // Combate Corpo-a-Corpo
    ccc2: "luta",
    ccc3: "luta",

    cad1: "destreza",   // Combate à Distância
    cad2: "destreza",
    cad3: "destreza",

    enganacao: "presenca",

    especialidade1: "intelecto",
    especialidade2: "intelecto",
    especialidade3: "intelecto",
    especialidade4: "intelecto",

    furtividade: "agilidade",
    intimidacao: "presenca",
    intuicao: "prontidao",
    investigacao: "intelecto",
    percepcao: "prontidao",
    persuasao: "presenca",
    prestidigitacao: "destreza",
    tecnologia: "intelecto",
    tratamento: "intelecto",
    veiculos: "destreza"
  };

  Object.entries(pericias).forEach(([pericia, atributo]) => {
    copiaValor(atributo, `${pericia}-hab`);

    if(["ccc1","ccc2","ccc3","cad1","cad2","cad3"].includes(pericia)){
      limiteCombate(pericia);
    } else {
      limitePericia(pericia);
    }
    
    calcularTotalAtributo(
      `${pericia}-hab`,
      `${pericia}-grad`,
      `${pericia}-total`,
      `${pericia}-outros`,
      atributo
    );
  });

  const corrupcao = document.getElementById("corrupcao");
  const max = document.getElementById("corrupcao-maximo");

  atualizarBarra(corrupcao, max);
  calcularBonusClasse();
  calcularVida();
  calcularEstamina();
  contarVantagens();
  calcularCustoHabilidades();
  calcularCustoDefesas();
  calcularCustoVantagens();
  calcularCustoPericias();
  calcularTotalPontos();
}

function filtrarTabela(tabela) {
  const filtro = document.getElementById("tableFilter").value.toLowerCase();
  const linhas = document.querySelectorAll(`#${tabela} tbody tr`);

  linhas.forEach(linha => {
    if (linha.classList.contains("header-row")) {
      linha.style.display = "";
      return;
    }

    const texto = linha.textContent.toLowerCase();
    linha.style.display = texto.includes(filtro) ? "" : "none";
  });
}

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("dependente")) {
    recalcularTudo();
  }
});


function atualizarBarra(corrupcao, max) {
  const valor = Number(corrupcao.value) || 0;
  const limite = Number(max.value) || 1;

  const percentual = Math.max(0, Math.min(1, (valor / limite)));

  barra.style.width = percentual*100 + "%";

  if(percentual < 0.5){
    barra.style.background = `rgb(0,0,${255-510*percentual})`;
  }else if(percentual >= 0.5 && percentual < 1){
    barra.style.background = `rgb(${(2*percentual-0.5)*255}, 0, 0)`;
  }else if(percentual >= 1){
    barra.style.background = "rgb(255,0,0)";
  }
}

function calcularVida () {
  const vigor = document.getElementById("vigor").value;
  var vida = 0;
  if (vigor == 0) {
    vida = 5;
  }
  else if (vigor == 1){
      vida = "10";
  }
  else if (vigor == 2){
      vida = "20";
  }
  else if (vigor == 3){
      vida = "40";
  }
  else if (vigor == 4){
      vida = "60";
  }
  else if (vigor == 5){
      vida = "100";
  }
  else if (vigor == 6){
      vida = "140";
  }
  else if (vigor == 7){
      vida = "180";
  }
  else if (vigor == 8){
      vida = "230";
  }
  else if (vigor == 9){
      vida = "280";
  }
  else if (vigor == 10){
      vida = "330";
  }
  else if (vigor == 11){
      vida = "390";
  }
  else if (vigor == 12){
      vida = "450";
  }
  else if (vigor == 13){
      vida = "510";
  }
  else if (vigor == 14){
      vida = "570";
  }
  else if (vigor == 15){
      vida = "630";
  }
  else if (vigor == 16){
      vida = "700";
  }
  else if (vigor == 17){
      vida = "770";
  }
  else if (vigor == 18){
      vida = "840";
  }
  else if (vigor == 19){
      vida = "910";
  }
  else if (vigor == 20){
      vida = "980";
  }
  else if (vigor == 21){
      vida = "1050";
  }
  else if (vigor == 22){
      vida = "1120";
  }
  else if (vigor == 23){
      vida = "1190";
  }
  else if (vigor == 24){
      vida = "1260";
  }
  else if (vigor == 25){
      vida = "1330";
  }
  else if (vigor == 26){
      vida = "1440";
  }
  else if (vigor == 27){
      vida = "1470";
  }
  else if (vigor == 28){
      vida = "1540";
  }
  else if (vigor == 29){
      vida = "1610";
  }
  else if (vigor == 30){
      vida = "1680";
  }
  else {
      vida = "0";
  }

  const vida_extra = Number(document.getElementById("vida-outros").value) || 0;
  const vida_classe = Number(document.getElementById("vida-classe").value) || 0;
  document.getElementById("vida").value = Number(vida) + vida_extra + vida_classe;
}

function calcularEstamina() {
  const vida = document.getElementById("vida").value;
  const vida_num = Number(vida) || 0;

  var estamina = Math.floor(vida_num/2);

  const estamina_extra = Number(document.getElementById("estamina-outros").value) || 0;
  const estamina_classe = Number(document.getElementById("estamina-classe").value) || 0;

  document.getElementById("estamina").value = estamina + estamina_classe + estamina_extra;
}

function calcularBonusClasse() {
  const classe = document.getElementById("classe").value;
  const corrupcao = Number(document.getElementById("corrupcao").value);
  var vidaBonus = 0;
  var estaminaBonus = 0;
  
  if (classe == "Atirador") {
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 45) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 55) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
  }else if (classe == "Belico"){
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 45) {
        vidaBonus = vidaBonus + 5;
        estaminaBonus = estaminaBonus + 3;
    }
      if (corrupcao >= 55) {
        vidaBonus = vidaBonus + 5;
        estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
  }else if (classe == "Guardiao"){
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 45) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 55) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
  }else if (classe == "Ajudante"){
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 45) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 55) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
  }

  document.getElementById("vida-classe").value = vidaBonus;
  document.getElementById("estamina-classe").value = estaminaBonus;

}

function contarVantagens() {
  const totalClasse = document.getElementById("vantagens-classe");
  const totalCombate = document.getElementById("vantagens-combate");
  const totalGeral = document.getElementById("vantagens-geral");
  const totalPericia = document.getElementById("vantagens-pericia");
  const totalSorte = document.getElementById("vantagens-sorte");

  var classe = 0;
  var combate = 0;
  var geral = 0;
  var pericia = 0;
  var sorte = 0;

  document.querySelectorAll(".tipo-vantagem").forEach(vantagem => {
    if (vantagem.value == "classe") {
      classe++;
    } else if (vantagem.value == "combate") {
      combate++;
    } else if (vantagem.value == "geral") {
      geral++;
    } else if (vantagem.value == "pericia") {
      pericia++;
    } else if(vantagem.value == "sorte") {
      sorte++;
    }
  });

  totalClasse.value = classe;
  totalCombate.value = combate;
  totalGeral.value = geral;
  totalPericia.value = pericia;
  totalSorte.value = sorte;
}

function calcularCustoHabilidades () {
  let custoHabilidade = 0;
  document.querySelectorAll(".habilidade").forEach(habilidade => {
    const nivel = Number(habilidade.value) || 0;
    custoHabilidade += nivel * 2;
  });

  document.getElementById("total-pontos-habilidades").value = custoHabilidade;
}

function calcularCustoDefesas () {
  let custoDefesas = 0;
  document.querySelectorAll(".defesa").forEach(defesa => {
    const nivel = Number(defesa.value) || 0;
    custoDefesas += nivel;
  });

  document.getElementById("total-pontos-defesas").value = custoDefesas;
}

function calcularCustoVantagens () {
  let custoVantagens = 0;
  document.querySelectorAll(".vantagem").forEach(vantagem => {
    const nivel = Number(vantagem.value) || 0;
    custoVantagens += nivel;
  });

  document.getElementById("total-pontos-vantagens").value = custoVantagens;
}

function calcularCustoPericias () {
  let custoPericias = 0;
  document.querySelectorAll(".pericia").forEach(pericia => {
    const nivel = Number(pericia.value) || 0;
    custoPericias += Math.ceil(nivel/2);
  });

  document.getElementById("total-pontos-pericias").value = custoPericias;
}


function calcularTotalPontos () {
  let custoPontos = 0;

  const pontosHab = Number(document.getElementById("total-pontos-habilidades").value);
  const pontosVan = Number(document.getElementById("total-pontos-vantagens").value);
  const pontosPer = Number(document.getElementById("total-pontos-pericias").value);
  const pontosDef = Number(document.getElementById("total-pontos-defesas").value);

  custoPontos = pontosHab + pontosVan + pontosDef + pontosPer;

  document.getElementById("total-personagem").value = custoPontos;
}