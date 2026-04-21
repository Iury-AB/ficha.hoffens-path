let contadorPoderes = 0;
let contadorEfeitos = [];
let contadorEfeitosLigados = [];
let contadorModificadores = [];

function adicionarPoder() {
  contadorPoderes++;
  contadorEfeitos[contadorPoderes] = 0;
  contadorEfeitosLigados[contadorPoderes] = [];
  contadorModificadores[contadorPoderes] = [];

  const listaPoderes = document.getElementById("lista-poderes");

  const novoPoder = document.createElement("div");
  novoPoder.className = "poder-linha";
  novoPoder.id = `poder-${contadorPoderes}`;

  novoPoder.innerHTML = `
    <div class="span-2" style="display: flex;">
      <button title="Ocultar Efeitos do Poder" class="botao-img mostrar-poder" onclick="ocultarDetalhesPoder(${contadorPoderes})" id="mostrar-poder-${contadorPoderes}">
        <img src="img/mais.png" alt="Mostrar Efeitos" class="toggle-show">
      </button>
      <input type="text" id="nome-poder-${contadorPoderes}" placeholder="Nome do Poder ${contadorPoderes}" class="nome-poder">
      <button class="botao-img apagar-poder" title="Apagar Poder ${contadorPoderes}" onclick="removerPoder(${contadorPoderes})" id="apagar-poder-${contadorPoderes}">
        <img src="img/delete.png" alt="Apagar Poder">
      </button>
    </div>
    
    <div class="efeitos-modificadores">
      <div class="efeitos-linha" style="margin-left:35px;">
        <label for="">Modif.</label>
        <label for="">Ligado</label>
        <br>
        <label for="">LVL</label>
        <label for="">Custo</label>
        <label for="">Efeito</label>
        <br>
      </div>

      <div id="lista-efeitos-${contadorPoderes}" style="max-height: 300px; overflow-y: auto;" class="lista-efeitos hierarquia-container">
      </div>

      <div style="justify-self: center; display: flex;">
        <button class="botao-img adicionar-efeito" title="Adicionar Efeito ao Poder ${contadorPoderes}" onclick="adicionarEfeito(${contadorPoderes})" style="width: 50%;" id="adicionar-efeito-${contadorPoderes}">
          <img src="img/adicionar.png" alt="Adicionar Efeito">
        </button>

        <button class="botao-img remover-efeito" title="Remover Efeitos e Modificadores Vazios do Poder ${contadorPoderes}" onclick="removerEfeitos(${contadorPoderes})" style="width: 50%;" id="remover-efeito-${contadorPoderes}">
          <img src="img/remover.png" alt="Remover Efeitos Vazios">
        </button>
      </div>
    </div>

    <div class="descricao-poder">
      <label for="">
        Descrição
      </label>
      <textarea name="descricao-poder" id="descricao-poder-${contadorPoderes}" placeholder="Descrição do poder ${contadorPoderes}"></textarea>
      <div class="small-number" style="display: flex; align-items: center;">
        <label for="pontos-poder-${contadorPoderes}">Total de Pontos:</label>
        <input type="number" id="pontos-poder-${contadorPoderes}" style="font-size: 20px; width: 20px" readonly>
      </div>
    </div>
  `;

  listaPoderes.appendChild(novoPoder);
  trocaTema();
}

