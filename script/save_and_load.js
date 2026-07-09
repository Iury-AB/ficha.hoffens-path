function salvarConfig () {
  const dados = {};

  document.querySelectorAll(".config").forEach(el => {
    if (el.id){
      if(el.type == "text"){
        dados[el.id] = el.value;
      }
      else if(el.type="checkbox"){
        dados[el.id] = el.checked;
      }
    }
  });

  localStorage.setItem(`config-ficha-hoffens`, JSON.stringify(dados));
}


function carregarConfig() {
  const dados = JSON.parse(localStorage.getItem("config-ficha-hoffens"));
  if (!dados) return;

  Object.entries(dados).forEach(([id, value]) => {
    const field = document.getElementById(id);

    if (field.type == "text") {
      field.value = value;
    }
    else if (field.type == "checkbox") {
      field.checked = value;
    }
  });
}


function salvarFicha() {
  removerVantagens();
  const dados = {};

  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id && !el.classList.contains("personalizacao") && el.id != "tableFilter" &&
        !el.classList.contains("config")){
      dados[el.id] = el.value;
    }
  });

  const nome = document.getElementById("personagem").value;

  const index = getIndex();
  if (!index.includes(nome)) {
    index.push(nome);
    saveIndex(index);
  }
  carregarIndex();
  document.getElementById("listaFichas").value = nome;

  localStorage.setItem(`ficha:${nome}`, JSON.stringify(dados));
  localStorage.setItem(`contadorVantagens:${nome}`, contadorVantagens);
  localStorage.setItem(`contadorAtaques:${nome}`, contadorAtaques);
  localStorage.setItem(`contadorModificadores:${nome}`, JSON.stringify(contadorModificadores));
  localStorage.setItem(`contadorEfeitos:${nome}`, JSON.stringify(contadorEfeitos));
  localStorage.setItem(`contadorEfeitosLigados:${nome}`, JSON.stringify(contadorEfeitosLigados));
  localStorage.setItem(`contadorPoderes:${nome}`, contadorPoderes);
  localStorage.setItem(`contadorEquipamento:${nome}`, contadorEquipamento);

  document.getElementById("pagina").innerHTML = nome;
}

function carregarFicha(nome) {
  if (nome == "selecionar") {
    limparFicha();
    return;
  }

  bloqueiaRecalculo = true;

  const dados = JSON.parse(localStorage.getItem(`ficha:${nome}`));
  if (!dados) {
    bloqueiaRecalculo = false;
    return;
  }

  const iconPersonagem = localStorage.getItem(`icon:${nome}`);
  if(iconPersonagem) {
    document.getElementById("personagem-img").src = iconPersonagem;
  } else {
    document.getElementById("personagem-img").src = "img/character.png";
  }

  const nVantagens = JSON.parse(localStorage.getItem(`contadorVantagens:${nome}`));

  const listaVantagens = document.getElementById("lista-vantagens");
  listaVantagens.innerHTML = "";

  contadorVantagens = 0;

  for (let index = 0; index < nVantagens; index++) {
    adicionarVantagem();
  }

  const nAtaques = JSON.parse(localStorage.getItem(`contadorAtaques:${nome}`));

  const listaAtaques = document.querySelector(".lista-ataques");

  contadorAtaques = 0;

  for (let index = 0; index < nAtaques; index++) {
    adicionarAtaque();
  }

  const nPoderes = JSON.parse(localStorage.getItem(`contadorPoderes:${nome}`)) || 0;
  const nEfeitos = JSON.parse(localStorage.getItem(`contadorEfeitos:${nome}`)) || [];
  const nEfeitosAlternativos = JSON.parse(localStorage.getItem(`contadorEfeitosLigados:${nome}`)) || [];
  const nModificadores = JSON.parse(localStorage.getItem(`contadorModificadores:${nome}`)) || [];

  const listaPoderes = document.getElementById("lista-poderes");
  listaPoderes.innerHTML = "";

  contadorPoderes = 0;
  contadorEfeitos = [];
  contadorEfeitosLigados = [];
  contadorModificadores = [];

  for (let i = 0; i < nPoderes; i++) {
    adicionarPoder();
    
    const qtdEfeitos = nEfeitos[i+1] || 0;

    for (let j = 0; j < qtdEfeitos; j++) {
      adicionarEfeito(i+1);
      
      let qtdModsPrincipal = 0;
      if (nModificadores[i+1] && nModificadores[i+1][j+1]) {
        qtdModsPrincipal = nModificadores[i+1][j+1][0] || 0;
      }

      for (let k = 0; k < qtdModsPrincipal; k++) {
        adicionarModificadores(i+1, j+1, 0);
      }

      let qtdAlternativos = 0;
      if (nEfeitosAlternativos[i+1]) {
        qtdAlternativos = nEfeitosAlternativos[i+1][j+1] || 0;
      }

      for (let l = 0; l < qtdAlternativos; l++) {
        adicionarLigado(i+1, j+1);

        let qtdModsAlt = 0;
        if (nModificadores[i+1] && nModificadores[i+1][j+1]) {
            qtdModsAlt = nModificadores[i+1][j+1][l+1] || 0;
        }

        for (let m = 0; m < qtdModsAlt; m++) {
            adicionarModificadores(i+1, j+1, l+1);
        }
      }
    }
  }

  const nEquipamentos = JSON.parse(localStorage.getItem(`contadorEquipamento:${nome}`));

  const listaEquipamento = document.getElementById("lista-equipamento");
  listaEquipamento.innerHTML = "";

  contadorEquipamento = 0;

  for (let index = 0; index < nEquipamentos; index++) {
    adicionarEquipamento();
  }

  Object.keys(dados).forEach(id => {
    if(id == "troca-icon") return;
    const el = document.getElementById(id);
    if (el) el.value = dados[id];
  });

  const arquetipo = document.getElementById("arquetipo-selecao").value;
  mudarArquetipo(arquetipo, 'arquetipo');
  const despertar = document.getElementById("despertar-selecao").value;
  mudarArquetipo(despertar, 'despertar');

  document.getElementById("pagina").innerHTML = nome;
  document.getElementById("listaFichas").value = nome;
  
  bloqueiaRecalculo = false;
  recalcularTudo();
}

