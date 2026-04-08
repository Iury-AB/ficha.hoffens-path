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

function atribuirDescricaoCondicao() {
  const condicao = document.getElementById("condicoes-personagem").value;
  var nomePersonagem = document.getElementById("personagem").value || "Personagem";
  nomePersonagem = nomePersonagem.split(" ")[0];
  var descricao = "";
  if(condicao == "normal") {
    descricao = nomePersonagem + " não está sob o efeito de nenhuma condição, podendo agir normalmente.";
  }
  else if(condicao == "atordoado") {
    descricao = nomePersonagem + " não pode executar ações, nem mesmo ações livres. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "compelido") {
    descricao = nomePersonagem + " está limitado a ações livres e a uma única ação padrão por turno, com todas as ações sendo escolhidas pelo personagem que o controla. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "controlado") {
    descricao = nomePersonagem + " não tem vontade própria; suas ações em cada turno são ditadas pelo personagem que o controla. É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "desabilitado") {
    descricao = nomePersonagem + " sofre uma penalidade de circunstância de -5 em todos os testes. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "desatento") {
    descricao = "Um (ou mais) dos sentidos de " + nomePersonagem + " está completamente inutilizado, incapaz de interagir ou de fazer testes de Percepção ou executar qualquer ação baseada nele(s). É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "fatigado") {
    descricao = nomePersonagem + " se move a metade de seu movimento normal. Pode se recuperar da condição fatigado com uma hora de descanso ou com a ação Recuperar-se.";
  }
  else if(condicao == "imovel") {
    descricao = nomePersonagem + " não pode se mover do lugar em que se encontra, embora ainda seja capazes de executar ações. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "impedido") {
    descricao = nomePersonagem + " se move a metade de seu movimento normal.  Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "indefeso") {
    descricao = "O bônus das defesas ativas de " + nomePersonagem + " é 0. Atacantes podem te com testes de rotina. Se o atacante preferir fazer um teste de ataque normal, todos os acertos serão tratados como acertos críticos. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "prejudicado") {
    descricao = nomePersonagem + " sofre uma penalidade de circunstância de -2 em todos os testes. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "tonto") {
    descricao = nomePersonagem + " é incapaz de realizar mais do que uma única ação padrão e ações livres por turno. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "transformado") {
    descricao = nomePersonagem + " teve alguma ou todas as suas características alteradas, desde a aparência do personagem a uma mudança completa das graduações de suas características ou a adição de outras. É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "vulneravel") {
    descricao = nomePersonagem + " têm sua habilidade de se defender limitada, dividindo suas defesas ativas pela metade. Realize um teste ao final de cada turno para remover a condição.";
  }
  else if(condicao == "adormecido") {
    descricao = nomePersonagem + " está indefeso (defesas ativas zeradas), atordoado (não pode executar ações) e desatento (sentidos inutilizados). É necessário um teste de Percepção com três ou mais graus de sucesso para o personagem ouvir e acordar, removendo todas estas condições. Qualquer movimento brusco ou efeito que permita um teste de salvamento acorda o personagem.";
  }
  else if(condicao == "amarrado") {
    descricao = nomePersonagem + " está indefeso (defezas ativas zeradas), imóvel e prejudicado (penalidade de -2 em testes). É necessário uma ação de movimento com um teste de Atletismo ou Acrobacia contra o teste de rotina de Força ou efeito de agarrar do seu oponente; em caso de sucesso, você ainda pode se mover normalmente, mas caso falhe, permanece agarrado.";
  }
  else if(condicao == "caido") {
    descricao = nomePersonagem + " sofre uma penalidade de -5 em testes de combate corpo-a-corpo. Os oponentes ganham um bônus de +5 em testes de combate corpo-a-corpo, mas sofrem uma penalidade de -5 em testes de ataque à distância; além disso, seu deslocamente é reduzido pela metade. Ficar de pé é uma ação de movimento.";
  }
  else if(condicao == "cego") {
    descricao = nomePersonagem + " está impedido (metade do deslocamento), visualmente desatento e vulnerável (metade das defesas ativas), e pode estar prejudicado (penalidade de -2) ou desabilitado (penalidade de -5) para atividades em que a visão é um fator. É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "exausto") {
    descricao = nomePersonagem + " está prejudicado (penalidade de -2 em testes) e impedido (metade do deslocamento). Pode se recuperar da condição exausto com uma hora de descanso em um lugar confortável ou com a ação Recuperar-se, que troca Exausto por Fatigado.";
  }
  else if(condicao == "incapacitado") {
    descricao = nomePersonagem + " está indefeso (defesas zeradas), atordoado (incapaz de agir), desatento (sentidos inutilizados) e caído (a não ser que uma força externa o mantenha de pé). É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "morrendo") {
    descricao = nomePersonagem + " está incapacitado (indefeso, atordoado e desatento) e recebe uma contagem regressiva de três turnos seus. Ao se completarem esses 3 turnos e ainda estiver com essa condição, morre definitivamente. Remover a condição morrendo exige um teste de Tratamento (ou do poder Cura) contra a DT 30.";
  }
  else if(condicao == "paralisado") {
    descricao = nomePersonagem + " está indefeso (defesas zeradas), imóvel e fisicamente atordoado (incapaz de agir), mas se mantém consciente e capaz de executar ações puramente mentais, que não envolvam qualquer tipo de movimento físico. É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "restrito") {
    descricao = nomePersonagem + " está impedido (metade do deslocamento) e vulnerável (metade das defesas ativas). É necessário uma ação de movimento com um teste de Atletismo ou Acrobacia contra o teste de rotina de Força ou efeito de agarrar do seu oponente; em caso de sucesso, você ainda pode se mover normalmente, mas caso falhe, permanece restrito.";
  }
  else if(condicao == "surdo") {
    descricao = nomePersonagem + " não ouve, concedendo cobertura auditiva total contra você. Isso pode permitir ataques de surpresa contra o personagem desatento. É necessário ajuda externa para remover a condição.";
  }
  else if(condicao == "surpreso") {
    descricao = nomePersonagem + " está atordoado (incapaz de agir) e vulnerável (metade das defesas ativas) por uma rodada, após isso ela é removida sem a necessidade de testes. Esquiva Fabulosa garante imunidade contra essa condição.";
  }
  else if(condicao == "") {
    descricao = nomePersonagem + " está atordoado (incapaz de agir). Qualquer ameaça óbvia quebra o transe, um teste de perícias de interação de um aliado também pode remover essa condição.";
  }

  document.getElementById("descricao-condicao").value = descricao;
}