function removerPoder (poder) {
  const poderRemover = document.getElementById(`poder-${poder}`);
  if(poderRemover) {
    poderRemover.remove();
    contadorModificadores.splice(poder,1);
    contadorEfeitos.splice(poder,1);
    contadorEfeitosLigados.splice(poder, 1)
    contadorPoderes--;
  }

  const poderes = document.querySelectorAll(".poder-linha");
  
  poderes.forEach((linhaPoder, indexPoder) => {
    const mostrarPoder = linhaPoder.querySelector(".mostrar-poder");
    const nomePoder = linhaPoder.querySelector(".nome-poder");
    const apagarPoder = linhaPoder.querySelector(".apagar-poder");
    const listaEfeitos = linhaPoder.querySelector(".lista-efeitos");
    const addEfeito = linhaPoder.querySelector(".adicionar-efeito");
    const remEfeito = linhaPoder.querySelector(".remover-efeito");
    const descricaoPoder = linhaPoder.querySelector("textarea[name='descricao-poder']");

    linhaPoder.id = `poder-${indexPoder+1}`;
    
    if (mostrarPoder) {
      mostrarPoder.id = `mostrar-poder-${indexPoder+1}`;
      mostrarPoder.onclick = () => ocultarDetalhesPoder(indexPoder+1);
    }
    if (nomePoder) {
      nomePoder.id = `nome-poder-${indexPoder+1}`;
      nomePoder.placeholder = `Nome do Poder ${indexPoder+1}`;
    }
    if (apagarPoder) {
      apagarPoder.id = `apagar-poder-${indexPoder+1}`;
      apagarPoder.onclick = () => removerPoder(indexPoder+1);
      apagarPoder.title = `Apagar Poder ${indexPoder+1}`;
    }
    if (listaEfeitos) {
      listaEfeitos.id = `lista-efeitos-${indexPoder+1}`;
    }
    if (addEfeito) {
      addEfeito.id = `adicionar-efeito-${indexPoder+1}`;
      addEfeito.title = `Adicionar Efeito ao Poder ${indexPoder+1}`;
      addEfeito.onclick = () => adicionarEfeito(indexPoder+1);
    }
    if (remEfeito) {
      remEfeito.id = `remover-efeito-${indexPoder+1}`;
      remEfeito.title = `Remover Efeitos e Modificadores Vazios do Poder ${indexPoder+1}`;
      remEfeito.onclick = () => removerEfeitos(indexPoder+1);
    }
    if (descricaoPoder) {
      descricaoPoder.id = `descricao-poder-${indexPoder+1}`;
      descricaoPoder.placeholder = `Descrição do poder ${indexPoder+1}`
    }

    const linhasEf = listaEfeitos.querySelectorAll(".efeitos-linha");
    
    linhasEf.forEach((linhaEfeito, indexEfeito) => {
      atualizarAtributosEfeito(linhaEfeito, indexPoder+1, indexEfeito+1, 0);
      
      const listaModif = linhaEfeito.querySelector(".lista-modificadores");
      listaModif.id = `lista-modificadores-${indexPoder+1}-${indexEfeito+1}-0`;

      reindexarModificadores(listaModif, indexPoder+1, indexEfeito+1, 0);
      
      const listaAlt = linhaEfeito.querySelector(".lista-ligados");
      listaAlt.id = `lista-ligados-${indexPoder+1}-${indexEfeito+1}`;

      listaAlt.querySelectorAll(".ligados-linha").forEach((ligado, indexAlt) => {
        atualizarAtributosLigado(ligado, indexPoder+1, indexEfeito+1, indexAlt+1);

        const modifAlt = ligado.querySelector(".lista-modificadores");
        reindexarModificadores(modifAlt, indexPoder+1, indexEfeito+1, indexAlt+1);
      });
    });
  });

  recalcularTudo();
}

function alternarBotaoEfeito () {
  for (let poder = 1; poder <= contadorPoderes; poder++) {
    const botao = document.getElementById(`adicionar-efeito-${poder}`);
    const img = botao.querySelector("img");
    if (contadorEfeitos[poder] > 0) {
      botao.title = `Adicionar Efeito Alternativo ao Poder ${poder}`;
      img.src = "img/card-exchange.png";
    }
    else {
      botao.title = `Adicionar Efeito ao Poder ${poder}`;
      img.src = "img/adicionar.png";
    }
  }
}

function ocultarDetalhesPoder(poderId) {
  const poderEl = document.getElementById(`poder-${poderId}`);
  if (!poderEl) return;

  const botao = document.getElementById(`mostrar-poder-${poderId}`);
  const imgBotao = botao.querySelector("img");
  imgBotao.classList.toggle("show");
  if (imgBotao.classList.contains("show")) {
    botao.title = "Mostrar Efeitos do Poder";
  } else {
    botao.title = "Ocultar Efeitos do Poder";
  }

  const elementos = poderEl.querySelectorAll(
    ".efeitos-modificadores, .descricao-poder"
  );

  elementos.forEach(el => {
    el.classList.toggle("hide");
  });
}

