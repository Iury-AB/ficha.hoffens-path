function subtrairVida(dano, pctEstamina) {
  const icon = document.getElementById("container-img");

  const resistencia = Number(document.getElementById("resistencia-total").value) || 0;
  var reducao;
  const danoSofrido = Number(document.getElementById(dano).value) || 0;
  const vidaAtual = document.getElementById("vida-combate");
  const pct = Number(document.getElementById(pctEstamina).value) || 0;

  const subtrairRes = document.getElementById("sub-res");

  if(subtrairRes.checked) {
    if(danoSofrido > resistencia){
      vidaAtual.value = Number(vidaAtual.value) - danoSofrido + resistencia;
      reducao = Math.floor((danoSofrido - resistencia) * pct/100);

      icon.classList.toggle("dano-shake");

      icon.addEventListener('animationend', () => {
        icon.classList.remove('dano-shake');
      }, { once: true });
    } 
    else {
      reducao = 0;
    }
  }
  else{
    vidaAtual.value = Number(vidaAtual.value) - danoSofrido;
    reducao = Math.floor((danoSofrido) * pct/100);

    icon.classList.toggle("dano-shake");

    icon.addEventListener('animationend', () => {
      icon.classList.remove('dano-shake');
    }, { once: true });
  }
  subtrairEstamina(reducao);
  
  return danoSofrido
}

function subtrairEstamina(reducao) {
  const estaminaAtual = document.getElementById("estamina-combate");
  estaminaAtual.value = estaminaAtual.value - reducao;
  recalcularTudo();
  return reducao;
}

function calculoEsforcoExtra() {
  const estamina = Number(document.getElementById("estamina-maxima-combate").value) || 0;

  document.getElementById("esforco-20").value = Math.floor(estamina*0.2);
  document.getElementById("esforco-50").value = Math.floor(estamina*0.5);
}

function determinarRolagemDano(thisDano) {
  if (thisDano < 0 || thisDano > 20) {
    return "---";
  }

  return listaDano[thisDano];
}

const listaDano = {
  0:  "1",
  1:  "1d4+1",
  2:  "2d4+2",
  3:  "3d4+3",
  4:  "3d6+4",
  5:  "4d6+5",
  6:  "4d8+6",
  7:  "5d8+7",
  8:  "5d10+8",
  9:  "6d10+9",
  10: "6d12+10",
  11: "7d12+11",
  12: "8d12+12",
  13: "9d12+13",
  14: "10d12+14",
  15: "7d20+15",
  16: "8d20+16",
  17: "9d20+17",
  18: "10d20+18",
  19: "11d20+19",
  20: "12d20+20"
};

function determinarRolagemCura(thisCura) {
  if (thisCura < 0 || thisCura > 20) {
    return "---";
  }

  return listaCura[thisCura];
}

const listaCura = {
  0:  "1",
  1:  "1d4",
  2:  "2d4",
  3:  "3d4",
  4:  "3d6",
  5:  "4d6",
  6:  "4d8",
  7:  "5d8",
  8:  "5d10",
  9:  "6d10",
  10: "6d12",
  11: "7d12",
  12: "8d12",
  13: "9d12",
  14: "10d12",
  15: "7d20",
  16: "8d20",
  17: "9d20",
  18: "10d20",
  19: "11d20",
  20: "12d20"	

}

function determinarDt(nivel, crit) {
  var dt = nivel+10;
  if(crit) {
    dt = dt+5;
  }
  return dt;
}

function atribuirRolagemDano(nvl, rolagem) {
  const nivelDano = Number(document.getElementById(nvl).value) || 0;
  const rolagemCampo = document.getElementById(rolagem);
  
  rolagemCampo.value = determinarRolagemDano(nivelDano);
}

function destacaCritico(linha) {
  const destacar = document.getElementById(linha);
  destacar.classList.toggle("critico");
}

