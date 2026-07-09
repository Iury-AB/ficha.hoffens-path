const descCondicoes = {
  "normal": " não está sob o efeito de nenhuma condição, podendo agir normalmente.",
  "atordoado": " não pode executar ações, nem mesmo ações livres. Realize um teste ao final de cada turno para remover a condição.",

  "compelido": " está limitado a ações livres e a uma única ação padrão por turno, com todas as ações sendo escolhidas pelo personagem que o controla. Realize um teste ao final de cada turno para remover a condição.",

  "controlado": " não tem vontade própria; suas ações em cada turno são ditadas pelo personagem que o controla. É necessário ajuda externa para remover a condição.",

  "desabilitado": " sofre uma penalidade de circunstância de -5 em todos os testes. Realize um teste ao final de cada turno para remover a condição.",

  "debilitado": " tem uma ou mais das habilidades reduzida para abaixo de -5. Você sofre efeitos mais sérios que apenas uma penalidade.\n - Força, Agilidade ou Destreza debilitadas significam que o personagem entra em colapso: fica indefeso, imobilizado e atordoado (embora continue consciente).\n - Vigor debilitado significa que o personagem está morrendo, e que sofre um modificador de -5 em testes de Fortitude para evitar a morte.\n - Luta debilitada significa que o personagem está tonto e indefeso, e não pode realizar ataques corpo-a-corpo.\n - Intelecto, Prontidão e Presença debilitados significam que o personagem está desatento.\nCaso se aplique à(s) mesma(s) característica(s), debilitado se sobrepõe a desabilitado.",

  "desatento": " tem um (ou mais) dos sentidos completamente inutilizado, está incapaz de interagir ou de fazer testes de Percepção ou executar qualquer ação baseada nele(s). É necessário ajuda externa para remover a condição.",

  "fatigado": " se move a metade de seu movimento normal. Pode se recuperar da condição fatigado com uma hora de descanso ou com a ação Recuperar-se.",

  "imovel": " não pode se mover do lugar em que se encontra, embora ainda seja capaz de executar ações. Realize um teste ao final de cada turno para remover a condição.",

  "impedido": " se move a metade de seu movimento normal.  Realize um teste ao final de cada turno para remover a condição.",

  "indefeso": " está com suas defesas ativas igual a 0. Atacantes podem te acertar com testes de rotina. Se o atacante preferir fazer um teste de ataque normal, todos os acertos serão tratados como acertos críticos. Realize um teste ao final de cada turno para remover a condição.",
  
  "prejudicado": " sofre uma penalidade de circunstância de -2 em todos os testes. Realize um teste ao final de cada turno para remover a condição. Caso se aplique à(s) mesma(s) característica(s), desabilitado se sobrepõe a prejudicado.",

  "tonto": " é incapaz de realizar mais do que uma única ação padrão e ações livres por turno. Realize um teste ao final de cada turno para remover a condição.",

  "transformado": " teve alguma ou todas as suas características alteradas, desde a aparência do personagem a uma mudança completa das graduações de suas características ou a adição de outras. É necessário ajuda externa para remover a condição.",

  "vulneravel": " têm sua habilidade de se defender limitada, dividindo suas defesas ativas pela metade. Realize um teste ao final de cada turno para remover a condição.",

  "adormecido": " está indefeso (defesas ativas zeradas), atordoado (não pode executar ações) e desatento (sentidos inutilizados). É necessário um teste de Percepção com três ou mais graus de sucesso para o personagem ouvir e acordar, removendo todas estas condições. Qualquer movimento brusco ou efeito que permita um teste de salvamento acorda o personagem.",

  "amarrado": " está indefeso (defezas ativas zeradas), imóvel e prejudicado (penalidade de -2 em testes). É necessário uma ação de movimento com um teste de Atletismo ou Acrobacia contra o teste de rotina de Força ou efeito de agarrar do seu oponente; em caso de sucesso, você ainda pode se mover normalmente, mas caso falhe, permanece agarrado.",

  "caido": " sofre uma penalidade de -5 em testes de combate corpo-a-corpo. Os oponentes ganham um bônus de +5 em testes de combate corpo-a-corpo, mas sofrem uma penalidade de -5 em testes de ataque à distância; além disso, seu deslocamente é reduzido pela metade. Ficar de pé é uma ação de movimento.",

  "cego": " está impedido (metade do deslocamento), visualmente desatento e vulnerável (metade das defesas ativas), e pode estar prejudicado (penalidade de -2) ou desabilitado (penalidade de -5) para atividades em que a visão é um fator. É necessário ajuda externa para remover a condição.",

  "exausto": " está prejudicado (penalidade de -2 em testes) e impedido (metade do deslocamento). Pode se recuperar da condição exausto com uma hora de descanso em um lugar confortável ou com a ação Recuperar-se, que troca Exausto por Fatigado.",

  "incapacitado": " está indefeso (defesas zeradas), atordoado (incapaz de agir), desatento (sentidos inutilizados) e caído (a não ser que uma força externa o mantenha de pé). É necessário ajuda externa para remover a condição.",

  "morrendo": " está incapacitado (indefeso, atordoado e desatento) e recebe uma contagem regressiva de três turnos seus. Ao se completarem esses 3 turnos e ainda estiver com essa condição, morre definitivamente. Remover a condição morrendo exige um teste de Tratamento (ou do poder Cura) contra a DT 30.",

  "paralisado": " está indefeso (defesas zeradas), imóvel e fisicamente atordoado (incapaz de agir), mas se mantém consciente e capaz de executar ações puramente mentais, que não envolvam qualquer tipo de movimento físico. É necessário ajuda externa para remover a condição.",

  "restrito": " está impedido (metade do deslocamento) e vulnerável (metade das defesas ativas). É necessário uma ação de movimento com um teste de Atletismo ou Acrobacia contra o teste de rotina de Força ou efeito de agarrar do seu oponente; em caso de sucesso, você ainda pode se mover normalmente, mas caso falhe, permanece restrito.",

  "surdo": " não ouve, concedendo cobertura auditiva total contra você. Isso pode permitir ataques de surpresa contra o personagem desatento. É necessário ajuda externa para remover a condição.",

  "surpreso": " está atordoado (incapaz de agir) e vulnerável (metade das defesas ativas) por uma rodada, após isso ela é removida sem a necessidade de testes. Esquiva Fabulosa garante imunidade contra essa condição.",

  "transe": " está atordoado (incapaz de agir). Qualquer ameaça óbvia quebra o transe, um teste de perícias de interação de um aliado também pode remover essa condição.",

  "combustao": " recebe (3d6/6d6/12d6) de dano no fim de cada um de seus turnos e também imediatamente após receber a condição. Com uma ação padrão é possível remover todos os níveis de combustão que estiver sofrendo. Essa condição tem o descritor de fogo. Realize um teste ao final de cada turno para remover a condição.",

  "sangramento": " recebe (3d4/6d4/12d4) de dano no fim de cada um de seus turnos e também imediatamente após receber a condição. Realize um teste ao final de cada turno para remover a condição",

  "envenenamento": " recebe (3/6/12) de dano no fim de cada um de seus turnos e também imediatamente após receber a condição,  também fica (Prejudicado/Prejudicado/Exausto). Essa condição tem o descritor veneno. Realize um teste ao final de cada turno para remover a condição",

  "fluxo": " está em estado de fluxo após um acerto crítico em combate e recebe um bônus de +2 em todos os testes nesse combate pelos próximos (1d4) turnos.",

  "receoso": " está receoso após uma falha desastrosa em combate e recebe uma penalidade de -2 em todos os testes nesse combate pelos próximos (1d4) turnos."
}

