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

function recuperarVida(cura, recEstamina) {

  var reducao;
  const curaRecebida = Number(document.getElementById(cura).value) || 0;
  const vidaAtual = document.getElementById("vida-combate");
  const estaminaAtual = document.getElementById("estamina-combate");
  const pct = Number(document.getElementById(recEstamina).value) || 0;
  const vidaMaxima = Number(document.getElementById("vida-maxima-combate").value) || 0;
  const estaminaMaxima = Number(document.getElementById("estamina-maxima-combate").value) || 0;

  vidaAtual.value = Math.min(Number(vidaAtual.value) + curaRecebida, vidaMaxima);
  estaminaAtual.value = Math.min(Number(estaminaAtual.value) + (pct/100)*curaRecebida, estaminaMaxima);

  recalcularTudo();
  return danoSofrido;
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