function atribuirRolagemAtaque(ataque) {
  const ataqueLinha = document.getElementById(`linha-ataque-${ataque}`);
  const tipo = document.getElementById(`tipo-ataque-${ataque}`).value;
  const rolagem = ataqueLinha.querySelector(".dano");
  const nivel = Number(document.getElementById(`nivel-ataque-${ataque}`).value) || 0;
  const linhaRolagem = ataqueLinha.querySelector(".rolagem-ataque");
  const crit = document.getElementById(`critico-${ataque}-check`);
  
  if(tipo == "dano") {
    rolagem.value = determinarRolagemDano(nivel);
    linhaRolagem.firstChild.textContent = "Rolagem:";
    linhaRolagem.querySelector(".botao-rolar").style.display = "block";
    linhaRolagem.querySelector(".multiplicador").style.display = "block";
  } else if(tipo == "cura") {
    rolagem.value = determinarRolagemCura(nivel);
    linhaRolagem.firstChild.textContent = "Rolagem:";
    linhaRolagem.querySelector(".botao-rolar").style.display = "block";
    linhaRolagem.querySelector(".multiplicador").style.display = "block";
  } else if(tipo == "manobra") {
    rolagem.value = determinarDt(nivel, crit.checked);
    linhaRolagem.firstChild.textContent = "Dificuldade:";
    linhaRolagem.querySelector(".botao-rolar").style.display = "none";
    linhaRolagem.querySelector(".multiplicador").style.display = "none";
  }
}

function ajustaRolagens() {
  for (let ataque = 1; ataque <= contadorAtaques; ataque++) {
    atribuirRolagemAtaque(ataque);
  }
}

let contadorAtaques = 0;

function adicionarAtaque() {
  contadorAtaques++;
  
  const listaAtaques = document.querySelector(".lista-ataques");

  const novaLinha = document.createElement("div");
  novaLinha.className = "linha-ataque crita";
  novaLinha.id = `linha-ataque-${contadorAtaques}`;
  novaLinha.innerHTML = `
    <label for="nivel-ataque-${contadorAtaques}">
      Nível [<input type="number" name="nivel-ataque" id="nivel-ataque-${contadorAtaques}" class="campo-editavel dependente" placeholder="Nível">]
      <button class="botao-rolar" onclick="testeAtaque(${contadorAtaques})">
        <div class="modificadores-teste"></div>
        <img src="img/d20.png" alt="rolar-nivel-${contadorAtaques}" title="Rolar Ataque ${contadorAtaques}">
      </button>
    </label>

    <select name="tipo-ataque" id="tipo-ataque-${contadorAtaques}" class="campo-editavel dependente">
      <option value="selecione" selected>— Tipo do Ataque —</option>
      <option value="dano">Dano</option>
      <option value="cura">Cura</option>
      <option value="manobra">Manobra</option>
    </select>

    <input type="text" name="nome-ataque" id="nome-ataque-${contadorAtaques}" class="campo-editavel span-2" placeholder="Ataque ${contadorAtaques}">

    <label for="acerto-ataque-${contadorAtaques}">Acerto:
      <input type="number" name="acerto-ataque" id="acerto-ataque-${contadorAtaques}" class="campo-editavel dependente" placeholder="Acerto">
      <button class="botao-rolar" onclick="testeAcerto(${contadorAtaques})">
        <div class="modificadores-teste"></div>
        <img src="img/d20.png" alt="rolar-acerto-${contadorAtaques}" title="Rolar Acerto ${contadorAtaques}">
      </button>
    </label>

    <label for="rolagem-ataque-${contadorAtaques}" class="span-2 rolagem-ataque">Rolagem:
      <span class="multiplicador">2x</span>
      <input type="text" class="campo-calculado dano" id="rolagem-ataque-${contadorAtaques}" readonly>
      <button class="botao-rolar" onclick="testeRolagemAtaque(${contadorAtaques})">
        <img src="img/d20.png" alt="rolagem-ataque-${contadorAtaques}" title="Rolagem de Ataque ${contadorAtaques}">
      </button>
    </label>
    
    <label for="critico-ataque-${contadorAtaques}">Crítico:
      <input type="number" name="critico-ataque" id="critico-ataque-${contadorAtaques}" class="campo-editavel dependente" placeholder="Crit">
      <input type="checkbox" id="critico-${contadorAtaques}-check" onchange="destacaCritico('linha-ataque-${contadorAtaques}')" class="check-critico dependente">
      <label for="critico-${contadorAtaques}-check" class="critical-mark"></label>
    </label>
  `;
    
  listaAtaques.appendChild(novaLinha);
  trocaTema();
}

