let contadorVantagens = 0;

function adicionarVantagem() {
  contadorVantagens++;
  
  const listaVantagens = document.getElementById("lista-vantagens");

  const novaLinha = document.createElement("div");
  novaLinha.className = "vantagens-linha";
  novaLinha.innerHTML = `
    <input type="number" id="vantagem${contadorVantagens}-lvl" title="Nível da Vantagem" class="dependente vantagem" placeholder="NVL">
    <select name="tipo" id="vantagem${contadorVantagens}-tipo" class="dependente tipo-vantagem">
      <option value="nenhum"> — Tipo — </option>
      <option value="classe">Classe</option>
      <option value="combate">Combate</option>
      <option value="geral">Geral</option>
      <option value="pericia">Pericia</option>
      <option value="sorte">Sorte</option>
    </select>
    <input type="text" id="vantagem${contadorVantagens}-nome" title="Vantagem ${contadorVantagens}" class="nome-vantagem" placeholder="Vantagem ${contadorVantagens}">
    <button class="botao-img" onclick="mostrarVantagem(${contadorVantagens})" title = "Mostrar Descrição da Vantagem ${contadorVantagens}" id="mostrar-vantagem-${contadorVantagens}">
      <img src="img/mais.png" alt="Mostrar Descrição da Vantagem" class="vantagens-toggle toggle-show show">
    </button>
    <textarea name="descricao-vantagem" id="descricao-vantagem-${contadorVantagens}" rows="5" class="span-5 hide" placeholder="Descrição da Vantagem ${contadorVantagens}"></textarea>
  `;
    
  listaVantagens.appendChild(novaLinha);
  trocaTema();
}

function removerVantagens() {
  document.querySelectorAll(".nome-vantagem").forEach(vantagem => {
    if (vantagem.value.trim() === "") {
      const linha = vantagem.closest(".vantagens-linha");
      if (linha) {
        linha.remove();
        contadorVantagens--;
      }
    }
  });

  const linhas = document.querySelectorAll(".vantagens-linha");

  linhas.forEach((linha, index) => {
    const numero = index;

    const lvl = linha.querySelector('input[id$="-lvl"]');
    const tipo = linha.querySelector('select[id$="-tipo"]');
    const nome = linha.querySelector('input[id$="-nome"]');

    if (lvl) {
      lvl.id = `vantagem${numero}-lvl`;
    }

    if (tipo) {
      tipo.id = `vantagem${numero}-tipo`;
    }

    if (nome) {
      nome.id = `vantagem${numero}-nome`;
      nome.title = `Vantagem ${numero}`;
      nome.placeholder = `Vantagem ${numero}`
    }
  });

  recalcularTudo();
}

function calcularCustoVantagens () {
  let custoVantagens = 0;
  document.querySelectorAll(".vantagem").forEach(vantagem => {
    const nivel = Number(vantagem.value) || 0;
    custoVantagens += nivel;
  });

  document.getElementById("total-pontos-vantagens").value = custoVantagens;
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

function mostrarVantagem(vantagem) {
  const descricao = document.getElementById(`descricao-vantagem-${vantagem}`);
  if (!descricao) return;

  descricao.classList.toggle("hide");

  const botao = document.getElementById(`mostrar-vantagem-${vantagem}`);
  const imgBotao = botao.querySelector("img");
  imgBotao.classList.toggle("show");
  if (descricao.classList.contains("hide")) {
    botao.title = "Mostrar Descrição da Vantagem";
  } else {
    botao.title = "Ocultar Descrição da Vantagem";
  }

  
}