function adicionarEfeito(poder) {
  contadorEfeitos[poder]++;
  contadorEfeitosLigados[poder][contadorEfeitos[poder]] = 0;
  contadorModificadores[poder][contadorEfeitos[poder]] = [];
  contadorModificadores[poder][contadorEfeitos[poder]][contadorEfeitosLigados[poder][contadorEfeitos[poder]]] = 0;
  
  const listaEfeitos = document.getElementById(`lista-efeitos-${poder}`);

  if (contadorEfeitos[poder] == 2) {
    const cabecalho = document.createElement("div");
    cabecalho.className = "span-6";
    cabecalho.style = "margin-top: 2px;"
    cabecalho.innerHTML = `
      <label for="">Efeitos Alternativos</label>
    `;
    listaEfeitos.appendChild(cabecalho);
  }

  var estiloPontos;
  if (contadorEfeitos[poder] > 1) {
    estiloPontos = "font-size: 20px;color: var(--cor-tema-menu);background-color:var(--cor-secundaria);padding:2px;box-sizing:content-box;"
  } else {
    estiloPontos = "font-size: 20px;";
  }
  
  const novoEfeito = document.createElement("div");
  novoEfeito.className = "efeitos-linha item-conectado";
  novoEfeito.id = `efeito-${poder}-${contadorEfeitos[poder]}`;
  novoEfeito.innerHTML = `
    <button class="botao-img" onclick="adicionarModificadores(${poder},${contadorEfeitos[poder]},${contadorEfeitosLigados[poder][contadorEfeitos[poder]]})" title="Adicionar Modificador ao Efeito ${contadorEfeitos[poder]} do Poder ${poder}">
      <img src="img/rubiks-cube.png" alt="Adicionar modificador">
    </button>

    <button class="botao-img" title="Adicionar Efeito Ligado ao Efeito ${contadorEfeitos[poder]} do Poder ${poder}" onclick="adicionarLigado(${poder},${contadorEfeitos[poder]})" id="ligado-efeito-${contadorEfeitos[poder]}">
      <img src="img/linked-rings.png" alt="Adicionar Efeito Ligado">
    </button>

    <button class="botao-rolar" onclick="rolarPoderPersonalizado(${poder}, ${contadorEfeitos[poder]}, ${contadorEfeitosLigados[poder][contadorEfeitos[poder]]})">
      <img src="img/d20.png" alt="Rolar teste de Poder">
    </button>

    <input type="number" name="lvl-efeito" id="lvl-efeito-${poder}-${contadorEfeitos[poder]}-${contadorEfeitosLigados[poder][contadorEfeitos[poder]]}" class="dependente" placeholder="NVL">
    <input type="number" name="custo-efeito" id="custo-efeito-${poder}-${contadorEfeitos[poder]}" class="dependente" placeholder ="CST">
    <input type="text" name="nome-efeito" id="nome-efeito-${poder}-${contadorEfeitos[poder]}-${contadorEfeitosLigados[poder][contadorEfeitos[poder]]}" placeholder="Efeito ${contadorEfeitos[poder]}">
    <div class="small-number">
      <input type="number" id="pontos-efeito-${poder}-${contadorEfeitos[poder]}" name="pontos-efeito"  style="${estiloPontos}" readonly>
    </div>

    <div id="lista-modificadores-${poder}-${contadorEfeitos[poder]}-${contadorEfeitosLigados[poder][contadorEfeitos[poder]]}" class="span-6 lista-modificadores hierarquia-container">
    </div>

    <div id="lista-ligados-${poder}-${contadorEfeitos[poder]}" class="span-7 lista-ligados hierarquia-container">
    </div>
  `;
  
  listaEfeitos.appendChild(novoEfeito);
  trocaTema();
  recalcularTudo();
  alternarBotaoEfeito();
}