function removerAtaques() {
  document.querySelectorAll('input[name="nome-ataque"]').forEach(ataque => {
    if (ataque.value.trim() === "") {
      const linha = ataque.closest(".linha-ataque");
      if (linha) {
        linha.remove();
        contadorAtaques--;
      }
    }
  });

  const linhas = document.querySelectorAll(".linha-ataque");

  linhas.forEach((linha, index) => {
    const numero = index+1;

    const lvl = linha.querySelector('input[name="nivel-ataque"]');
    const tipo = linha.querySelector('select[name="tipo-ataque"]');
    const nome = linha.querySelector('input[name="nome-ataque"]');
    const acerto = linha.querySelector('input[name="acerto-ataque"]');
    const rolagem = linha.querySelector('input[id$=rolagem-ataque]');
    const crit = linha.querySelector('input[name="critico-ataque"]');

    if (lvl) {
      lvl.id = `nivel-ataque-${numero}`;
      const botaoLvl = lvl.closest("button")
      botaoLvl.onclick = () => testeAtaque(numero);
      const imgLvl = botaoLvl.closest("img");
      imgLvl.title = `Rolar Ataque ${numero}`;
      imgLvl.alt = `rolar-nivel-${numero}`;
    }

    if (tipo) {
      tipo.id = `tipo-ataque-${numero}`;
    }

    if (nome) {
      nome.id = `nome-ataque-${numero}`;
      nome.placeholder = `Ataque ${numero}`
    }

    if(acerto) {
      acerto.id = `nivel-ataque-${numero}`;
      const botaoAcerto = acerto.closest("button")
      botaoAcerto.onclick = () => testeAcerto(numero);
      const imgAcerto = botaoAcerto.closest("img");
      imgAcerto.title = `Rolagem de Acerto ${numero}`;
      imgAcerto.alt = `rolar-acerto-${numero}`;
    }

    if(rolagem) {
      rolagem.id = `rolagem-ataque-${numero}`;
      const botaoRolagem = rolagem.closest("button")
      botaoRolagem.onclick = () => testeRolagemAtaque(numero);
      const imgRolagem = botaoRolagem.closest("img");
      imgRolagem.title = `Rolagem de Ataque ${numero}`;
      imgRolagem.alt = `rolagem-ataque-${numero}`;
    }

    if(crit) {
      crit.id = `critico-ataque-${numero}`;
      const check = crit.closest('input[type="checkbox"]');
      check.id = `critico-${numero}-check`;
      check.onchange = () => destacaCritico(`linha-ataque-${numero}`);
      const label = crit.closest("label");
      label.for = `critico-${numero}-check`;
    }
  });

  recalcularTudo();
}

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

  "envenenamento": " recebe (3/6/12) de dano no fim de cada um de seus turnos e também imediatamente após receber a condição,  também fica (Prejudicado/Prejudicado/Exausto). Essa condição tem o descritor veneno. Realize um teste ao final de cada turno para remover a condição"
}

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
    "transe": ["atordoado"]
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
  }
};

const removerEfeito = {
  "exausto": () => {
    aplicarModificadorDeslocamento(1, "transparent");
  },
  "caido": () => {
    aplicarModificadorDeslocamento(1, "transparent");
  },
  "impedido": () => {
    aplicarModificadorDeslocamento(1, "transparent");
  },
  "fatigado": () => {
    aplicarModificadorDeslocamento(1, "transparent");
  },
  "imovel": () => {
    aplicarModificadorDeslocamento(1, "transparent");
  },
  "vulneravel": () => {
    aplicarModificadorDefesas(2, "transparent", "aparar-combate");
    aplicarModificadorDefesas(2, "transparent", "esquiva-combate");
    copiaValor("aparar-total", "aparar-combate");
    copiaValor("esquiva-total", "esquiva-combate");
  },
  "indefeso": () => {
    aplicarModificadorDefesas(1, "transparent", "aparar-combate");
    aplicarModificadorDefesas(1, "transparent", "esquiva-combate");
    copiaValor("aparar-total", "aparar-combate");
    copiaValor("esquiva-total", "esquiva-combate");
  }

}

function checkCondicoes() {
  modificadorGlobal = 0;
  
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
    "adormecido": ["indefeso", "atordoado", "caido"] ,
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
  });

}

function removerCondicao(condicao) {
  const condicaoEl = document.getElementById(condicao);
  
  if(condicaoEl) {
    condicaoEl.remove();
    removerEfeito[condicao]?.();
    checkCondicoes();
    checkModificadorGlobal();
    
    document.getElementById("descricao-condicao").value = "";
  }
  
}