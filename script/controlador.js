function recalcularTudo() {
  filtrarTabela("skills-table");
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
  
  despertar();
  atualizarBarraCorrupcao(corrupcao, max);
  calcularBonusClasse();
  calcularVida();
  calcularEstamina();
  contarVantagens();
  calcularCustoHabilidades();
  calcularCustoDefesas();
  calcularCustoVantagens();
  calcularCustoPericias();
  calcularCustoPoderes();
  calcularCustoEfeitosAlternativos();
  calcularPontosEquipamento();
  calcularCustoEquipamento();
  calcularTotalPontos();

  copiaValor("personagem", "personagem-nome-combate");
  copiaValor("vida", "vida-maxima-combate");
  copiaValor("estamina", "estamina-maxima-combate");
  copiaValor("nivelPoder", "nivel-poder-combate");
  calcularDeslocamento("nivel-deslocamento", "deslocamento-combate");
  atualizarBarra("barra-vida","vida-combate", "vida-maxima-combate");
  atualizarPercentual("percentual-vida", "vida-combate", "vida-maxima-combate");
  atualizarBarra("barra-estamina","estamina-combate", "estamina-maxima-combate");
  atualizarPercentual("percentual-estamina", "estamina-combate", "estamina-maxima-combate");
  calculoEsforcoExtra();
  atribuirRolagemDano("nivel-dano", "rolagem-dano");
  ajustaRolagens();
}

function atualizarBarraCorrupcao(corrupcao, max) {
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

function atualizarBarra(barra, atual, maximo) {
  const barraEl = document.getElementById(barra);
  const valorAtual = Number(document.getElementById(atual).value) || 0;
  const valorMaximo = Number(document.getElementById(maximo).value) || 1;

  const percentual = Math.max(0, Math.min(1, (valorAtual / valorMaximo)));

  barraEl.style.width = percentual*100 + "%";
}

function atualizarPercentual(percentual, atual, maximo) {
  const divPercentual = document.getElementById(percentual);
  const valorAtual = Number(document.getElementById(atual).value) || 0;
  const valorMaximo = Number(document.getElementById(maximo).value) || 1;

  const pctDestino = Math.max(0, Math.min(1, (valorAtual / valorMaximo))) * 100;
  
  const startPct = Number(divPercentual.textContent.slice(0,-2)) || 0;
  const duration = 500;
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    
    // Linear interpolation: current = start + (target - start) * progress
    const currentVal = startPct + (pctDestino - startPct) * progress;
    
    divPercentual.textContent = currentVal.toFixed(1) + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function calcularDeslocamento(campo, destino) {
  const agilidade = parseInt(document.getElementById(campo).value, 10);
  let deslocamento = 0;
  if(agilidade >= 0){
    deslocamento = (agilidade + 1)*1.5;
  }else if(agilidade < 0){
    deslocamento = Math.pow(2, agilidade+1);
    deslocamento = deslocamento.toFixed(2)
  }
  document.getElementById(destino).value = deslocamento + " m";
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
  const pondosPod = Number(document.getElementById("total-pontos-poderes").value);

  custoPontos = pontosHab + pontosVan + pontosDef + pontosPer + pondosPod;

  const totalPersonagem = document.getElementById("total-personagem");
  totalPersonagem.value = custoPontos;

  const pontosTotal = document.getElementById("totalPontos");

  document.getElementById("total-pontos").value = Number(pontosTotal.value) || 0;

  var pontosRestantes = Number(pontosTotal.value) - Number(totalPersonagem.value);

  document.getElementById("restando-pontos").value = pontosRestantes;
}