const condicoesModificadores = {
  "desabilitado": "Desabilitado [-5]",
  "fluxo": "Fluxo [+2]",
  "prejudicado": "Prejudicado [-2]",
  "receoso": "Receoso [-2]",
  "exausto": "Exausto [-2]",
}

const condicoesDefesa = {
  "indefeso": "Indefeso",
  "vulneravel": "Vulnerável",
  "adormecido": "Adormecido",
  "cego": "Cego",
  "incapacitado": "Incapacitado",
  "morrendo": "Morrendo",
  "paralisado": "Paralisado",
  "restrito": "Restrito",
  "surpreso": "Surpreso",
  "amarrado": "Amarrado",
}

const aplicarEfeito = {
  "desabilitado": () => {
    adicionarAoModificadorGlobal(-5); 
  },
  "prejudicado": () => {
    adicionarAoModificadorGlobal(-2);
  },
  "exausto": () => {
    adicionarAoModificadorGlobal(-2);
    aplicarModificadorDeslocamento(0.5, "#ff0000");
  },
  "fatigado": () => {
    aplicarModificadorDeslocamento(0.5, "#ff0000");
  },
  "impedido": () => {
    aplicarModificadorDeslocamento(0.5, "#ff0000");
  },
  "caido": () => {
    aplicarModificadorDeslocamento(0.5, "#ff0000");
  },
  "imovel": () => {
    aplicarModificadorDeslocamento(0, "#ff0000");
  },
  "vulneravel": () => {
    aplicarModificadorDefesas(0.5, "#ff0000", "aparar-combate");
    aplicarModificadorDefesas(0.5, "#ff0000", "esquiva-combate");
  },
  "indefeso": () => {
    aplicarModificadorDefesas(0, "#ff0000", "aparar-combate");
    aplicarModificadorDefesas(0, "#ff0000", "esquiva-combate");
  },
  "fluxo": () => {
    adicionarAoModificadorGlobal(2);
  },
  "receoso": () => {
    adicionarAoModificadorGlobal(-2);
  },
  "surpreso": () => {
    aplicarModificadorDefesas(0.5, "#ff0000", "aparar-combate");
    aplicarModificadorDefesas(0.5, "#ff0000", "esquiva-combate");
  }
};