function adicionarLigado(poder, efeito) {
  contadorEfeitosLigados[poder][efeito]++;
  contadorModificadores[poder][efeito][contadorEfeitosLigados[poder][efeito]] = 0;

  const listaLigados = document.getElementById(`lista-ligados-${poder}-${efeito}`);

  const novoLigado = document.createElement("div");
  novoLigado.className = "ligados-linha item-conectado";
  novoLigado.id = `ligado-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}`;
  novoLigado.innerHTML = `
    <button class="botao-img" onclick="adicionarModificadores(${poder},${efeito},${contadorEfeitosLigados[poder][efeito]})" title="Adicionar Modificador ao ${contadorEfeitosLigados[poder][efeito]}º Efeito Ligado ao Efeito ${efeito} do Poder ${poder}">
      <img src="img/rubiks-cube.png" alt="Adicionar modificador">
    </button>
    <br>

    <button class="botao-rolar" onclick="rolarPoderPersonalizado(${poder}, ${efeito}, ${contadorEfeitosLigados[poder][efeito]})">
      <img src="img/d20.png" alt="Rolar teste de Poder" id="teste-ligado-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}">
    </button>
    
    <input type="number" name="lvl-ligado" id="lvl-efeito-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}" class="dependente" placeholder="NVL">
    <input type="number" name="custo-ligado" id="custo-efeito-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}" class="dependente" placeholder="CST">
    <input type="text" name="nome-ligado" id="nome-efeito-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}" placeholder="${contadorEfeitosLigados[poder][efeito]}º Efeito Ligado ao Efeito ${efeito}">
    <div class="small-number">
      <input type="number" id="pontos-ligado-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}" name="pontos-ligado"  style="font-size: 20px;" readonly>
    </div>

    <div id="lista-modificadores-${poder}-${efeito}-${contadorEfeitosLigados[poder][efeito]}" class="span-6 hierarquia-container lista-modificadores">
    </div>
  `;

  listaLigados.appendChild(novoLigado);
  trocaTema();
  recalcularTudo();
}

function removerEfeitos(poder) {
  const poderEl = document.getElementById(`poder-${poder}`);
  if (!poderEl) return;

  const listaEfeitos = poderEl.querySelector(".lista-efeitos");
  const efeitosDom = listaEfeitos.querySelectorAll(".efeitos-linha");

  efeitosDom.forEach(efeitoEl => {
    limparModificadoresVazios(efeitoEl);

    const ligadosDom = efeitoEl.querySelectorAll(".ligados-linha");
    ligadosDom.forEach(ligEl => {
      limparModificadoresVazios(ligEl);

      const inputNomeLig = ligEl.querySelector("input[name='nome-ligado']");
      if (!inputNomeLig || inputNomeLig.value.trim() === "") {
        ligEl.remove();
      }
    });

    const inputNomeEf = efeitoEl.querySelector("input[name='nome-efeito']");
    if (!inputNomeEf || inputNomeEf.value.trim() === "") {
      efeitoEl.remove(); 
    }
  });

  contadorEfeitos[poder] = 0;
  contadorEfeitosLigados[poder] = []; 
  contadorModificadores[poder] = []; 
  
  const efeitosRestantes = listaEfeitos.querySelectorAll(".efeitos-linha");

  if (efeitosRestantes.length < 2) {
      const headerAlt = listaEfeitos.querySelector("div:not(.efeitos-linha)");
      if(headerAlt && headerAlt.innerText.includes("Efeitos Alternativos")) headerAlt.remove();
    }
  
  efeitosRestantes.forEach((efeitoEl, indexEfeitoZero) => {
    const indexEf = indexEfeitoZero + 1;
    contadorEfeitos[poder] = indexEf;
    
    contadorEfeitosLigados[poder][indexEf] = 0;
    contadorModificadores[poder][indexEf] = []; 
    contadorModificadores[poder][indexEf][0] = 0;
    
    efeitoEl.id = `efeito-${poder}-${indexEf}`;
    
    atualizarAtributosEfeito(efeitoEl, poder, indexEf, 0);

    const listaModifPrincipal = efeitoEl.querySelector(".lista-modificadores");
    if(listaModifPrincipal) {
      listaModifPrincipal.id = `lista-modificadores-${poder}-${indexEf}-0`;
      reindexarModificadores(listaModifPrincipal, poder, indexEf, 0);
    }

    const listaLigadosContainer = efeitoEl.querySelector(".lista-ligados");
    if(listaLigadosContainer) {
      listaLigadosContainer.id = `lista-ligados-${poder}-${indexEf}`;
    }

    const ligadosRestantes = efeitoEl.querySelectorAll(".ligados-linha");
    
    ligadosRestantes.forEach((ligEl, indexLigZero) => {
      const indexLig = indexLigZero + 1;
      contadorEfeitosLigados[poder][indexEf] = indexLig;
      contadorModificadores[poder][indexEf][indexLig] = 0;

      ligEl.id = `ligado-${poder}-${indexEf}-${indexLig}`;

      atualizarAtributosLigado(ligEl, poder, indexEf, indexLig);
      const listaModifAlt = ligEl.querySelector(".lista-modificadores");
      if(listaModifAlt) {
        listaModifAlt.id = `lista-modificadores-${poder}-${indexEf}-${indexLig}`;
        reindexarModificadores(listaModifAlt, poder, indexEf, indexLig);
      }
    });
  });
  
  recalcularTudo();
  alternarBotaoEfeito();
}