function deletarFicha() {

  const nome = document.getElementById("personagem").value;

  localStorage.removeItem(`ficha:${nome}`);
  localStorage.removeItem(`contadorVantagens:${nome}`);
  localStorage.removeItem(`contadorAtaques:${nome}`);
  localStorage.removeItem(`contadorEquipamento:${nome}`);
  localStorage.removeItem(`contadorModificadores:${nome}`);
  localStorage.removeItem(`contadorEfeitosLigados:${nome}`);
  localStorage.removeItem(`contadorEfeitos:${nome}`);
  localStorage.removeItem(`contadorPoderes:${nome}`);
  localStorage.removeItem(`icon:${nome}`);

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
      el.readOnly ||
      el.classList.contains("personalizacao") ||
      el.classList.contains("config")
    ) return;

    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
  });

  document.getElementById("personagem-img").src = "img/character.png";

  contadorVantagens = 0;
  const listaVantagens = document.getElementById("lista-vantagens");
  listaVantagens.innerHTML = "";

  contadorAtaques = 0;

  contadorModificadores = [];
  contadorEfeitos = [];
  contadorPoderes = 0;
  const listaPoderes = document.getElementById("lista-poderes");
  listaPoderes.innerHTML = "";

  contadorEquipamento = 0;
  const listaEquipamento = document.getElementById("lista-equipamento");
  listaEquipamento.innerHTML = "";

  // limpa seleção de ficha
  const lista = document.getElementById("listaFichas");
  if (lista) lista.value = "selecionar";

  // recalcula campos automáticos
  if (typeof recalcularTudo === "function") {
    recalcularTudo();
  }

  document.getElementById("pagina").innerHTML = "Ficha de Personagem";
}


function exportarFicha() {
  removerVantagens();
  removerAtaques();
  const dados = {};
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id  && !el.classList.contains("personalizacao") && el.id != "tableFilter" &&
        !el.classList.contains("config") && el.id != "troca-icon") {
      dados[el.id] = el.value;
    }
  });

  const ficha = {
    dados,
    contadorVantagens,
    contadorAtaques,
    contadorPoderes,
    contadorEfeitos,
    contadorModificadores,
    contadorEfeitosLigados,
    contadorEquipamento
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
    const nAtaques = json.contadorAtaques || 0;
    const nPoderes = json.contadorPoderes || 0;
    const nEfeitos = json.contadorEfeitos || [];
    const nEfeitosAlternativos = json.contadorEfeitosLigados || [];
    const nModificadores = json.contadorModificadores || [];
    const nEquipamentos = json.contadorEquipamento || 0;

    const nome = dados["personagem"];

    localStorage.setItem(`ficha:${nome}`, JSON.stringify(dados));
    localStorage.setItem(`contadorVantagens:${nome}`, nVantagens);
    localStorage.setItem(`contadorAtaques:${nome}`, nAtaques);
    localStorage.setItem(`contadorModificadores:${nome}`, JSON.stringify(nModificadores));
    localStorage.setItem(`contadorEfeitos:${nome}`, JSON.stringify(nEfeitos));
    localStorage.setItem(`contadorEfeitosLigados:${nome}`, JSON.stringify(nEfeitosAlternativos));
    localStorage.setItem(`contadorPoderes:${nome}`, nPoderes);
    localStorage.setItem(`contadorEquipamento:${nome}`, nEquipamentos);

    carregarFicha(nome);
    const index = getIndex();
    if (!index.includes(nome)) {
      index.push(nome);
      saveIndex(index);
    }
    carregarIndex();
    document.getElementById("listaFichas").value = nome;
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
  placeholder.value = "selecionar";
  placeholder.textContent = "— Selecionar Personagem —";
  select.appendChild(placeholder);

  // adiciona as fichas
  index.forEach(nome => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    select.appendChild(option);
  });
}