function atribuirDescricaoCondicao(condicao) {
  if(!document.getElementById(condicao)) return;

  var nomePersonagem = document.getElementById("personagem").value || "Personagem";
  nomePersonagem = nomePersonagem.split(" ")[0];

  var descricao = nomePersonagem + descCondicoes[condicao];
  
  document.getElementById("descricao-condicao").value = descricao;
}

function adicionarCondicaoSelect() {
  const selectCondicao = document.getElementById("condicoes-personagem");
  const condicao = selectCondicao.selectedOptions[0].text
  const condicaoValue = selectCondicao.value;

  adicionarCondicao(condicaoValue, condicao);
}

function adicionarCondicao(id, nome) {
  // Verificar se a condicao já está atribuída
  if(document.getElementById(id)){
    return
  }

  const listaCondicoes = document.getElementById("lista-condicoes");

  // Se a condição a ser adicionada for "normal", as demais são removidas
  if(id == "normal") {
    const condicoes = document.querySelectorAll(".condicao");
    condicoes.forEach(condicao => {
      let condicaoId = condicao.id;
      removerCondicao(condicaoId);
    });
  } else if (document.getElementById("normal")) {
    // Se a condição a ser adicionada não for "normal", a condição "normal" é removida
    document.getElementById("normal").remove();
  }

  // Algumas condições se sobrepõe a outras
  const sobreposicao = {
    "controlado": ["compelido"],
    "imovel": ["impedido"],
    "atordoado": ["tonto"],
    "indefeso": ["vulneravel"],
    "adormecido": ["indefeso", "vulneravel", "atordoado", "caido", "impedido"] ,
    "amarrado": ["indefeso", "vulneravel", "imovel", "impedido", "prejudicado"],
    "caido": ["impedido"],
    "cego": ["impedido", "vulneravel"],
    "impedido": ["fatigado"],
    "desabilitado": ["prejudicado"],
    "exausto": ["prejudicado", "impedido", "fatigado"],
    "incapacitado": ["indefeso", "atordoado", "tonto", "caido", "impedido", "fatigado", "exausto"],
    "morrendo": ["incapacitado","indefeso", "atordoado", "tonto", "caido", "impedido", "exausto", "fatigado"],
    "paralisado": ["indefeso", "vulneravel", "imovel", "impedido", "atordoado", "tonto"],
    "restrito": ["impedido", "vulneravel"],
    "transe": ["atordoado"],
    "fluxo": ["receoso"],
    "receoso": ["fluxo"]
  };

  const sobrepostas = sobreposicao[id];

  if (sobrepostas) {
    sobrepostas.forEach(alvo => {
      removerCondicao(alvo);
    });
  }

  listaCondicoes.innerHTML = listaCondicoes.innerHTML + `
  <div class="condicao" id="${id}" onclick="atribuirDescricaoCondicao('${id}')">
    ${nome}
    <button class="remover-condicao" onclick="removerCondicao('${id}')">X</button>
  </div>
  `
}

var listaCondicoesModificadores = "";