function limparModificadoresVazios(container) {
  const inputsNome = container.querySelectorAll("input[name='nome-modificador']");
  
  inputsNome.forEach(input => {
    if (input.value.trim() === "") {
      const linhaMod = input.closest(".modificadores-linha");
      if (linhaMod) linhaMod.remove();
    }
  });

  const linhasRestantes = container.querySelectorAll(".modificadores-linha");
  let temConteudo = false;
  linhasRestantes.forEach(linha => {
      if(linha.querySelector("input")) temConteudo = true;
  });

  if (!temConteudo) {
      linhasRestantes.forEach(linha => linha.remove());
  }
}

function reindexarModificadores(containerModificadores, poder, efeito, ligado) {
    const modificadores = containerModificadores.querySelectorAll(".modificadores-linha");
    let contadorReal = 0;
    
    modificadores.forEach(linha => {
        if (!linha.querySelector("input")) return;

        contadorReal++;
        contadorModificadores[poder][efeito][ligado] = contadorReal;
        

        const custo = linha.querySelector("input[name='custo-modificador']");
        const tipo = linha.querySelector("select[name='tipo-modificador']");
        const nome = linha.querySelector("input[name='nome-modificador']");

        if (custo) custo.id = `custo-modificador-${poder}-${efeito}-${ligado}-${contadorReal}`;
        if (tipo) tipo.id = `tipo-modificador-${poder}-${efeito}-${ligado}-${contadorReal}`;
        if (nome) {
            nome.id = `nome-modificador-${poder}-${efeito}-${ligado}-${contadorReal}`;
            nome.placeholder = `Modificador ${contadorReal} do efeito ${efeito}`;
        }
    });
}

function atualizarAtributosEfeito(el, poder, indexEf, indexLig) {
    const btnAddMod = el.querySelector("button[onclick^='adicionarModificadores']");
    if(btnAddMod) {
        btnAddMod.setAttribute("onclick", `adicionarModificadores(${poder}, ${indexEf}, ${indexLig})`);
        btnAddMod.title = `Adicionar Modificador ao Efeito ${indexEf} do Poder ${poder}`;
    }

    const btnAddLig = el.querySelector("button[onclick^='adicionarLigado']");
    if(btnAddLig) {
        btnAddLig.id = `ligado-efeito-${indexEf}`;
        btnAddLig.setAttribute("onclick", `adicionarLigado(${poder}, ${indexEf})`);
        btnAddLig.title = `Adicionar Efeito Ligado ao Efeito ${indexEf}`;
    }
    
    const btnRolar = el.querySelector("button[onclick^='rolarPoderPersonalizado']");
    if(btnRolar) {
        btnRolar.setAttribute("onclick", `rolarPoderPersonalizado(${poder}, ${indexEf}, ${indexLig})`);
    }

    const lvl = el.querySelector("input[name='lvl-efeito']");
    if(lvl) lvl.id = `lvl-efeito-${poder}-${indexEf}-${indexLig}`;

    const custo = el.querySelector("input[name='custo-efeito']");
    if(custo) custo.id = `custo-efeito-${poder}-${indexEf}`;

    const nome = el.querySelector("input[name='nome-efeito']");
    if(nome) {
        nome.id = `nome-efeito-${poder}-${indexEf}-${indexLig}`;
        nome.placeholder = `Efeito ${indexEf}`;
    }

    const pontos = el.querySelector("input[name='pontos-efeito']");
    if(pontos) pontos.id = `pontos-efeito-${poder}-${indexEf}`;
}

function atualizarAtributosLigado(el, poder, indexEf, indexLig) {
    const btnAddMod = el.querySelector("button[onclick^='adicionarModificadores']");
    if(btnAddMod) {
        btnAddMod.setAttribute("onclick", `adicionarModificadores(${poder}, ${indexEf}, ${indexLig})`);
        btnAddMod.title = `Adicionar Modificador ao ${indexLig}º Efeito Ligado do Efeito ${indexEf}`;
    }

    const btnRolar = el.querySelector("button[onclick^='rolarPoderPersonalizado']");
    if(btnRolar) {
        btnRolar.setAttribute("onclick", `rolarPoderPersonalizado(${poder}, ${indexEf}, ${indexLig})`);
    }

    const lvl = el.querySelector("input[name='lvl-ligado']");
    if(lvl) lvl.id = `lvl-efeito-${poder}-${indexEf}-${indexLig}`;

    const custo = el.querySelector("input[name='custo-ligado']");
    if(custo) custo.id = `custo-efeito-${poder}-${indexEf}-${indexLig}`;

    const nome = el.querySelector("input[name='nome-ligado']");
    if(nome) {
        nome.id = `nome-efeito-${poder}-${indexEf}-${indexLig}`;
        nome.placeholder = `Efeito Alternativo ${indexLig} do Efeito ${indexEf}`;
    }

    const pontos = el.querySelector("input[name='pontos-ligado']");
    if(pontos) pontos.id = `pontos-ligado-${poder}-${indexEf}-${indexLig}`;
}

function adicionarModificadores(poder, efeito, ligado) {
  contadorModificadores[poder][efeito][ligado]++;

  const listaModificadores = document.getElementById(`lista-modificadores-${poder}-${efeito}-${ligado}`);
  
  if (contadorModificadores[poder][efeito][ligado] == 1) {
    const cabecalho = document.createElement("div");
    cabecalho.className = "modificadores-linha span-6";
    cabecalho.style = "margin-bottom: 0px;"
    cabecalho.innerHTML = `
      <span></span>
      <label for="">Custo</label>
      <label for="">Tipo</label>
      <label for="">Modificador</label>
    `;
    listaModificadores.appendChild(cabecalho);
  }

  const novaLinha = document.createElement("div");
  novaLinha.className = "modificadores-linha span-6 item-conectado";
  novaLinha.innerHTML = `
    <br>
    <input type="number" id="custo-modificador-${poder}-${efeito}-${ligado}-${contadorModificadores[poder][efeito][ligado]}" name="custo-modificador" class="dependente" placeholder="Custo">
    <select name="tipo-modificador" id="tipo-modificador-${poder}-${efeito}-${ligado}-${contadorModificadores[poder][efeito][ligado]}" class="dependente">
      <option value="por-nivel">Por Nível</option>
      <option value="fixo-por-nivel">Fixo por Nível</option>
      <option value="fixo">Fixo</option>
    </select>
    <input type="text" id="nome-modificador-${poder}-${efeito}-${ligado}-${contadorModificadores[poder][efeito][ligado]}" name="nome-modificador" placeholder="Modificador ${contadorModificadores[poder][efeito][ligado]} do efeito ${efeito}">
  `;
  
  listaModificadores.appendChild(novaLinha);
}