function adicionarListaCondicoesModificadores (condicao) {
  let condicaoSomada = "";
  let condicaoParcela = (condicao in condicoesModificadores) ? condicoesModificadores[condicao] : condicoesDefesa[condicao];
  console.log(condicao);
  console.log(condicoesDefesa[condicao]);

  if(listaCondicoesModificadores) {
    condicaoSomada = listaCondicoesModificadores + ", " + condicaoParcela;
  } else {
    condicaoSomada = condicaoParcela;
  }
  return condicaoSomada;
}

function aplicarModificadorDeslocamento(fator, cor) {
  const deslocamento = document.getElementById("deslocamento-combate");
  const nivelDeslocamento = Number(document.getElementById("nivel-deslocamento").value) || 0;
  
  deslocamento.value = (calculoDeslocamento(nivelDeslocamento) * fator) + " m";
  deslocamento.style.backgroundColor = cor;
}

function aplicarModificadorDefesas(fator, cor, defesa) {
  const defesaCampo = document.getElementById(defesa);
  defesaCampo.style.backgroundColor = cor;
  defesaCampo.value = Math.floor(defesaCampo.value * fator);
}

function removerCondicao(condicao) {
  const condicaoEl = document.getElementById(condicao);
  
  if(condicaoEl) {
    condicaoEl.remove();
    recalcularTudo();
    checkModificadorGlobal();
    
    document.getElementById("descricao-condicao").value = "";
  }
  
}

var modificadorGlobalCondicao = 0;

function adicionarAoModificadorGlobal(valor) {
  modificadorGlobalCondicao += valor;
}

function checkModificadorGlobal() {
  const modificadores = document.querySelectorAll(".modificadores-teste");
  
  modificadores.forEach(modif => {

    if (modificadorGlobalCondicao < 0) {
      modif.innerHTML = modificadorGlobalCondicao;
      modif.classList.add("penalidade");
      modif.classList.remove("bonus");
    }
    else if (modificadorGlobalCondicao > 0){
      modif.innerHTML = "+" + modificadorGlobalCondicao;
      modif.classList.add("bonus");
      modif.classList.remove("penalidade");
    }
    else {
      modif.classList.remove("bonus");
      modif.classList.remove("penalidade");
    }
  });

}

function checkCondicoes() {
  listaCondicoesModificadores = "";
  modificadorGlobalCondicao = 0;

  const deslocamento = document.getElementById("deslocamento-combate");
  deslocamento.style.backgroundColor = "transparent";

  const apararCampo = document.getElementById("aparar-combate");
  apararCampo.style.backgroundColor = "transparent";

  const esquivaCombate = document.getElementById("esquiva-combate");
  esquivaCombate.style.backgroundColor = "transparent";
  
  const condicoes = document.querySelectorAll(".condicao");
  const conjuntoCondicoes = new Set();

  // Algumas condições se sobrepõe a outras
  const sobreposicao = {
    "imovel": ["impedido"],
    "indefeso": ["vulneravel"],
    "caido": ["impedido"],
    "impedido": ["fatigado"],
    "desabilitado": ["prejudicado"],
    "transe": ["atordoado"]
  };

  const combinadas = {
    "restrito": ["impedido", "vulneravel"],
    "cego": ["impedido", "vulneravel"],
    "adormecido": ["indefeso", "atordoado"] ,
    "amarrado": ["indefeso", "imovel", "prejudicado"],
    "exausto": ["prejudicado", "impedido"],
    "incapacitado": ["indefeso", "atordoado", "caido"],
    "morrendo": ["indefeso", "atordoado", "caido"],
    "paralisado": ["indefeso","imovel", "atordoado"],
  }

  condicoes.forEach(condicao => {
    const condicaoId = condicao.id;

    if (combinadas[condicaoId]) {
      combinadas[condicaoId].forEach(parte => {
        conjuntoCondicoes.add(parte);
      });
    } else {
      conjuntoCondicoes.add(condicaoId);
    }
    
  });

  for (const condicaoForte in sobreposicao) {
    if (conjuntoCondicoes.has(condicaoForte)) {
      sobreposicao[condicaoForte].forEach(condicaoFraca => {
        conjuntoCondicoes.delete(condicaoFraca);
      });
    }
  }

  conjuntoCondicoes.forEach(condicaoReal => {
    if (aplicarEfeito[condicaoReal]) {
      aplicarEfeito[condicaoReal]();
    }
    if(condicoesModificadores[condicaoReal]) {
      listaCondicoesModificadores = adicionarListaCondicoesModificadores(condicaoReal);
    }
  });

}