function custoPoder (poder) {
  let custoPoder = 0;
  const poderEl = document.getElementById(`poder-${poder}`);
  if(!poderEl) return 0;
  
  const efeitoPrincipal = document.getElementById(`efeito-${poder}-1`);
  if (!efeitoPrincipal) return 0;

  const custoEfeitoPrincipal = efeitoPrincipal.querySelector("input[name='pontos-efeito']");
  custoEfeitoPrincipal.value = custoEfeito(poder, 1, 0,'efeito');
  custoPoder += Number(custoEfeitoPrincipal.value) || 0;
  
  const listaLigados = efeitoPrincipal.querySelector(".lista-ligados");
  const efeitosLigados = listaLigados.querySelectorAll(".ligados-linha");
  
  efeitosLigados.forEach((ligado, index_ligado) => {
    custoPoder += custoEfeito(poder, 1, index_ligado+1, 'ligado');
  });

  return custoPoder;
}

function calcularCustoPoderes () {
  let custoPoderes = 0;
  for (let poder = 1; poder <= contadorPoderes; poder++) {
    const custo = custoPoder(poder) || 0;
    document.getElementById(`pontos-poder-${poder}`).value = custo;
    custoPoderes += custo;
  }
  document.getElementById("total-pontos-poderes").value = custoPoderes;
}

function custoEfeito (poder, efeito, ligado, tipo) {
  
  const poderEl = document.getElementById(`poder-${poder}`);
  if(!poderEl) return 0;
  var nome;
  if (tipo == 'efeito') {
    nome = `efeito-${poder}-${efeito}`;
  } else if(tipo === 'ligado') {
    nome = `ligado-${poder}-${efeito}-${ligado}`
  }
  
  const efeitoEl = document.getElementById(nome);
  
  const nivel = Number(efeitoEl.querySelector(`input[name='lvl-${tipo}']`).value) || 0;
  var custoPorNivel = Number(efeitoEl.querySelector(`input[name='custo-${tipo}']`).value) || 0;
  var fixo = 0;
  
  const listaModificadores = document.getElementById(`lista-modificadores-${poder}-${efeito}-${ligado}`);
  modificadores = listaModificadores.querySelectorAll(".modificadores-linha");
  modificadores.forEach(modificador => {
    
    const tipoModif = modificador.querySelector("select[name='tipo-modificador']");
    if(!tipoModif) return;
    const custoModif = Number(modificador.querySelector("input[name='custo-modificador']").value) || 0;

    if (tipoModif.value =="por-nivel") {
      custoPorNivel += custoModif;
    } else {
      fixo += custoModif;
    }
  });
  
  var custoAjustado;
  if (custoPorNivel-1 < 0) {
    custoAjustado = Math.pow(2, custoPorNivel-1);
  } else {
    custoAjustado = custoPorNivel;
  }

  const custoEfeito = custoAjustado * nivel + fixo;
  const inputCusto = efeitoEl.querySelector(`input[name="pontos-${tipo}"]`);
  inputCusto.value = custoEfeito;
  return custoEfeito;
}

function calcularCustoEfeitosAlternativos () {
  
  for (let poder = 1; poder <= contadorPoderes; poder++) {
    const poderEl = document.getElementById(`poder-${poder}`);
    const listaEfeitos = poderEl.querySelector(".lista-efeitos");
    const efeitos = listaEfeitos.querySelectorAll(".efeitos-linha");
    
    efeitos.forEach((efeito, index_efeito) => {
      if (index_efeito == 0) return;
      const custoPoder = Number(document.getElementById(`pontos-poder-${poder}`).value) || 0;
      
      let custo = custoEfeito(poder, index_efeito+1, 0, 'efeito');
      
      const listaLigados = efeito.querySelector(".lista-ligados");
      const efeitosLigados = listaLigados.querySelectorAll(".ligados-linha");
      efeitosLigados.forEach((ligado, index_ligado) => {
        custo += custoEfeito(poder, index_efeito+1, index_ligado+1, 'ligado');
      });

      const restanteLigado = efeito.querySelector("input[name='pontos-efeito']");
      restanteLigado.value = custoPoder - custo - contadorEfeitos[poder] + 1;
    });
  }
}

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
